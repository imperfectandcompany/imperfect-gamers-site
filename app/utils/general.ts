import type { SubmitFunction } from '@remix-run/react'
import { useFetcher } from '@remix-run/react'
import { useRef, useEffect, useCallback } from 'react'

// Properly handle environment variables with a helper function
// Inspiration taken from https://gist.github.com/samselikoff/510c020e4c9ec17f1cf76189ce683fa8
// Contributing users: Samselikoff & jjhiggzw
// April 27 2024

export const getEnvVar = (key: string, defaultValue?: string): string => {
	const value = process.env[key]
	if (value !== undefined) return value
	if (defaultValue !== undefined) return defaultValue
	throw new Error(`Environment variable ${key} is not set`)
}

export function useFetcherWithPromise() {
	let resolveRef = useRef<any>()
	let promiseRef = useRef<Promise<any>>()
	let fetcher = useFetcher()

	if (!promiseRef.current) {
		promiseRef.current = new Promise(resolve => {
			resolveRef.current = resolve
		})
	}

	const resetResolver = useCallback(() => {
		promiseRef.current = new Promise(resolve => {
			resolveRef.current = resolve
		})
	}, [promiseRef, resolveRef])

	const submit = useCallback(
		async (...args: Parameters<SubmitFunction>) => {
			fetcher.submit(...args)
			return promiseRef.current
		},
		[fetcher, promiseRef],
	)

	useEffect(() => {
		if (fetcher.state === 'idle' && fetcher.data) {
			resolveRef.current(fetcher.data)
			resetResolver() // Reset the promise after handling to prepare for next operation
		}
	}, [fetcher.data, fetcher.state, resetResolver])

	return { ...fetcher, submit }
}
