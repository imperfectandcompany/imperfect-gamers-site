// components/atoms/Button/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type React from 'react'
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
 * @returns {JSX.Element} The rendered Button component.
 */
const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	type = 'button',
	icon,
	children,
	onClick,
	className,
}) => {
	const baseStyles = `
    button text-white py-2 px-5 rounded-md font-bold tracking-wide shadow-custom transition-all duration-300 ease-in-out relative overflow-hidden cursor-pointer
  `

	const variantClasses = buttonVariants[variant] || buttonVariants.primary

	const combinedClasses = `${baseStyles} ${variantClasses} ${className}`

	return (
		<button type={type} className={combinedClasses} onClick={onClick}>
			{icon ? <FontAwesomeIcon icon={icon} className="mr-2" /> : null}
			<span>{children}</span>
		</button>
	)
}

export default Button
