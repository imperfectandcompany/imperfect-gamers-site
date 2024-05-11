import { useFetcher } from '@remix-run/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ValidatedForm } from 'remix-validated-form'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'
import { useFetcherWithPromiseAndReset } from '~/utils/general'
import Button from '~/components/atoms/Button/Button'
import { animationStyles } from '~/components/atoms/styles/AnimationStyles'
import { inputBorderStyles } from '~/components/atoms/styles/InputBorderStyles'
import ConfirmPasswordField from '~/components/molecules/ConfirmPasswordField/ConfirmPasswordField'
import ErrorMessage from '~/components/molecules/ErrorMessage/ErrorMessage'
import InputField from '~/components/molecules/InputField/InputField'
import MessageContainer from '~/components/pending/MessageContainer'
import {
	useProcessDispatch,
	useProcessState,
} from '~/components/pending/ProcessProvider'
import { CloseInterceptReason } from '../ModalWrapper/ModalWrapper'
interface UseInputReturn {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    isFocused: boolean;
    isTyping: boolean; // Add this line
    isValid: boolean;
    handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    inputClassName: string;
    showError: boolean;
    ariaDescribedBy: string;
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
		if (isTyping) return inputBorderStyles.typing
		if (value.length === 0 || (!error && !isFocused)) return 'border-white/10'
		if (error) return inputBorderStyles.error
		if (!error && isFocused) return inputBorderStyles.valid
		return inputBorderStyles.neutral
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
        isTyping, // Add this line
        isValid,
        handleValueChange,
        handleFocus,
        handleBlur,
        inputClassName,
        showError,
        ariaDescribedBy
	}
}
interface SignUpForm {
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}
interface FormValues {
	email: string
	password: string
	confirmPassword: string
}
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
const validate = withZod(signUpSchema)

const SignUpForm: React.FC<SignUpFormProps> = ({ setCloseInterceptReason }) => {
	const { submit } = useFetcherWithPromiseAndReset({ key: 'registration' })
	const fetcher = useFetcher({ key: 'registration' })
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
		email => /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/.test(String(email).toLowerCase()),
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
	const SubmitButton: React.FC = () => {
		const isSubmitting =
			fetcher.state === 'submitting' || fetcher.state === 'loading'
		const [shake, setShake] = useState(false)
		const handleClick = () => {
			if (isSubmitting || !formIsValid) {
				setShake(true)
				setTimeout(() => setShake(false), 820)
			}
		}

		return (
			<Button
				type="submit"
				disabled={isSubmitting || !formIsValid}
				onClick={handleClick}
				className={`justify-center border-transparent text-sm font-medium text-white transition-opacity duration-300 focus:outline-none ${shake ? animationStyles.shake : ''}`}
			>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</Button>
		)
	}
	const [submissionState, setSubmissionState] = useState({
		submitting: false,
		showError: false,
	})
	useEffect(() => {
		confirmPasswordInput.setError(
			confirmPasswordInput.value !== passwordInput.value,
		)
	}, [passwordInput.value, confirmPasswordInput.value])
	const dispatchAction = useProcessDispatch()
	const { inProgress } = useProcessState()
	const { message } = useProcessState() // This hook would return the current state including messages.

	useEffect(() => {
		if (fetcher.data && typeof fetcher.data === 'object') {
			dispatchAction((fetcher.data as { error: string })?.error)
		}
	}, [fetcher.data])

	return (
		<div className="">
			
			<div className="  bg-black p-8">
				<h1 className="form-title mb-6 select-none text-2xl text-white">
					Sign Up
				</h1>
				{(fetcher.data as { error: boolean })?.error && inProgress && (
					<MessageContainer message={message} />
				)}
				<ValidatedForm
					key="SignUpForm"
					validator={validate}
					fetcher={fetcher}
					onSubmit={async data => {
						if (formIsValid && fetcher.state !== 'submitting') {
							try {
								const response = await submit(data, {
									method: 'post',
									action: '/register',
								})
							} catch (error) {
								console.error('Failed to submit form', error)
							} finally {
								console.log('lmao')
							}
						}
					}}
					className="flex flex-col space-y-4"
				>
					<div>
						<InputField
							name="email"
							type="email"
							placeholder="Email"
							{...emailInput}
							isTyping={emailInput.isTyping} // Pass the isTyping prop
						/>
						<ErrorMessage
							showError={emailInput.showError}
							message="Invalid email address"
							id="email-error"
						/>
					</div>
					<div>
						<InputField
							name="password"
							type="password"
							placeholder="Password"
							{...passwordInput}
							isTyping={passwordInput.isTyping} // Pass the isTyping prop
						/>
						<ErrorMessage
							showError={passwordInput.showError}
							message="Password must be at least 6 characters"
							id="password-error"
						/>
					</div>
					{passwordInput.value && !passwordInput.error && (
						<ConfirmPasswordField
							showField
							name="confirmPassword"
							type="password"
							placeholder="Confirm Password"
							{...confirmPasswordInput}
						/>
					)}
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
							className="form-secondary-links underline"
						>
							Terms of Service
						</a>{' '}
						and{' '}
						<a
							href="https://imperfectgamers.org/privacy-policy"
							target="_blank"
							className="form-secondary-links underline"
						>
							Privacy policy
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUpForm
