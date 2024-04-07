// components/atoms/Button/Button.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonProps } from './ButtonProps';

const buttonVariants = {
  primary:
    'bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-l',
  secondary: 'bg-secondary-color hover:bg-secondary-dark',
  danger: 'bg-red-500 hover:bg-red-700',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  type = 'button',
  icon,
  children,
  onClick,
  className,
}) => {
  const baseStyles = `
    button text-white py-2 px-5 rounded-md font-bold tracking-wide shadow-custom transition-all duration-300 ease-in-out relative overflow-hidden mt-5 cursor-pointer
  `;

  const variantClasses = buttonVariants[variant] || buttonVariants.primary;

  const combinedClasses = `${baseStyles} ${variantClasses} ${className}`;

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;