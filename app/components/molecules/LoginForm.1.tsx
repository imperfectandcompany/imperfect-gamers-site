import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HoneypotProvider, HoneypotInputs } from 'remix-utils/honeypot/react'
import { ValidatedForm } from 'remix-validated-form'
import Button from '~/components/atoms/Button/Button'
import LottieAnimation from '~/components/atoms/LottieAnimation'
import { animationStyles } from '~/components/atoms/styles/AnimationStyles'
import ErrorMessage from '~/components/molecules/ErrorMessage/ErrorMessage'
import InputField from '~/components/molecules/InputField/InputField'
import MessageContainer from '~/components/pending/MessageContainer'
import {
	useDispatch,
	useDispatchState,
} from '~/components/pending/ProcessProvider'
import { useHackedFetcher } from '~/utils/general'
import { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'
import type { LoginProps } from './LoginForm'
import { honeypot, useInput, validate, SubmitButton } from './LoginForm'

export const LoginForm: React.FC<LoginProps> = ({
	setCloseInterceptReason,
}) => {
	const honeypotProps = honeypot.getInputProps()

	const [loginSuccess, setLoginSuccess] = useState(false)
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

	const formIsValid = useMemo(
		() => emailInput.isValid && passwordInput.isValid,
		[emailInput.isValid, passwordInput.isValid],
	)
	const isDisabled = isSubmitting || !formIsValid

	const formIsDirty = useMemo(
		() => emailInput.value || passwordInput.value,
		[emailInput.value, passwordInput.value],
	)

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
	}, [fetcher.state, formIsDirty, isSubmitting, setCloseInterceptReason])

	useEffect(() => {
		updateCloseInterceptReason()
		// No return value from this useEffect
	}, [updateCloseInterceptReason])

	const dispatch = useDispatch()
	const state = useDispatchState()

	const currentDispatch = state.find(dispatch => dispatch.inProgress)
	const errorMessage = (fetcher.data as { error: string })?.error

	useEffect(() => {
		const handleSuccess = () => {
			console.log('Login successful:', fetcher.data)
			emailInput?.reset()
			passwordInput?.reset()
			setLoginSuccess(true)
		}

		const handleError = () => {
			console.log('Login was not successful:', fetcher.data)
			passwordInput?.reset()
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
	}, [fetcher.state, fetcher.data, dispatch, emailInput, passwordInput])

	const handleClick = useCallback(() => {
		if (isDisabled) {
			setShake(true)
			setTimeout(() => setShake(false), 820)
		}
	}, [isDisabled, setShake])

	// Modify the main return logic to conditionally render based on Login Success
	if (loginSuccess) {
		// Render a success view
		return (
			<div className="flex flex-col items-center justify-center">
				<LottieAnimation
					animationUrl="https://lottie.host/e5605e5a-c7de-4af0-827e-9be64091bc7f/V2SQO19y5v.json"
					style={{ width: '250px', height: '250px' }}
					loop={false}
				/>
				<h1 className="mt-6 text-3xl text-white">Entering memberzone.</h1>
				<p className="mt-4 text-gray-400">
					Nice job logging in! Let&apos;s intiate your pass first.
				</p>
				<Button className="mt-6 rounded bg-gradient-to-r from-red-700 to-red-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
					Go to Login
				</Button>
			</div>
		)
	}

	const handleFormSubmit = (
		data: { email: string; password: string },
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault()
		if (!isSubmitting) {
			fetcher.submit(data, {
				method: 'post',
				action: '/login',
			})
		}
	}

	return (
		<div className="flex items-center justify-center">
			<div className=" p-8">
				<h1 className="form-title mb-6 select-none text-2xl text-white">
					Yoo--yo. Welcome back.
				</h1>
				{errorMessage && !isSubmitting && currentDispatch ? (
					<MessageContainer message={currentDispatch.message} />
				) : null}
				<HoneypotProvider {...honeypotProps}>
					<ValidatedForm
						key="SignUpForm"
						validator={validate}
						action="/login"
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
            </div>
            below is temp hidden because it's going to change!
            */}
					<div className="mt-8 hidden text-xs text-stone-500 ">
						Please note that you are accessing a beta version of the platform,
						which is still undergoing final testing before its official release.
					</div>
				</div>
			</div>
		</div>
	)
}
