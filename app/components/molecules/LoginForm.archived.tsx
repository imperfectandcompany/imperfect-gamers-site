// import { withZod } from '@remix-validated-form/with-zod'
// import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import { Honeypot } from 'remix-utils/honeypot/server'
// import { z } from 'zod'
// import Button from '~/components/atoms/Button/Button'
// import { inputBorderStyles } from '~/components/atoms/styles/InputBorderStyles'
// import type { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'

// interface SubmitButtonProps {
// 	isDisabled: boolean
// 	onClick: () => void
// 	classes: string
// 	buttonText: string
// }

// export const SubmitButton = memo(
// 	({ isDisabled, onClick, classes, buttonText }: SubmitButtonProps) => {
// 		return (
// 			<Button
// 				type="submit"
// 				disabled={isDisabled}
// 				onClick={onClick}
// 				className={classes}
// 			>
// 				{buttonText}
// 			</Button>
// 		)
// 	},
// )
// SubmitButton.displayName = 'SubmitButton'

// interface UseInputReturn {
// 	value: string
// 	setValue: React.Dispatch<React.SetStateAction<string>>
// 	error: boolean
// 	setError: React.Dispatch<React.SetStateAction<boolean>>
// 	isFocused: boolean
// 	isTyping: boolean
// 	isValid: boolean
// 	handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
// 	handleFocus: () => void
// 	handleBlur: () => void
// 	inputClassName: string
// 	showError: boolean
// 	ariaDescribedBy: string
// 	reset: () => void
// }
// export function useInput(
// 	initialValue: string,
// 	validate: (value: string) => boolean,
// 	ariaDescribedBy: string,
// ): UseInputReturn {
// 	const [value, setValue] = useState(initialValue)
// 	const [error, setError] = useState(false)
// 	const [isFocused, setIsFocused] = useState(false)
// 	const [isTyping, setIsTyping] = useState(false)
// 	const [isValid, setIsValid] = useState(false)
// 	const typingTimeoutRef = useRef<null | NodeJS.Timeout>(null)

// 	const reset = useCallback(
// 		(newValue: string = initialValue) => {
// 			setValue(newValue) // Reset the value
// 			setError(false) // Reset any errors
// 			setIsValid(false) // Reset validity state
// 		},
// 		[initialValue],
// 	)

// 	const handleValueChange = useCallback(
// 		(e: React.ChangeEvent<HTMLInputElement>) => {
// 			const newValue = e.target.value
// 			setValue(newValue) // Set value immediately for user feedback
// 			setIsTyping(true)
// 			clearTimeout(typingTimeoutRef.current!) // Clear existing timeout

// 			typingTimeoutRef.current = setTimeout(() => {
// 				setIsTyping(false)
// 				setError(!validate(newValue)) // Validate after user has stopped typing
// 			}, 300)
// 		},
// 		[validate],
// 	)
// 	const handleFocus = () => setIsFocused(true)
// 	const handleBlur = () => {
// 		setIsFocused(false)
// 		setIsTyping(false)
// 	}
// 	const inputClassName = useMemo(() => {
// 		if (isTyping) return inputBorderStyles.typing
// 		if (value.length === 0 || (!error && !isFocused)) return 'border-white/10'
// 		if (error) return inputBorderStyles.error
// 		if (!error && isFocused) return inputBorderStyles.valid
// 		return inputBorderStyles.neutral
// 	}, [value, error, isFocused, isTyping])
// 	const showError = useMemo(() => {
// 		if (value.length === 0 || !isFocused) return false
// 		return error ? true : false
// 	}, [value, error, isFocused])
// 	useEffect(() => {
// 		const timeoutId = setTimeout(() => {
// 			setIsTyping(false)
// 		}, 300)
// 		return () => clearTimeout(timeoutId)
// 	}, [value])
// 	useEffect(() => {
// 		setIsValid(!error && value.trim() !== '') // Update validity based on error and value
// 	}, [error, value])
// 	return {
// 		value,
// 		setValue,
// 		error,
// 		setError,
// 		isFocused,
// 		isTyping,
// 		isValid,
// 		handleValueChange,
// 		handleFocus,
// 		handleBlur,
// 		inputClassName,
// 		showError,
// 		ariaDescribedBy,
// 		reset,
// 	}
// }
// export interface LoginProps {
// 	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
// }

// const signUpSchema = z.object({
// 	email: z.string().email({ message: 'Invalid email address' }),
// 	password: z
// 		.string()
// 		.min(6, { message: 'Password must be at least 6 characters' }),
// })

// export const validate = withZod(signUpSchema)

