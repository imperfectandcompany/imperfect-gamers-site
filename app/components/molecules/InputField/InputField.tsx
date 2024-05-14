import React, { useCallback, useEffect, useState } from 'react';
import { useField } from 'remix-validated-form';
import { inputBorderStyles } from '~/components/atoms/styles/InputBorderStyles';
import { inputHoverStyles } from '~/components/atoms/styles/InputHoverStyles';
import { transitionStyles } from '~/components/atoms/styles/TransitionStyles';

export interface InputProps {
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
  tooltipMessage?: string; // Optional prop for the tooltip message
  className?: string; // Optional prop for custom class name
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
}) => {
  const { getInputProps } = useField(name);
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [redoEnabled, setRedoEnabled] = useState(false);

  useEffect(() => {
    if (type !== 'password') {
      setShowClearIcon(value.length > 0 && !redoEnabled);
    }
  }, [value, type, redoEnabled]);

  const handleValueChangeEnhanced = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(event);
    setRedoEnabled(false); // Disable redo as soon as user types new input
  }, [handleValueChange]);

  const clearInput = useCallback(() => {
    setPreviousValue(value); // Store the current value before clearing
    handleValueChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    handleFocus();
    setShowClearIcon(false);
    setRedoEnabled(true); // Enable redo functionality
  }, [value, handleValueChange, handleFocus]);

  const redoInput = useCallback(() => {
    if (previousValue !== null) {
      handleValueChange({ target: { value: previousValue } } as React.ChangeEvent<HTMLInputElement>);
      handleFocus();
      setPreviousValue(null);
      setRedoEnabled(false); // Disable redo functionality after restoring
    }
  }, [previousValue, handleValueChange, handleFocus]);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowTooltip(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  const getTooltipMessage = useCallback(() => {
    if (type === 'password') {
      return isPasswordVisible ? 'Hide Password' : 'Show Password';
    } else if (redoEnabled) {
      return 'Redo previous input';
    }
    return tooltipMessage || '';
  }, [isPasswordVisible, type, tooltipMessage, redoEnabled]);

  const inputClassName = `w-full rounded ${transitionStyles.transition} ${
    isTyping ? inputBorderStyles.typing : value.length === 0 ? 'border-white/10' : error ? inputBorderStyles.error : (!error && value.length > 0 && isFocused) ? inputBorderStyles.valid : inputBorderStyles.neutral
  } border border-white/5 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out placeholder:text-white/35 focus:border-white/30 focus:outline-none ${className || ''}`;

  const hoverClassName = `${
    error ? inputHoverStyles.hoverError : (!error && isFocused && value.length > 0) ? inputHoverStyles.hoverValid : inputHoverStyles.hoverNeutral
  }`;

  return (
    <div className="relative">
      <input
        id={name}
        maxLength={36}
        {...getInputProps({
          type: type === 'password' && isPasswordVisible ? 'text' : type,
          placeholder,
          className: `${inputClassName} ${hoverClassName}`,
          value,
          onChange: handleValueChangeEnhanced,
          onFocus: handleFocus,
          onBlur: handleBlur,
          'aria-invalid': error,
          'aria-describedby': ariaDescribedBy,
        })}
      />
      {showClearIcon && type !== 'password' && (
        <div
          className="clear-icon-container absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={clearInput}
        >
          <i
            className="fas fa-times-circle clear-icon"
            style={{ visibility: showClearIcon ? 'visible' : 'hidden' }}
          />
          {tooltipMessage && showTooltip && (
            <div className="input-tooltip select-none cursor-default">
              {getTooltipMessage()}
            </div>
          )}
        </div>
      )}
      {redoEnabled && previousValue && type !== 'password' && (
        <div
          className="redo-icon-container absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={redoInput}
        >
          <i
            className="fas fa-undo redo-icon"
            style={{ visibility: redoEnabled ? 'visible' : 'hidden' }}
          />
          {showTooltip && (
            <div className="input-tooltip select-none cursor-default">
              {getTooltipMessage()}
            </div>
          )}
        </div>
      )}
      {type === 'password' && value.length > 0 && (
        <div
          className="toggle-password-container absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={togglePasswordVisibility}
        >
          <i
            className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
          />
          {tooltipMessage && showTooltip && (
            <div className="input-tooltip select-none cursor-default">
              {getTooltipMessage()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
