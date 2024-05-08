import { useFetcher } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { useEffect, useState } from 'react'
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

	function useDebouncedEffect(
		effect: () => void,
		dependencies: any[],
		delay: number,
	) {
		useEffect(() => {
			const handler = setTimeout(effect, delay)
			return () => clearTimeout(handler)
		}, [...dependencies, delay])
	}

	const handleFetch = (username: string) => {
		let reason = CloseInterceptReason.None

		if (fetcher.state === 'submitting' || fetcher.state === 'loading') {
			reason = CloseInterceptReason.RequestInProgress
		} else if (username) {
			reason = CloseInterceptReason.UnsavedChanges
		} else if (
			(fetcher.data &&
				typeof fetcher.data === 'object' &&
				((fetcher.data as { success: boolean })?.success ||
					'error' in fetcher.data)) ||
			fetcher.state === 'idle'
		) {
			reason = CloseInterceptReason.None
		}

		if (setCloseInterceptReason) {
			setCloseInterceptReason(reason)
		}
	}

	useDebouncedEffect(
		() => {
			handleFetch(username)
			if (username.length >= 3) {
				fetcher.submit(
					{ username },
					{ method: 'post', action: '/auth/check/username' },
				)
			} else {
				setUsernameStatus(null) // Clear status when below 3 characters
			}
		},
		[username, fetcher.state],
		300,
	)

	useEffect(() => {
		handleFetch(username)
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
	}, [fetcher.data, username, fetcher.state])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value)
		if (event.target.value) {
			// If the input field is not empty, set the close intercept reason to UnsavedChanges
			setCloseInterceptReason &&
				setCloseInterceptReason(CloseInterceptReason.UnsavedChanges)
		} else {
			// If the input field is empty, clear the close intercept reason
			setCloseInterceptReason &&
				setCloseInterceptReason(CloseInterceptReason.None)
		}
	}

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
				{usernameStatus ? (
					<div
						id="usernameStatus"
						className={`text-sm ${fetcher.state === 'submitting' ? 'text-gray-500' : usernameStatus.includes('taken') ? 'text-red-500' : usernameStatus.includes('short') ? 'text-yellow-500' : 'text-green-500'}`}
					>
						{fetcher.state === 'submitting' ? 'Checking' : usernameStatus}
					</div>
				) : null}
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
