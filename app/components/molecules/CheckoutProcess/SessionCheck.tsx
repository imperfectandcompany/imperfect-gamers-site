import { useCallback } from 'react'
import { useFetcherWithPromise } from '~/utils/general'

export const useCheckStoreCookieSession = () => {
	const { submit } = useFetcherWithPromise()

	const checkStoreCookieSession = useCallback(async () => {
		console.log('[SessionCheck] Validating integrity of store cookies...')
		try {
			const response = await submit(null, {
				method: 'post',
				action: '/store/session/check',
			})
			console.log(response)
			return response
		} catch (error) {
			console.error('Failed to check session:', error)
			throw error
		}
	}, [submit])

	return checkStoreCookieSession
}
