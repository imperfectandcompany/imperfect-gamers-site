// Button.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonProps } from './ButtonProps';

const buttonVariants = {
  primary: 'bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-l',
  secondary: 'bg-secondary-color hover:bg-secondary-dark', // Example secondary styles
  danger: 'bg-red-500 hover:bg-red-700', // Example danger styles
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary', // Default to 'primary' if no variant is specified
  icon,
  children,
  onClick,
  className,
}) => {
  // Compute the base style class string
  const baseStyles = `
    text-white py-2 px-5 rounded-md font-bold tracking-wide shadow-custom 
    transition-all duration-300 ease-in-out relative overflow-hidden mt-5 cursor-pointer
  `;

  // Compute variant classes, or fallback to 'primary' if the variant isn't defined
  const variantClasses = buttonVariants[variant] || buttonVariants.primary;

  // Combine base styles, variant classes, and any additional classes
  const combinedClasses = `${baseStyles} ${variantClasses} ${className}`;

  return (
    <button className={combinedClasses} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
