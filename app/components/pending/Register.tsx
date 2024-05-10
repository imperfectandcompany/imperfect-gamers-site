// components/pending/SignUpForm.tsx
import { Form, useLoaderData } from '@remix-run/react'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Button from '~/components/atoms/Button/Button'
import type { LoaderData } from '~/routes/store'
import { useField, useIsSubmitting, ValidatedForm } from 'remix-validated-form'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'

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
    const [isValid, setIsValid] = useState(false);


	const typingTimeoutRef = useRef<null | NodeJS.Timeout>(null)

const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);  // Set value immediately for user feedback
        setIsTyping(true);

        clearTimeout(typingTimeoutRef.current!);  // Clear existing timeout

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            setError(!validate(newValue));  // Validate after user has stopped typing
        }, 200);  // Consider reducing the timeout to improve responsiveness
    },
    [validate],
);


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
        setIsValid(!error && value.trim() !== ''); // Update validity based on error and value
    }, [error, value]);


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
	const { getInputProps, error } = useField(name, {formId: 'register'})
	return (
		<>
			<input
				{...getInputProps({ id: name, type })}
                className={`w-full rounded ${inputProps.inputClassName} border border-white/5 bg-white/5 input-background p-2 text-white transition-all duration-300 ease-in-out placeholder:text-white/35 focus:outline-none focus:border-white/30`}
				placeholder={placeholder}
				value={inputProps.value}
				onChange={inputProps.handleValueChange}
				onFocus={inputProps.handleFocus}
				onBlur={inputProps.handleBlur}
				aria-invalid={inputProps.error}
				aria-describedby={inputProps.ariaDescribedBy}
			/>
			{error && <span className="error-message show">{error}</span>}
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

export default function Register() {
    const [isSubmitting, setSubmitting] = useState(false); // Local state to manage submission state

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
    const formIsValid = useMemo(() => emailInput.isValid && passwordInput.isValid && confirmPasswordInput.isValid, [emailInput.isValid, passwordInput.isValid, confirmPasswordInput.isValid]);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!formIsValid) {
            alert('Please correct the errors before submitting.');
            return;
        }
        
        setSubmitting(true); // Set loading state
        // Simulate a network request or handle data submission
        setTimeout(() => {
            console.log('Form data:', { email: emailInput.value, password: passwordInput.value });
            setSubmitting(false); // Reset submission state
        }, 2000);
    };


    // Submit Button with dynamic disabling and loading state
    const SubmitButton: React.FC = () => (
        <Button
            type="submit"
            disabled={isSubmitting || !formIsValid}
            className={`justify-center border-transparent text-sm font-medium text-white focus:outline-none transition-opacity duration-300 disabled:opacity-50`}
        >
            {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
    );

	useEffect(() => {
		confirmPasswordInput.setError(
			confirmPasswordInput.value !== passwordInput.value,
		)
	}, [passwordInput.value, confirmPasswordInput.value])


	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-96 rounded-lg border border-stone-800 bg-black p-8">
				<h1 className="mb-6 text-2xl text-white form-title">Sign Up</h1>
				<Form id="register" method="post" navigate={false} preventScrollReset>
					<div className="mb-4">
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
					<div className="mb-4">
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
					{passwordInput.value && !passwordInput.error && (
						<div
							className={`confirm-password-transition mb-4 ${passwordInput.value && !passwordInput.error ? 'show' : ''}`}
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
						</div>
					)}
					<div className="flex justify-end">
						<SubmitButton />
					</div>
				</Form>

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
						<span className="underline form-secondary-links">Terms of Service</span> and{' '}
						<span className="form-secondary-links underline">Privacy policy</span>
					</div>
				</div>
			</div>
		</div>
	)
}
