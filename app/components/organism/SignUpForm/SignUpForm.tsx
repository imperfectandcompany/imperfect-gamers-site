import { withZod } from '@remix-validated-form/with-zod'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HoneypotProvider, HoneypotInputs } from 'remix-utils/honeypot/react'
import { Honeypot } from 'remix-utils/honeypot/server'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import Button from '~/components/atoms/Button/Button'
import LottieAnimation from '~/components/atoms/LottieAnimation'
import { animationStyles } from '~/components/atoms/styles/AnimationStyles'
import { inputBorderStyles } from '~/components/atoms/styles/InputBorderStyles'
import ConfirmPasswordField from '~/components/molecules/ConfirmPasswordField/ConfirmPasswordField'
import ErrorMessage from '~/components/molecules/ErrorMessage/ErrorMessage'
import InputField from '~/components/molecules/InputField/InputField'
import MessageContainer from '~/components/pending/MessageContainer'
import {
	useDispatch,
	useDispatchState,
} from '~/components/pending/ProcessProvider'
import { useHackedFetcher } from '~/utils/general'
import { CloseInterceptReason } from '../ModalWrapper/ModalWrapper'

interface SubmitButtonProps {
	isDisabled: boolean
	onClick: () => void
	classes: string
	buttonText: string
}

const SubmitButton = memo(
	({ isDisabled, onClick, classes, buttonText }: SubmitButtonProps) => {
		return (
			<Button
				type="submit"
				disabled={isDisabled}
				onClick={onClick}
				className={classes}
			>
				{buttonText}
			</Button>
		)
	},
)

SubmitButton.displayName = 'SubmitButton'

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
	reset: () => void
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

	const reset = useCallback(
		(newValue: string = initialValue) => {
			setValue(newValue) // Reset the value
			setError(false) // Reset any errors
			setIsValid(false) // Reset validity state
		},
		[initialValue],
	)

	const handleValueChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value
			setValue(newValue) // Set value immediately for user feedback
			setIsTyping(true)
			clearTimeout(typingTimeoutRef.current!) // Clear existing timeout

			typingTimeoutRef.current = setTimeout(() => {
				setIsTyping(false)
				setError(!validate(newValue)) // Validate after user has stopped typing
			}, 300)
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
		}, 300)
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
		isTyping,
		isValid,
		handleValueChange,
		handleFocus,
		handleBlur,
		inputClassName,
		showError,
		ariaDescribedBy,
		reset,
	}
}
interface SignUpFormProps {
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
	setPrefilledEmail: (username: string) => void
	switchToLoginForm: () => void
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

const honeypot = new Honeypot()

/**
 * Sign up form component.
 *
 * This component renders a sign-up form using the Remix framework, React Router Fetcher,
 * and Remix Validated Form flavor. It allows users to enter their email and password,
 * and submits the form data to the "/register" endpoint.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} setCloseInterceptReason - Function to set the close intercept reason.
 * @returns {JSX.Element} The rendered SignUpForm component.
 */
const SignUpForm: React.FC<SignUpFormProps> = ({
	setCloseInterceptReason,
	setPrefilledEmail,
	switchToLoginForm,
}) => {
	const honeypotProps = honeypot.getInputProps()

	const [registrationSuccess, setRegistrationSuccess] = useState(false)
	const fetcher = useHackedFetcher()
	const isSubmitting =
		fetcher.state === 'submitting' || fetcher.state === 'loading'

	const [shake, setShake] = useState(false)

	const prevFetcherState = useRef(fetcher.state)

	const emailInput = useInput(
		'',
		(email: string) =>
			/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).toLowerCase()),
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
	const isDisabled = isSubmitting || !formIsValid

	const formIsDirty = useMemo(
		() => emailInput.value || passwordInput.value || confirmPasswordInput.value,
		[emailInput.value, passwordInput.value, confirmPasswordInput.value],
	)
	const errorMessage = (fetcher.data as { error: string })?.error

	const updateCloseInterceptReason = useCallback(() => {
		let reason = CloseInterceptReason.None
		if (isSubmitting) {
			reason = CloseInterceptReason.RequestInProgress
		} else if (formIsDirty) {
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
	}, [
		fetcher.state,
		fetcher.data,
		confirmPasswordInput,
		errorMessage,
		formIsDirty,
		isSubmitting,
		fetcher.data,
		confirmPasswordInput,
		setCloseInterceptReason,
	])

	useEffect(() => {
		updateCloseInterceptReason()
		// No return value from this useEffect
	}, [updateCloseInterceptReason, fetcher.data])

	useEffect(() => {
		confirmPasswordInput.setError(
			confirmPasswordInput.value !== passwordInput.value,
		)
	}, [
		passwordInput.value,
		confirmPasswordInput.value,
		errorMessage,
		confirmPasswordInput,
	])

	const dispatch = useDispatch()
	const state = useDispatchState()

	const currentDispatch = state.find(dispatch => dispatch.inProgress)

	useEffect(() => {
		const handleSuccess = async () => {
			console.log('Registration successful:', fetcher.data)
			setPrefilledEmail(emailInput.value)
			passwordInput?.reset()
			confirmPasswordInput?.reset()
			setRegistrationSuccess(true)
		}

		const handleError = () => {
			console.log('Registration was not successful:', fetcher.data)
			passwordInput?.reset()
			confirmPasswordInput?.reset()
			if (errorMessage) {
				dispatch.send(errorMessage)
			}
		}

		if (fetcher.state !== prevFetcherState.current) {
			if (fetcher.data && typeof fetcher.data === 'object') {
				if ((fetcher.data as { success?: boolean }).success) {
					handleSuccess()
				} else {
					handleError()
				}
			}
			prevFetcherState.current = fetcher.state // Move this line inside the condition
		}
	}, [
		fetcher.state,
		fetcher.data,
		dispatch,
		emailInput,
		passwordInput,
		confirmPasswordInput,
		errorMessage,
	])

	const handleClick = useCallback(() => {
		if (isDisabled) {
			setShake(true)
			setTimeout(() => setShake(false), 820)
		}
	}, [isDisabled, setShake])

	// Modify the main return logic to conditionally render based on registrationSuccess
	if (registrationSuccess) {
		// Render a success view
		return (
			<div className="flex flex-col items-center justify-center">
				<LottieAnimation
					animationUrl="https://lottie.host/e5605e5a-c7de-4af0-827e-9be64091bc7f/V2SQO19y5v.json"
					style={{ width: '250px', height: '250px' }}
					loop={false}
				/>
				<h1 className="mt-6 text-3xl text-white">Registration Complete!</h1>
				<p className="mt-4 text-gray-400">
					Nice job! Your account has been successfully created.
				</p>
				<Button
					onClick={switchToLoginForm}
					className="mt-6 rounded bg-gradient-to-r from-red-700 to-red-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
				>
					Go to Login
				</Button>
			</div>
		)
	}

	const handleFormSubmit = (
		data: { email: string; password: string; confirmPassword: string },
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault()
		if (!isSubmitting) {
			fetcher.submit(data, {
				method: 'post',
				action: '/register',
			})
		}
	}

	return (
		<div className="flex items-center justify-center">
			<div className=" p-8">
				<h1 className="form-title mb-6 select-none text-2xl text-white">
					Get Started
				</h1>
				{errorMessage && !isSubmitting && currentDispatch ? (
					<MessageContainer message={currentDispatch.message} />
				) : null}
				<HoneypotProvider {...honeypotProps}>
					<ValidatedForm
						key="SignUpForm"
						validator={validate}
						action="/register"
						method="POST"
						fetcher={fetcher}
						onSubmit={handleFormSubmit}
						className="flex flex-col space-y-4"
					>
						<HoneypotInputs />
						<div>
							<InputField
								name="email"
								disabled={isSubmitting}
								type="email"
								placeholder="Email"
								autocomplete="email"
								tooltipMessage="Clear Email Field"
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
								disabled={isSubmitting}
								type="password"
								placeholder="Password"
								autocomplete="new-password"
								{...passwordInput}
								isTyping={passwordInput.isTyping}
								tooltipMessage="Show Password"
							/>
							<ErrorMessage
								showError={passwordInput.showError}
								message="Password must be at least 6 characters"
								id="password-error"
							/>
						</div>
						{passwordInput.value && !passwordInput.error ? (
							<ConfirmPasswordField
								showField
								name="confirmPassword"
								autocomplete="new-password"
								type="password"
								placeholder="Confirms Password"
								{...confirmPasswordInput}
								tooltipMessage="Show Confirm Password"
							/>
						) : null}
						<div className="flex justify-end">
							<SubmitButton
								onClick={handleClick}
								isDisabled={isDisabled}
								classes={`justify-center border-transparent text-sm font-medium text-white transition-opacity duration-300 focus:outline-none ${shake ? animationStyles.shake : ''}`}
								buttonText={isSubmitting ? 'Submitting...' : 'Submit'}
							/>
						</div>
					</ValidatedForm>
				</HoneypotProvider>
				<div className="mt-6 flex flex-col items-center justify-between text-center text-sm">
					{/** Temporarily hide this block until ready **/}
					{/* <div>
						<p className="text-stone-400">
							Have an account?{' '}
							<a href="#" className="form-primary-link underline">
								Log in
							</a>
						</p>
					</div> */}
					<div className="mt-8 text-xs text-stone-500">
						Please note that you are accessing a beta version of the platform,
						which is still undergoing final testing before its official release.
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUpForm
