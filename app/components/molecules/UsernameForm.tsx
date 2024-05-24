import { useFetcher } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { useEffect, useState, useRef, useCallback } from 'react'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import Button from '~/components/atoms/Button/Button'
import { useFetcherWithPromise } from '~/utils/general'
import { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'
import InputField from './InputField/InputField'

const UsernameForm: React.FC<UsernameFormProps> = ({
	setCloseInterceptReason,
}) => {
	const fetcher = useFetcher()
	const [usernameStatus, setUsernameStatus] = useState<string | null>(null)

	// Synchronous validation: checks if the username length is between 3 and 20 characters
	const validateSync = (username: string): boolean => {
		return username.length >= 3 && username.length <= 20
	}

	const { submit } = useFetcherWithPromise()

	// Asynchronous validation: API call to check username availability
	const validateAsync = async (username: string): Promise<boolean> => {
		if (userNameInput.value.length >= 3) {
			try {
				const response = await submit(
					{ username },
					{ method: 'post', action: '/auth/check/username' },
				)
				return response.usernameAvailable // Adjust according to the API response structure
			} catch (error) {
				console.error('Failed to validate username:', error)
				return false
			}
		} else {
			setUsernameStatus(null) // Clear status when below 3 characters
			return false
		}
	}

	// Use the useInput hook with synchronous and asynchronous validations
	const userNameInput = useInput({
		initialValue: '',
		validateSync: validateSync,
		validateAsync: validateAsync,
		ariaDescribedBy: 'username-error',
	})

	useEffect(() => {
		setUsernameStatus(null) // Clear status when below 3 characters
		if (userNameInput.value.length > 0 && userNameInput.value.length < 3) {
			setUsernameStatus('Username too short.') // Warning for short username
		} else if (fetcher.data) {
			if (
				(fetcher.data as { usernameAvailable?: boolean })?.usernameAvailable ===
				false
			) {
				setUsernameStatus('Username is already taken.')
			} else if (
				(fetcher.data as { usernameAvailable?: boolean })?.usernameAvailable ===
				true
			) {
				setUsernameStatus('Username is available.')
			} else {
				setUsernameStatus(null)
			}
		}
	}, [fetcher.data, userNameInput.value.length])

	// const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setUsername(event.target.value)
	// 	setUsernameStatus(null) // Reset status on every input change
	// }

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

	const isSubmitting =
		fetcher.state === 'submitting' ||
		fetcher.state === 'loading' ||
		fetcher.state !== 'idle'

	useEffect(() => {
		updateCloseInterceptReason(userNameInput.value)
	}, [userNameInput.value])

	useEffect(() => {
		const handleFetchStateUpdate = () => {
			updateCloseInterceptReason(userNameInput.value)
		}

		handleFetchStateUpdate()
	}, [userNameInput.value])

	const handleFormSubmit = (
		data: { username: string },
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault()
		fetcher.submit(data, {
			method: 'post',
			action: '/auth/finalize/username',
		})
	}
	const isDisabled = !userNameInput.isValid

	return (
		<div className="rounded-lg p-4 shadow">
			<p className="mb-2 text-sm text-gray-400">
				Choose a username to continue with your setup.
			</p>
			<ValidatedForm
				key="UsernameForm"
				validator={validator}
				method="post"
				fetcher={fetcher}
				onSubmit={handleFormSubmit}
				className="flex flex-col space-y-4"
			>
				<div>
					<InputField
						name="username"
						disabled={isSubmitting}
						type="username"
						placeholder="Username"
						autocomplete="off"
						tooltipMessage="Clear Username Field"
						{...userNameInput}
						isTyping={userNameInput.isTyping} // Pass the isTyping prop
					/>

					{usernameStatus ? (
						<div
							id="usernameStatus"
							className={`text-sm ${fetcher.state === 'submitting' ? 'text-gray-500' : usernameStatus.includes('taken') ? 'text-red-500' : usernameStatus.includes('short') ? 'text-yellow-500' : 'text-green-500'}`}
						>
							{fetcher.state === 'submitting' ? 'Checking...' : usernameStatus}
						</div>
					) : null}
				</div>
				<Button
					type="submit"
					disabled={isDisabled || isSubmitting || userNameInput.isTyping}
				>
					{isSubmitting ? 'Checking...' : 'Continue'}
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

interface UseInputProps {
	initialValue: string
	validateSync: (value: string) => boolean // Sync validation function (e.g., checking length)
	validateAsync: (value: string) => Promise<boolean> // Async validation function (API call)
	ariaDescribedBy: string
}

interface UseInputReturn {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	error: boolean
	setError: React.Dispatch<React.SetStateAction<boolean>>
	isFocused: boolean
	isTyping: boolean
	isValid: boolean
	handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleFocus: () => void
	handleBlur: () => void
	inputClassName: string
	showError: boolean
	ariaDescribedBy: string
}

// The useInput hook with TypeScript typings
export function useInput({
	initialValue,
	validateSync,
	validateAsync,
	ariaDescribedBy,
}: UseInputProps): UseInputReturn {
	const [value, setValue] = useState<string>(initialValue)
	const [error, setError] = useState<boolean>(false)
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const [isTyping, setIsTyping] = useState<boolean>(false)
	const [isValid, setIsValid] = useState<boolean>(false)
	const debounceRef = useRef<NodeJS.Timeout | null>(null)

	const handleValueChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value
			setValue(newValue)
			setIsTyping(true)
			if (debounceRef.current) {
				clearTimeout(debounceRef.current)
			}
			debounceRef.current = setTimeout(async () => {
				const isValidSync = validateSync(newValue)
				let isValidAsync = true
				if (isValidSync) {
					isValidAsync = await validateAsync(newValue)
				}
				setIsValid(isValidSync && isValidAsync)
				setError(!isValidSync || !isValidAsync)
				setIsTyping(false)
			}, 300)
		},
		[validateSync, validateAsync],
	)

	const handleFocus = () => setIsFocused(true)

	const handleBlur = () => {
		setIsFocused(false)
		setIsTyping(false)
	}

	useEffect(() => {
		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current)
			}
		}
	}, [])

	const inputClassName = isTyping
		? 'typing-style'
		: error
			? 'error-style'
			: 'normal-style'

	const showError = isFocused && error

	return {
		value,
		setValue,
		error,
		setError,
		isFocused,
		isTyping,
		isValid,
		handleValueChange,
		handleFocus,
		handleBlur,
		inputClassName,
		showError,
		ariaDescribedBy,
	}
}
