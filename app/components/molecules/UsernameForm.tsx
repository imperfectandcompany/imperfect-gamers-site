import { Fetcher, SubmitOptions, useFetcher } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { useEffect, useState, useRef } from 'react'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import Button from '~/components/atoms/Button/Button'
import Input from '~/components/atoms/Input/Input'
import { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'

const UsernameForm: React.FC<UsernameFormProps> = ({
	setCloseInterceptReason,
}) => {
	const fetcher = useFetcher()
	const [username, setUsername] = useState('')
	const [usernameStatus, setUsernameStatus] = useState<string | null>(null)
	const [finalizing, setFinalizing] = useState(false)
	const abortControllerRef = useRef<AbortController | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		abortControllerRef.current = controller

		return () => {
			controller.abort()
		}
	}, [])

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (username.length >= 3) {
				abortControllerRef.current?.abort() // Abort previous requests
				const newController = new AbortController()
				abortControllerRef.current = newController

				fetcher.submit({ username }, {
					method: 'post',
					action: '/auth/check/username',
					signal: newController.signal,
				} as SubmitOptions)
			} else {
				setUsernameStatus(null) // Clear status when below 3 characters
			}
		}, 300)

		return () => clearTimeout(timeoutId)
	}, [username])

	useEffect(() => {
		if (username.length > 0 && username.length < 3) {
			setUsernameStatus('Username too short.') // Warning for short username
		} else if (fetcher.data) {
			if (
				(fetcher.data as { usernameAvailable?: boolean })?.usernameAvailable ===
				false
			) {
				setUsernameStatus('Username is already taken.')
				setFinalizing(false)
			} else if (
				(fetcher.data as { usernameAvailable?: boolean })?.usernameAvailable ===
				true
			) {
				setUsernameStatus('Username is available.')
				setFinalizing(true)
			} else {
				setUsernameStatus(null)
				setFinalizing(false)
			}
		}
	}, [fetcher.data, username])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value)
		setUsernameStatus(null) // Reset status on every input change
	}

	// Interface for fetcher's data if not already defined
	interface FetchData {
		success?: boolean
		error?: boolean
		usernameAvailable?: boolean
	}

	const updateCloseInterceptReason = (username: string): void => {
		const reason = determineCloseInterceptReason(
			username,
			fetcher.data as FetchData,
		)
		if (setCloseInterceptReason) {
			setCloseInterceptReason(reason)
		}
	}

	const determineCloseInterceptReason = (
		username: string,
		fetchData?: FetchData,
	): CloseInterceptReason => {
		if (fetcher.state === 'submitting' || fetcher.state === 'loading') {
			return CloseInterceptReason.RequestInProgress
		} else if (username) {
			return CloseInterceptReason.UnsavedChanges
		} else if (fetchData && (fetchData.success || 'error' in fetchData)) {
			return CloseInterceptReason.None
		}
		return CloseInterceptReason.None
	}

	useEffect(() => {
		updateCloseInterceptReason(username)
	}, [username, fetcher.state])

	useEffect(() => {
		const handleFetchStateUpdate = () => {
			updateCloseInterceptReason(username)
		}

		handleFetchStateUpdate()
	}, [fetcher.state, fetcher.data])

	const handleFormSubmit = (
		data: { username: string },
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault()
		if (finalizing) {
			fetcher.submit(data, {
				method: 'post',
				action: '/auth/finalize/username',
			})
		} else {
			fetcher.submit(data, { method: 'post', action: '/auth/check/username' })
		}
	}

	return (
		<div className="rounded-lg p-4 shadow">
			<p className="mb-2 text-sm text-gray-400">
				Choose a username to continue with your setup.
			</p>
			<ValidatedForm
				key="UsernameForm"
				validator={validator}
				method="post"
				action={finalizing ? '/auth/finalize/username' : '/auth/check/username'}
				fetcher={fetcher}
				onSubmit={handleFormSubmit}
				className="flex flex-col space-y-4"
			>
				<Input
					key="UsernameChange"
					name="username"
					type="text"
					value={username}
					onChange={handleInputChange}
					placeholder="Username"
					autoComplete="off"
					required={true}
				/>
				{usernameStatus && (
					<div
						id="usernameStatus"
						className={`text-sm ${fetcher.state === 'submitting' ? 'text-gray-500' : usernameStatus.includes('taken') ? 'text-red-500' : usernameStatus.includes('short') ? 'text-yellow-500' : 'text-green-500'}`}
					>
						{fetcher.state === 'submitting' ? 'Checking...' : usernameStatus}
					</div>
				)}
				<Button type="submit">
					{fetcher.state === 'submitting' ? 'Checking...' : 'Continue'}
				</Button>
			</ValidatedForm>
		</div>
	)
}

interface UsernameFormProps {
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

const usernameSchema = z.object({
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters long')
		.max(20, 'Username cannot exceed 20 characters'),
})

const validator = withZod(usernameSchema)

export default UsernameForm
