// components/atoms/Button/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type React from 'react'
import { type ButtonProps } from './ButtonProps'
import { useState } from 'react';

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
    disabled = false
}) => {
	
    const [shake, setShake] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (disabled) {
            // Trigger the shake animation if the button is functionally "disabled"
            setShake(true);
            setTimeout(() => setShake(false), 820);  // Reset shake after animation duration
            e.preventDefault(); // Prevent any further actions intended by the button click
        } else {
            // Proceed with the normal onClick function if not disabled
            onClick
        }
    };

    const baseStyles = "button text-white py-2 px-5 tracking-wide";
    const variantClasses = buttonVariants[variant] || buttonVariants.primary;
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed shadow-none' : '';

    return (
        <button
            type={type}
            className={`${baseStyles} ${variantClasses} ${disabledClasses} ${className} ${shake ? 'shake cursor-wait' : ''}`}
			onClick={!disabled ? onClick : e => (handleClick(e))}
        >
            {icon ? <FontAwesomeIcon icon={icon} className="mr-2" /> : null}
            {children}
        </button>
    );
};

export default Button;
