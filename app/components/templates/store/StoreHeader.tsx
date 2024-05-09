// components/templates/store/StoreHeader.tsx
import { useLoaderData } from '@remix-run/react'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

interface UseInputReturn {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	error: boolean
	setError: React.Dispatch<React.SetStateAction<boolean>>
	isFocused: boolean
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

	const typingTimeoutRef = useRef<null | NodeJS.Timeout>(null)

	const handleValueChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setIsTyping(true)
			const newValue = e.target.value
			setValue(newValue)
			setError(!validate(newValue))
			clearTimeout(typingTimeoutRef.current ?? undefined)
			typingTimeoutRef.current = setTimeout(() => {
				setIsTyping(false)
			}, 500)
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
			return 'input-neutral transition-border'
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

interface InputProps {
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

const Input = memo<InputProps>(({ type, placeholder, inputProps }) => {
	return (
		<input
			className={`w-full rounded border bg-stone-900 p-2 text-white outline-none ${inputProps.inputClassName}`}
			type={type}
			placeholder={placeholder}
			value={inputProps.value}
			onChange={inputProps.handleValueChange}
			onFocus={inputProps.handleFocus}
			onBlur={inputProps.handleBlur}
			aria-invalid={inputProps.error}
			aria-describedby={inputProps.ariaDescribedBy}
		/>
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

export default function StoreHeader() {
    const { isAuthenticated, isSteamLinked, username } = useLoaderData<LoaderData>();
    const title = useMemo(() => isAuthenticated && username && isSteamLinked ? `Join The Club, ${username}` : 'Unauthorized Action', [isAuthenticated, username, isSteamLinked]);

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

	useEffect(() => {
		confirmPasswordInput.setError(
			confirmPasswordInput.value !== passwordInput.value,
		)
	}, [passwordInput.value, confirmPasswordInput.value])

	return (
		<div>
<div className="">
<h1 className="title">Imperfect Gamers Club</h1>
			<p className="subtitle">
				Join now through the exclusive access member pass
			</p>
			<MembershipCard />
			<div className="mt-8 flex justify-center">

			<ModalWrapper title={title} content={<AuthForms />}>
					<Button>Join Now</Button>
				</ModalWrapper>
</div>

{!isAuthenticated ? (
				<p className="mt-4 text-center text-sm text-white">
					Please log in or sign up to join the club.
				</p>
			) : null}
</div>

			
			<div className="flex min-h-screen items-center justify-center">
				<div className="w-96 rounded-lg border border-stone-800 bg-black p-8">
					<h1 className="mb-6 text-2xl text-white">Sign Up</h1>
					<div className="mb-4">
						<Input
						type="email"
						placeholder="Email"
						inputProps={emailInput} />
						<ErrorMessage
							showError={emailInput.showError}
							message="Invalid email address"
							id="email-error"
						/>
					</div>
					<div className="mb-4">
						<Input
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
					{passwordInput.value && !passwordInput.error && (
						<div className={`mb-4 confirm-password-transition ${passwordInput.value && !passwordInput.error ? 'show' : ''}`}>
							<Input
								type="password"
								placeholder="Confirm Password"
								inputProps={confirmPasswordInput}
							/>
							<ErrorMessage
								showError={confirmPasswordInput.showError}
								message="Passwords do not match"
								id="confirm-password-error"
							/>
						</div>
					)}
					<div>
						<Button>Create Account</Button>
					</div>
					<div className="mt-6 flex flex-col items-center justify-between text-center text-sm">
						<div>
							<p className="text-stone-400">
								Have an account?{' '}
								<a href="#" className="text-red-500 underline">
									Log in
								</a>
							</p>
						</div>
						<div className="mt-8 text-xs text-stone-400">
							By signing up, you agree to our{' '}
							<span className="text-red-500 underline">Terms of Service</span>{' '}
							and <span className="text-red-500 underline">Privacy policy</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
