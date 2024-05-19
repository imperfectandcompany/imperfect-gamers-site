// components/atoms/Button/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type React from 'react'
import { useEffect, useState } from 'react'
import { type ButtonProps } from './ButtonProps'

const buttonVariants = {
	primary:
		'bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-l',
	secondary: 'bg-secondary-color hover:bg-secondary-dark',
	danger: 'bg-red-500 hover:bg-red-700',
}

/**
 * Button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.variant='primary'] - The variant of the button.
 * @param {string} [props.type='button'] - The type of the button.
 * @param {React.ReactNode} [props.icon] - The icon to be displayed before the button text.
 * @param {React.ReactNode} [props.children] - The content of the button.
 * @param {Function} [props.onClick] - The click event handler for the button.
 * @param {string} [props.className] - Additional CSS classes for the button.
 * @param {boolean} [props.disabled] - For disabled button
 * @returns {JSX.Element} The rendered Button component.
 */
const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	type = 'button',
	icon,
	children,
	onClick,
	className,
	disabled = false,
}) => {
	const [shake, setShake] = useState(false)

	// Handle click events on the button
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (disabled) {
			setShake(true) // Trigger shake
			e.preventDefault() // Stop all other handlers
			console.log('Shake due to disabled state.')
		} else {
			onClick?.() // Remove the argument from the function call
		}
	}
	// Effect to reset shake state
	useEffect(() => {
		if (shake) {
			const timer = setTimeout(() => {
				setShake(false) // Reset shake after animation duration
			}, 820) // Duration of shake animation
			return () => clearTimeout(timer) // Cleanup timeout on component unmount or before the effect runs again
		}
	}, [shake])

	const baseStyles = 'button text-white py-2 px-5 tracking-wide'
	const variantClasses = buttonVariants[variant] || buttonVariants.primary
	const disabledClasses = disabled
		? 'opacity-50 cursor-not-allowed shadow-none'
		: ''

	return (
		<button
			type={type}
			className={`${baseStyles} ${variantClasses} ${disabledClasses} ${className} select-none ${shake ? 'shake cursor-grab' : ''}`}
			onClick={handleClick}
		>
			{icon ? <FontAwesomeIcon icon={icon} className="mr-2" /> : null}
			{children}
		</button>
	)
}

export default Button
