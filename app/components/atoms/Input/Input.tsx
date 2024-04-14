import type React from 'react'
import { useState } from 'react'
import { useField } from 'remix-validated-form'

/**
 * Props for the Input component.
 */
type InputProps = {
	name: string // This is required by useField
	type: string // Add the 'type' prop type
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void // Add the 'onBlur' prop type
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void // Add the 'onChange' prop type
} & React.InputHTMLAttributes<HTMLInputElement>

/**
 * Input component for form fields.
 *
 * @component
 * @example
 * ```tsx
 * <Input
 *   name="username"
 *   type="text"
 *   onBlur={handleBlur}
 *   onChange={handleChange}
 *   placeholder="Enter your username"
 * />
 * ```
 *
 * @param {InputProps} props - The input component props.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.type - The type of the input field.
 * @param {Function} props.onBlur - The onBlur event handler for the input field.
 * @param {Function} props.onChange - The onChange event handler for the input field.
 * @returns {JSX.Element} The rendered Input component.
 */
const Input: React.FC<InputProps> = ({ name, type, onBlur, ...props }) => {
	const [isTouched, setIsTouched] = useState(false)
	const [hasValue, setHasValue] = useState(false)

	const { error, getInputProps } = useField(name)
	const inputProps = getInputProps({ id: name, ...props })

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (onBlur) onBlur(e) // If there's an onBlur prop, call it
		setIsTouched(true) // Mark the input as touched when it loses focus
		setHasValue(e.target.value !== '') // Update whether the input has a value
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (props.onChange) props.onChange(e) // If there's an onChange prop, call it
		setHasValue(e.target.value !== '')
	}

	return (
		<>
			<input
				{...inputProps}
				type={type}
				onBlur={handleBlur}
				onChange={handleChange}
				className={`w-full rounded border border-white/30 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out placeholder:text-gray-400 ${
					isTouched && hasValue
						? 'hover:border-white hover:valid:border-green-500  hover:invalid:border-red-600 focus:border-green-500 focus:text-pink-200 focus:outline-none focus:valid:border-green-500 focus:invalid:border-red-600'
						: 'hover:border-white focus:border-white/30 focus:outline-none'
				}`}
			/>
			{error ? <div className="text-red-600">{error}</div> : null}
		</>
	)
}

export default Input
