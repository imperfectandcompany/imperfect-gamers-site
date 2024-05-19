import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useField } from 'remix-validated-form'
import { inputBorderStyles } from '~/components/atoms/styles/InputBorderStyles'
import { inputHoverStyles } from '~/components/atoms/styles/InputHoverStyles'
import { transitionStyles } from '~/components/atoms/styles/TransitionStyles'

export interface InputProps {
	name: string
	type: string
	placeholder: string
	value: string
	error: boolean
	isFocused: boolean
	isTyping: boolean
	handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleFocus: () => void
	handleBlur: () => void
	ariaDescribedBy?: string
	tooltipMessage?: string
	className?: string
	disabled?: boolean
	autocomplete?:
		| 'on'
		| 'off'
		| 'name'
		| 'honorific-prefix'
		| 'given-name'
		| 'additional-name'
		| 'family-name'
		| 'honorific-suffix'
		| 'nickname'
		| 'email'
		| 'username'
		| 'new-password'
		| 'current-password'
		| 'one-time-code'
		| 'organization-title'
		| 'organization'
		| 'street-address'
		| 'address-line1'
		| 'address-line2'
		| 'address-line3'
		| 'address-level4'
		| 'address-level3'
		| 'address-level2'
		| 'address-level1'
		| 'country'
		| 'country-name'
		| 'postal-code'
		| 'cc-name'
		| 'cc-given-name'
		| 'cc-additional-name'
		| 'cc-family-name'
		| 'cc-number'
		| 'cc-exp'
		| 'cc-exp-month'
		| 'cc-exp-year'
		| 'cc-csc'
		| 'cc-type'
		| 'transaction-currency'
		| 'transaction-amount'
		| 'language'
		| 'bday'
		| 'bday-day'
		| 'bday-month'
		| 'bday-year'
		| 'sex'
		| 'url'
		| 'photo'
}

const InputField: React.FC<InputProps> = ({
	name,
	type,
	placeholder,
	value,
	error,
	isFocused,
	isTyping,
	handleValueChange,
	handleFocus,
	handleBlur,
	ariaDescribedBy,
	tooltipMessage,
	className,
	disabled = false,
	autocomplete,
}) => {
	const { getInputProps } = useField(name)
	const [showClearIcon, setShowClearIcon] = useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [showTooltip, setShowTooltip] = useState(false)
	const [previousValue, setPreviousValue] = useState<string | null>(null)
	const [redoEnabled, setRedoEnabled] = useState(false)
	const [isEscapeMode, setIsEscapeMode] = useState(false)

	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (type !== 'password') {
			setShowClearIcon(value.length > 0 && !redoEnabled)
		}
	}, [value, type, redoEnabled])

	const handleValueChangeEnhanced = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			handleValueChange(event)
			setRedoEnabled(false)
		},
		[handleValueChange],
	)

	const setEmailCursorToEnd = (inputElement: HTMLInputElement | null): void => {
		if (!inputElement) return;
	
		// Temporarily change the type to text to manipulate cursor
		const currentType = inputElement.type;
		inputElement.type = 'text';
	
		// Set cursor position to the end of the input
		const valueLength = inputElement.value.length;
		inputElement.setSelectionRange(valueLength, valueLength);
	
		// Revert the type to email
		inputElement.type = currentType;
	
		// Ensure the input is focused after manipulation
		inputElement.focus();
	};
	

	const clearInput = useCallback(() => {
		setPreviousValue(value)
		handleValueChange({
			target: { value: '' },
		} as React.ChangeEvent<HTMLInputElement>)
		handleFocus()
		setShowClearIcon(false)
		setRedoEnabled(true)
		if (inputRef.current) {
			const length = inputRef.current.value.length
			setTimeout(() => {
				inputRef.current?.focus()
				if (['text', 'search', 'URL', 'tel', 'password'].includes(type)) {
					inputRef.current?.setSelectionRange(length, length)
				}
			}, 0)
		}
	}, [value, handleValueChange, handleFocus])

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Escape') {
				if (isEscapeMode) {
					clearInput()
				} else {
					setIsEscapeMode(true)
				}
			}
		},
		[isEscapeMode, clearInput],
	)

	const handleFocusEnhanced = useCallback(() => {
		handleFocus()
		if (inputRef.current) {
			const length = inputRef.current.value.length
			setTimeout(() => {
				inputRef.current?.focus()
				if (['text', 'search', 'URL', 'tel', 'password'].includes(type)) {
				inputRef.current?.setSelectionRange(length, length)
				}
			}, 0)
		}
	}, [handleFocus])

	const cancelEscapeMode = useCallback(() => {
		setIsEscapeMode(false)
	}, [])

	useEffect(() => {
		if (!isFocused) {
			cancelEscapeMode()
		}
	}, [isFocused, cancelEscapeMode])

	const redoInput = useCallback(() => {
		if (previousValue !== null) {
			handleValueChange({
				target: { value: previousValue },
			} as React.ChangeEvent<HTMLInputElement>)
			handleFocus()
			setPreviousValue(null)
			setRedoEnabled(false)
			if (inputRef.current) {
				const length = inputRef.current.value.length
				setTimeout(() => {
					inputRef.current?.focus()
					if (['text', 'search', 'URL', 'tel', 'password'].includes(type)) {
					inputRef.current?.setSelectionRange(length, length)
					}
				}, 0)
			}
		}
	}, [previousValue, handleValueChange, handleFocus])

	const togglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible(prev => !prev)
		if (inputRef.current) {
			const length = inputRef.current.value.length
			setTimeout(() => {
				inputRef.current?.focus()
				if (['text', 'search', 'URL', 'tel', 'password'].includes(type)) {
				inputRef.current?.setSelectionRange(length, length)
				}
			}, 0)
		}
	}, [])

	const handleMouseEnter = useCallback(() => {
		setShowTooltip(true)
	}, [])

	const handleMouseLeave = useCallback(() => {
		setShowTooltip(false)
	}, [])

	const getTooltipMessage = useCallback(() => {
		if (type === 'password') {
			return isPasswordVisible ? 'Hide Password' : 'Show Password'
		} else if (redoEnabled) {
			return 'Redo previous input'
		}
		return tooltipMessage || ''
	}, [isPasswordVisible, type, tooltipMessage, redoEnabled])

	const inputClassName = `w-full rounded ${transitionStyles.transition} ${
		isTyping
			? inputBorderStyles.typing
			: value.length === 0
				? 'border-white/10'
				: error
					? inputBorderStyles.error
					: !error && value.length > 0 && isFocused
						? inputBorderStyles.valid
						: inputBorderStyles.neutral
	} border border-white/5 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out placeholder:text-white/35 focus:border-white/30 focus:outline-none ${className || ''}`

	const hoverClassName = `${
		error
			? inputHoverStyles.hoverError
			: !error && isFocused && value.length > 0
				? inputHoverStyles.hoverValid
				: inputHoverStyles.hoverNeutral
	}`

	return (
		<div className="relative">
			<input
				id={name}
				maxLength={36}
				autoComplete={autocomplete}
				onKeyDown={handleKeyDown}
				ref={inputRef}
				{...getInputProps({
					type: type === 'password' && isPasswordVisible ? 'text' : type,
					placeholder,
					className: `${inputClassName} ${hoverClassName}`,
					value,
					onChange: handleValueChangeEnhanced,
					onFocus: handleFocusEnhanced,
					onBlur: handleBlur,
					'aria-invalid': error,
					'aria-describedby': ariaDescribedBy,
					disabled,
				})}
			/>
			{showClearIcon &&
				!redoEnabled &&
				type !== 'password' &&
				value.length > 0 && (
					<div
						className="clear-icon-container absolute right-2 top-1/2 -translate-y-1/2 transform cursor-default"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<i
							className="fas fa-times-circle clear-icon cursor-pointer text-stone-700"
							style={{ visibility: showClearIcon ? 'visible' : 'hidden' }}
							onClick={clearInput}
						/>
						{tooltipMessage && showTooltip && (
							<div className="input-tooltip cursor-default select-none">
								{getTooltipMessage()}
							</div>
						)}
					</div>
				)}
			{redoEnabled &&
				previousValue &&
				(type !== 'password' || value.length === 0) && (
					<div
						className="redo-icon-container absolute right-2 top-1/2 -translate-y-1/2 transform cursor-default "
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<i
							className="fas fa-undo redo-icon cursor-pointer text-stone-700"
							style={{ visibility: redoEnabled ? 'visible' : 'hidden' }}
							onClick={redoInput}
						/>
						{showTooltip && (
							<div className="input-tooltip cursor-default select-none">
								{getTooltipMessage()}
							</div>
						)}
					</div>
				)}
			{type === 'password' && value.length > 0 && (
				<div
					className="toggle-password-container absolute right-2 top-1/2 -translate-y-1/2 transform cursor-default"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<i
						className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} toggle-password cursor-pointer text-stone-700`}
						onClick={togglePasswordVisibility}
					/>
					{tooltipMessage && showTooltip && (
						<div className="input-tooltip cursor-default select-none">
							{getTooltipMessage()}
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default InputField
