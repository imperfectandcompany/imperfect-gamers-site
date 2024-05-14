import type React from 'react';
import { useEffect, useState } from 'react';
import { useField } from 'remix-validated-form';
import { inputBorderStyles } from '~/components/atoms/styles/InputBorderStyles';
import { inputHoverStyles } from '~/components/atoms/styles/InputHoverStyles';
import { transitionStyles } from '~/components/atoms/styles/TransitionStyles';

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error: boolean;
  isFocused: boolean;
  isTyping: boolean;
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  ariaDescribedBy?: string;
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
}) => {
  const { getInputProps } = useField(name);

  // State to manage the visibility of the clear icon
  const [showClearIcon, setShowClearIcon] = useState(false);
  // State to manage the password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // State to manage tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (type !== 'password') {
      setShowClearIcon(value.length > 0);
    }
  }, [value, type]);

  const clearInput = () => {
    handleValueChange({
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>);
    handleFocus();
    setShowClearIcon(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const inputClassName = `w-full rounded ${transitionStyles.transition} ${
    isTyping
      ? inputBorderStyles.typing
      : value.length === 0
      ? 'border-white/10'
      : error
      ? inputBorderStyles.error
      : (!error && value.length > 0 && isFocused)
      ? inputBorderStyles.valid
      : inputBorderStyles.neutral
  } border border-white/5 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out placeholder:text-white/35 focus:border-white/30 focus:outline-none`;

  const hoverClassName = `${
    error
      ? inputHoverStyles.hoverError
      : (!error && isFocused && value.length > 0)
      ? inputHoverStyles.hoverValid
      : inputHoverStyles.hoverNeutral
  }`;

  return (
    <div className="relative">
      <input
        id={name}
        {...getInputProps({
          type: type === 'password' && isPasswordVisible ? 'text' : type,
          placeholder,
          className: `${inputClassName} ${hoverClassName}`,
          value,
          onChange: handleValueChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
          'aria-invalid': error,
          'aria-describedby': ariaDescribedBy,
        })}
      />
      {/* Clear icon element, only shown if the input type is not password */}
      {showClearIcon && type !== 'password' && (
        <i
          className="fas fa-times-circle clear-icon absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={clearInput}
          style={{ visibility: showClearIcon ? 'visible' : 'hidden' }}
        />
      )}
      {/* Password visibility toggle icon, only shown if the input type is password and there's value */}
      {type === 'password' && value.length > 0 && (
        <div
          className="toggle-password-container absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i
            className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
            onClick={togglePasswordVisibility}
          />
          {/* Tooltip */}
          {showTooltip && (
            <div className="input-tooltip select-none cursor-default">
              {isPasswordVisible ? 'Hide Password' : 'Show Password'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
