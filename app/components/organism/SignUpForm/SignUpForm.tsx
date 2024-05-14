import { useFetcher } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import Button from '~/components/atoms/Button/Button'
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
import { useFetcherWithPromiseAndReset } from '~/utils/general'
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

interface UseInputReturn {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	error: boolean
	setError: React.Dispatch<React.SetStateAction<boolean>>
	isFocused: boolean
	isTyping: boolean // Add this line
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



    const reset = useCallback((newValue: string = initialValue) => {
        setValue(newValue); // Reset the value
        setError(false); // Reset any errors
        setIsValid(false); // Reset validity state
    }, [initialValue]);

	const handleValueChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value
			setValue(newValue) // Set value immediately for user feedback
			setIsTyping(true)
			clearTimeout(typingTimeoutRef.current!) // Clear existing timeout

			typingTimeoutRef.current = setTimeout(() => {
				setIsTyping(false)
				setError(!validate(newValue)) // Validate after user has stopped typing
			}, 300) // Consider reducing the timeout to improve responsiveness
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
		reset
	}
}
interface RegisterProps {
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

const Register: React.FC<RegisterProps> = ({ setCloseInterceptReason }) => {
	const { submit, data } = useFetcherWithPromiseAndReset({
		key: 'registration',
	})
	const fetcher = useFetcher({ key: 'registration' })
	const prevFetcherState = useRef(fetcher.state)

	const emailInput = useInput(
		'',
		(email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).toLowerCase()),
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

	const formIsDirty = useMemo(
		() => emailInput.value || passwordInput.value || confirmPasswordInput.value,
		[emailInput.value, passwordInput.value, confirmPasswordInput.value],
	)

	const updateCloseInterceptReason = useCallback(() => {
		let reason = CloseInterceptReason.None
		if (fetcher.state === 'submitting' || fetcher.state === 'loading') {
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
	}, [fetcher.state, formIsDirty, setCloseInterceptReason])

	useEffect(updateCloseInterceptReason, [updateCloseInterceptReason])

	const formIsValid = useMemo(
		() =>
			emailInput.isValid &&
			passwordInput.isValid &&
			confirmPasswordInput.isValid,
		[emailInput.isValid, passwordInput.isValid, confirmPasswordInput.isValid],
	)

	const [submissionState, setSubmissionState] = useState({
		submitting: false,
		showError: false,
	})

	useEffect(() => {
		confirmPasswordInput.setError(
			confirmPasswordInput.value !== passwordInput.value,
		)
	}, [passwordInput.value, confirmPasswordInput.value])

	const dispatch = useDispatch()
	const state = useDispatchState()

	const currentDispatch = state.find(dispatch => dispatch.inProgress)

	useEffect(() => {
		if (fetcher.state !== prevFetcherState.current) {
			if (fetcher.data && typeof fetcher.data === 'object') {
				if ((fetcher.data as { success: boolean })?.success) {
					console.log('Registration successful:', fetcher.data)
					emailInput?.reset()
					passwordInput?.reset()
					confirmPasswordInput?.reset()
					dispatch.send('Registration successful')
				} else if ((fetcher.data as { error: string })?.error) {
					passwordInput?.reset()
					confirmPasswordInput?.reset()
					dispatch.send((fetcher.data as { error: string })?.error)
				}
			}
			prevFetcherState.current = fetcher.state
		}
	}, [fetcher.state, fetcher.data, dispatch])

	const [shake, setShake] = useState(false)

	const handleClick = useCallback(() => {
		const isSubmitting =
			fetcher.state === 'submitting' || fetcher.state === 'loading'
		const isDisabled = isSubmitting || !formIsValid
		if (isDisabled) {
			setShake(true)
			setTimeout(() => setShake(false), 820)
		}
	}, [fetcher.state, formIsValid]) // include necessary dependencies

	return (
		<div className="flex items-center justify-center">
			<div className=" p-8">
				<h1 className="form-title mb-6 select-none text-2xl text-white">
					Get Started
				</h1>
				{(fetcher.data as { error: boolean })?.error && currentDispatch ? (
					<MessageContainer message={currentDispatch.message} />
				) : null}
				<ValidatedForm
					key="SignUpForm"
					validator={validate}
					fetcher={fetcher}
					onSubmit={useCallback(
						async (data: {
							email: string
							password: string
							confirmPassword: string
						}) => {
							if (formIsValid && fetcher.state !== 'submitting') {
								try {
									const response = await submit(data, {
										method: 'post',
										action: '/register',
									})
								} catch (error) {
									console.error('An error occurred:', error)
								}
							}
						},
						[formIsValid, fetcher.state, submit],
					)}
					className="flex flex-col space-y-4"
				>
					<div>
						<InputField
							name="email"
							type="email"
							placeholder="Email"
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
							type="password"
							placeholder="Password"
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
								type="password"
								placeholder="Confirms Password"
								{...confirmPasswordInput}
								tooltipMessage="Show Confirm Password"
							/>
					) : null}
					<div className="flex justify-end">
						<SubmitButton
							onClick={handleClick}
							isDisabled={
								fetcher.state === 'submitting' ||
								fetcher.state === 'loading' ||
								!formIsValid
							}
							classes={`justify-center border-transparent text-sm font-medium text-white transition-opacity duration-300 focus:outline-none ${shake ? animationStyles.shake : ''}`}
							buttonText={
								fetcher.state === 'submitting' || fetcher.state === 'loading'
									? 'Submitting...'
									: 'Submit'
							}
						/>
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
						Please note that you are accessing a beta version of the platform,
						which is still undergoing final testing before its official release.
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
