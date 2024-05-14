// components/pending/SignUpForm.tsx
import { useFetcher } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useField, ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import Button from '~/components/atoms/Button/Button'
import {
	useFetcherWithPromiseAndReset,
	useFetcherWithReset,
} from '~/utils/general'
import { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'
import MessageContainer from './MessageContainer'
import {
	ProcessProvider,
	useProcessDispatch,
	useProcessState,
} from './ProcessProvider'

interface UseInputReturn {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	error: boolean
	setError: React.Dispatch<React.SetStateAction<boolean>>
	isFocused: boolean
	isValid: boolean
	handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleFocus: () => void
	handleBlur: () => void
	inputClassName: string
	showError: boolean
	ariaDescribedBy: string
}

function useInput(
	initialValue: string,
	validate: (value: string) => boolean,
	ariaDescribedBy: string,
): UseInputReturn {
	const [value, setValue] = useState(initialValue)
	const [error, setError] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const [isValid, setIsValid] = useState(false)

	const typingTimeoutRef = useRef<null | NodeJS.Timeout>(null)

	const handleValueChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value
			setValue(newValue) // Set value immediately for user feedback
			setIsTyping(true)

			clearTimeout(typingTimeoutRef.current!) // Clear existing timeout

			typingTimeoutRef.current = setTimeout(() => {
				setIsTyping(false)
				setError(!validate(newValue)) // Validate after user has stopped typing
			}, 0) // Consider reducing the timeout to improve responsiveness
		},
		[validate],
	)

	const handleFocus = () => setIsFocused(true)
	const handleBlur = () => {
		setIsFocused(false)
		setIsTyping(false)
	}

	const inputClassName = useMemo(() => {
		if (isTyping) return 'input-typing transition-border'
		if (value.length === 0 || (!error && !isFocused))
			return 'border-white/10 transition-border'
		if (error) return 'input-error transition-border'
		if (!error && isFocused) return 'input-valid transition-border'
		return 'input-neutral transition-border'
	}, [value, error, isFocused, isTyping])

	const showError = useMemo(() => {
		if (value.length === 0 || !isFocused) return false
		return error ? true : false
	}, [value, error, isFocused])

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsTyping(false)
		}, 500)
		return () => clearTimeout(timeoutId)
	}, [value])

	useEffect(() => {
		setIsValid(!error && value.trim() !== '') // Update validity based on error and value
	}, [error, value])

	return {
		value,
		setValue,
		error,
		setError,
		isFocused,
		isValid,
		handleValueChange,
		handleFocus,
		handleBlur,
		inputClassName,
		showError,
		ariaDescribedBy,
	}
}

interface InputProps {
	name: string
	type: string
	placeholder: string
	inputProps: {
		value: string
		inputClassName: string
		error: boolean
		ariaDescribedBy?: string
		handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
		handleFocus: () => void
		handleBlur: () => void
	}
}

const Input = memo<InputProps>(({ name, type, placeholder, inputProps }) => {
	const { getInputProps, error } = useField(name, { formId: 'register' })
	return (
		<>
			<input
				{...getInputProps({ id: name, type })}
				className={`w-full rounded ${inputProps.inputClassName} input-background border border-white/5 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out placeholder:text-white/35 focus:border-white/30 focus:outline-none`}
				placeholder={placeholder}
				value={inputProps.value}
				onChange={inputProps.handleValueChange}
				onFocus={inputProps.handleFocus}
				onBlur={inputProps.handleBlur}
				aria-invalid={inputProps.error}
				aria-describedby={inputProps.ariaDescribedBy}
			/>
			{error ? <span className="error-message show">{error}</span> : null}
		</>
	)
})

// Define the type for ErrorMessage props
interface ErrorMessageProps {
	showError: boolean
	message: string
	id: string
}

const ErrorMessage = memo<ErrorMessageProps>(({ showError, message, id }) => {
	return (
		<div
			id={id}
			className={`error-message transition-opacity duration-300 ease-in-out ${showError ? 'show' : ''}`}
			aria-live="assertive"
		>
			{message}
		</div>
	)
})

const Register: React.FC<RegisterProps> = ({ setCloseInterceptReason }) => {
	const {submit} = useFetcherWithPromiseAndReset({key:'registration'})
	const fetcher = useFetcher({key:'registration'})

	const [formValues, setFormValues] = useState<FormValues>({
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [initialFormValues, setInitialFormValues] = useState<FormValues>({
		...formValues,
	})

	const isFormDirty =
		JSON.stringify(formValues) !== JSON.stringify(initialFormValues)

	/**
	 * Update the close intercept reason based on the form's dirty state.
	 */
	const updateCloseInterceptReason = useCallback(() => {
		let reason = CloseInterceptReason.None

		if (fetcher.state === 'submitting' || fetcher.state === 'loading') {
			reason = CloseInterceptReason.RequestInProgress
		} else if (isFormDirty) {
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
	}, [fetcher.state, isFormDirty, setCloseInterceptReason])

	useEffect(updateCloseInterceptReason, [updateCloseInterceptReason])

	const emailInput = useInput(
		'',
		email => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).toLowerCase()),
		'email-error',
	)
	const passwordInput = useInput(
		'',
		password => password.length >= 6,
		'password-error',
	)
	const confirmPasswordInput = useInput(
		'',
		value => value === passwordInput.value,
		'confirm-password-error',
	)
	const formIsValid = useMemo(
		() =>
			emailInput.isValid &&
			passwordInput.isValid &&
			confirmPasswordInput.isValid,
		[emailInput.isValid, passwordInput.isValid, confirmPasswordInput.isValid],
	)

	// Submit Button with dynamic disabling and loading state
	const SubmitButton: React.FC = () => {
		const isSubmitting =
			fetcher.state === 'submitting' || fetcher.state === 'loading'
		const [shake, setShake] = useState(false)

		const handleClick = () => {
			if (isSubmitting || !formIsValid) {
				// Trigger shake animation if the form is invalid or submitting
				setShake(true)
				setTimeout(() => setShake(false), 820)
			}
		}

		return (
			<Button
				type="submit"
				disabled={isSubmitting || !formIsValid}
				onClick={handleClick}
				className={`justify-center border-transparent text-sm font-medium text-white transition-opacity duration-300 focus:outline-none ${shake ? 'shake' : ''}`}
			>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</Button>
		)
	}

	useEffect(() => {
		confirmPasswordInput.setError(
			confirmPasswordInput.value !== passwordInput.value,
		)
	}, [passwordInput.value, confirmPasswordInput.value])
	const dispatchAction = useProcessDispatch();
	const { inProgress } = useProcessState()
	const { message } = useProcessState();  // This hook would return the current state including messages.

	useEffect(() => {
		if (fetcher.data && typeof fetcher.data === 'object') {
			dispatchAction((fetcher.data as { error: string })?.error);
		}
	}, [fetcher.data]);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-96 rounded-lg border border-stone-800 bg-black p-8">
				<h1 className="form-title mb-6 select-none text-2xl text-white">
					Sign Up
				</h1>
				{(fetcher.data as { error: boolean })?.error && inProgress ? <MessageContainer
						message={message}
					/> : null}
				<ValidatedForm
					key="SignUpForm"
					validator={validate}
					fetcher={fetcher}
					onSubmit={useCallback(async (data: { email: string; password: string; confirmPassword: string; }) => {
						if (formIsValid && fetcher.state !== 'submitting') {
							try {
							  const response = await submit(data, { method: 'post', action: '/register' });
							  // Handle the successful response
							  console.log('Registration successful:', response);
							} catch (error) {
							  // Handle the error
							  console.error('An error occurred:', error);
							}
						  }
						},
					 [formIsValid, fetcher.state, submit])}
					className="flex flex-col space-y-4"
				>
					<div>
						<Input
							name="email"
							type="email"
							placeholder="Email"
							inputProps={emailInput}
						/>
						<ErrorMessage
							showError={emailInput.showError}
							message="Invalid email address"
							id="email-error"
						/>
					</div>
					<div>
						<Input
							name="password"
							type="password"
							placeholder="Password"
							inputProps={passwordInput}
						/>
						<ErrorMessage
							showError={passwordInput.showError}
							message="Password must be at least 6 characters"
							id="password-error"
						/>
					</div>
					{passwordInput.value && !passwordInput.error ? <div
							className={`confirm-password-transition ${passwordInput.value && !passwordInput.error ? 'show' : ''}`}
						>
							<Input
								name="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								inputProps={confirmPasswordInput}
							/>
							<ErrorMessage
								showError={confirmPasswordInput.showError}
								message="Passwords do not match"
								id="confirm-password-error"
							/>
						</div> : null}
					<div className="flex justify-end">
						<SubmitButton />
					</div>
				</ValidatedForm>

				<div className="mt-6 flex flex-col items-center justify-between text-center text-sm">
					<div>
						<p className="text-stone-400">
							Have an account?{' '}
							<a href="#" className="form-primary-link underline">
								Log in
							</a>
						</p>
					</div>
					<div className="mt-8 text-xs text-stone-400">
						By signing up, you agree to our{' '}
						<a
							href="https://imperfectgamers.org/terms-of-service"
							target="_blank"
							className="form-secondary-links underline" rel="noreferrer"
						>
							Terms of Service
						</a>{' '}
						and{' '}
						<a
							href="https://imperfectgamers.org/privacy-policy"
							target="_blank"
							className="form-secondary-links underline" rel="noreferrer"
						>
							Privacy policy
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

/**
 * Props for the LoginForm component.
 */
interface RegisterProps {
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

interface FormValues {
	email: string
	password: string
	confirmPassword: string
}

/**
 * Represents the sign up schema for the form.
 */
const signUpSchema = z
	.object({
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

/**
 * Validates the sign-up form using the provided schema.
 *
 * @param schema - The schema to validate the form against.
 * @returns A function that can be used to validate the form.
 */
const validate = withZod(signUpSchema)
export default Register