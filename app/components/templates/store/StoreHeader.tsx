// components/templates/store/StoreHeader.tsx
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { useState } from 'react'
import Button from '~/components/atoms/Button/Button'
import AuthForms from '~/components/organism/AuthForms/AuthForms'
import { MembershipCard } from '~/components/organism/MembershipCard/MembershipCard'
import ModalWrapper from '~/components/organism/ModalWrapper/ModalWrapper'
import type { LoaderData } from '~/routes/store'

/**
 * Renders the header component for the store page.
 *
 * This component displays the header section of the store page. It includes the title,
 * subtitle, membership card, and a modal wrapper for authentication forms. The content
 * of the header may vary depending on the user's authentication status and Steam
 * account linkage.
 *
 * @returns The rendered StoreHeader component.
 */

// Helper function to debounce calls
function debounce<T extends (...args: any[]) => any>(
	func: T,
	delay: number,
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>
	return function (...args: Parameters<T>) {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

export function useInput(
	initialValue: string,
	validate: {
		(email: string): boolean
		(password: string): boolean
		(value: any): boolean
		(arg0: any): any
	},
	ariaDescribedBy: string,
) {
	const [value, setValue] = React.useState(initialValue)
	const [error, setError] = React.useState(false)
	const [isFocused, setIsFocused] = React.useState(false)

	const handleValueChange = e => {
		const newValue = e.target.value
		setValue(newValue)
		setError(!validate(newValue))
	}

	const handleFocus = () => setIsFocused(true)
	const handleBlur = () => setIsFocused(false)

	const inputClassName = React.useMemo(() => {
		if (value.length === 0 || (!error && !isFocused)) return 'border-gray-600'
		return error ? 'border-red-500' : 'border-green-500'
	}, [value, error, isFocused])

	const showError = React.useMemo(() => {
		return error && isFocused
	}, [error, isFocused])

	return {
		value,
		setValue,
		error,
		setError,
		isFocused,
		handleValueChange,
		handleFocus,
		handleBlur,
		inputClassName,
		showError,
		ariaDescribedBy,
	}
}

export default function StoreHeader() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<boolean>(false)
	const [emailError, setEmailError] = useState<boolean>(false)
	const [showEmailValidation, setShowEmailValidation] = useState<boolean>(false)
	const [showPasswordValidation, setShowPasswordValidation] =
		useState<boolean>(false)
	const [showConfirmPasswordValidation, setShowConfirmPasswordValidation] =
		useState<boolean>(false)
	const isPasswordValid = password.length >= 6

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = e.target.value
		setEmail(newEmail)
		setShowEmailValidation(false)
		if (newEmail) {
			debouncedValidationEmail(newEmail)
		} else {
			setEmailError(false)
			setShowEmailValidation(false)
		}
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value
		setPassword(newPassword)
		setShowPasswordValidation(true)
		if (newPassword.length >= 6) {
			setPasswordError(false)
			if (confirmPassword) {
				validatePasswords(newPassword, confirmPassword)
			}
		} else {
			setPasswordError(true)
			setShowConfirmPasswordValidation(false)
			setConfirmPassword('')
		}
	}

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newConfirmPassword = e.target.value
		setConfirmPassword(newConfirmPassword)
		setShowConfirmPasswordValidation(true)
		if (newConfirmPassword) {
			validatePasswords(password, newConfirmPassword)
		} else {
			setPasswordError(true)
			setShowConfirmPasswordValidation(false)
		}
	}

	const validatePasswords = (pass: string, confirmPass: string) => {
		setPasswordError(pass !== confirmPass)
	}

	const validateEmail = (email: string) => {
		setShowEmailValidation(true)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
		setEmailError(!emailRegex.test(email))
	}

	const debouncedValidationEmail = debounce(validateEmail, 500)

	const { isAuthenticated, isSteamLinked, username } =
		useLoaderData<LoaderData>()

	const title =
		isAuthenticated && username && isSteamLinked
			? `Join The Club, ${username}`
			: 'Unauthorized Action'

	const emailInput = useInput(
		'',
		(email: string) =>
			/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).toLowerCase()),
		'email-error',
	)
	const passwordInput = useInput(
		'',
		(password: string) => password.length >= 6,
		'password-error',
	)
	const confirmPasswordInput = useInput(
		'',
		value => value === passwordInput.value,
		'confirm-password-error',
	)

	React.useEffect(() => {
		confirmPasswordInput.setError(
			confirmPasswordInput.value !== passwordInput.value,
		)
	}, [passwordInput.value, confirmPasswordInput.value])

	return (
		<div>
			<h1 className="title">Imperfect Gamers Club</h1>
			<p className="subtitle">
				Join now through the exclusive access member pass
			</p>
			<MembershipCard />
			<div className="mt-8 flex justify-center">
				{/** header={header} TODO after priorities **/}

				<div className="flex min-h-screen items-center justify-center bg-black">
					<div className="w-96 rounded-lg border border-gray-700 bg-black p-8">
						<h1 className="mb-6 text-2xl text-white">Sign Up</h1>
						<div className="mb-4">
							<input
								className={`w-full rounded border bg-gray-900 p-2 text-white outline-none ${emailInput.inputClassName}`}
								type="email"
								placeholder="Email"
								value={emailInput.value}
								onChange={emailInput.handleValueChange}
								onFocus={emailInput.handleFocus}
								onBlur={emailInput.handleBlur}
								aria-invalid={emailInput.error}
								aria-describedby={emailInput.ariaDescribedBy}
							/>
							<div
								id="email-error"
								className={`error-message ${emailInput.showError ? 'visible' : 'invisible'} mt-1 text-sm text-red-500`}
							>
								Invalid email address
							</div>
						</div>
						<div className="mb-4">
							<input
								className={`w-full rounded border bg-gray-900 p-2 text-white outline-none ${passwordInput.inputClassName}`}
								type="password"
								placeholder="Password"
								value={passwordInput.value}
								onChange={passwordInput.handleValueChange}
								onFocus={passwordInput.handleFocus}
								onBlur={passwordInput.handleBlur}
								aria-invalid={passwordInput.error}
								aria-describedby={passwordInput.ariaDescribedBy}
							/>
							<div
								id="password-error"
								className={`error-message ${passwordInput.showError ? 'visible' : 'invisible'} mt-1 text-sm text-red-500`}
							>
								Password must be at least 6 characters
							</div>
						</div>
						{passwordInput.value && !passwordInput.error && (
							<div className="mb-4">
								<input
									className={`w-full rounded border bg-gray-900 p-2 text-white outline-none ${confirmPasswordInput.inputClassName}`}
									type="password"
									placeholder="Confirm Password"
									value={confirmPasswordInput.value}
									onChange={confirmPasswordInput.handleValueChange}
									onFocus={confirmPasswordInput.handleFocus}
									onBlur={confirmPasswordInput.handleBlur}
									aria-invalid={confirmPasswordInput.error}
									aria-describedby={confirmPasswordInput.ariaDescribedBy}
								/>
								<div
									id="confirm-password-error"
									className={`error-message ${confirmPasswordInput.showError ? 'visible' : 'invisible'} mt-1 text-sm text-red-500`}
								>
									Passwords do not match
								</div>
							</div>
						)}
						<button className="w-full rounded bg-gradient-to-r from-red-800 to-red-900 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
							Create Account
						</button>
						<div className="mt-6 flex flex-col items-center justify-between text-center text-sm">
							<p className="text-gray-400">
								Have an account?{' '}
								<a href="#" className="text-red-500 underline">
									Log in
								</a>
							</p>
							<p className="mt-8 text-xs text-gray-400">
								By signing up, you agree to our{' '}
								<span className="text-red-500 underline">Terms of Service</span>{' '}
								and{' '}
								<span className="text-red-500 underline">Privacy policy</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<ModalWrapper title={title} content={<AuthForms />}>
					<Button>Join Now</Button>
				</ModalWrapper>
			<div className="flex min-h-screen items-center justify-center">
				<div className="w-96 rounded-lg border border-stone-800 bg-black p-8">
					<h1 className="mb-6 text-2xl text-white">Sign Up</h1>
					<div className="mb-4">
						<input
							className={`w-full rounded border bg-stone-900 p-2 text-white ${
								emailError && email ? 'border-stone-700' : 'border-stone-900'
							} outline-none`}
							type="email"
							placeholder="Email"
							value={email}
							onChange={e => {
								const newEmail = e.target.value
								setEmail(newEmail)
								if (newEmail) {
									debouncedValidationEmail(newEmail)
								} else {
									setEmailError(false)
									setShowEmailValidation(false)
								}
							}}
							onBlur={() => {
								if (!email) {
									setEmailError(false)
									setShowEmailValidation(false)
								}
							}}
							onMouseEnter={() => setShowEmailValidation(true)}
							onMouseLeave={() => setShowEmailValidation(false)}
						/>
						<input
							className={`w-full rounded border bg-stone-900 p-2 text-white ${emailError ? 'border-red-600' : 'border-stone-700'} outline-none`}
							type="email"
							placeholder="Email"
							value={email}
							onChange={handleEmailChange}
						/>
						{emailError && showEmailValidation && (
							<p
								className="mt-1 text-xs text-red-600 transition-opacity duration-500 ease-in-out"
								style={{ opacity: emailError ? 1 : 0 }}
							>
								Please enter a valid email address
							</p>
						)}
					</div>
					<div className="mb-4">
						<input
							className={`w-full rounded border bg-stone-900 p-2 text-white ${!isPasswordValid && showPasswordValidation ? 'border-red-600' : 'border-stone-700'} outline-none`}
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
						/>
						{!isPasswordValid && showPasswordValidation && password && (
							<p
								className="mt-1 text-xs text-red-600 transition-opacity duration-500 ease-in-out"
								style={{ opacity: 1 }}
							>
								Password must be at least 6 characters
							</p>
						)}
					</div>
					{isPasswordValid && (
						<div className="mb-6">
							<input
								className={`w-full rounded border bg-stone-900 p-2 text-white ${passwordError && showConfirmPasswordValidation ? 'border-red-600' : 'border-stone-700'} outline-none`}
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
							/>
							{passwordError && showConfirmPasswordValidation && (
								<p
									className="mt-1 text-xs text-red-600 transition-opacity duration-500 ease-in-out"
									style={{ opacity: passwordError ? 1 : 0 }}
								>
									Passwords don't match
								</p>
							)}
						</div>
					)}
					<button className="w-full rounded bg-gradient-to-r from-red-800 to-red-900 py-2 text-white">
						Sign Up
					</button>
					<div className="mt-4 flex items-center justify-between text-sm">
						<p className="text-stone-400">
							Already have an account?{' '}
							<a href="#" className="text-stone-300">
								Sign in
							</a>
						</p>
						<p className="text-stone-400">
							<a href="#" className="text-stone-300">
								Forgot password
							</a>
						</p>
					</div>
				</div>
			</div>
			{!isAuthenticated ? (
				<p className="mt-4 text-center text-sm text-white">
					Please log in or sign up to join the club.
				</p>
			) : null}
		</div>
	)
}
