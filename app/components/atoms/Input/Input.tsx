import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ type, onBlur, ...props }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e); // If there's an onBlur prop, call it
    setIsTouched(true); // Mark the input as touched when it loses focus
    setHasValue(e.target.value !== ''); // Update whether the input has a value
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(e); // If there's an onChange prop, call it
    setHasValue(e.target.value !== '');
  };

  return (
    <input
      {...props}
      type={type}
      onBlur={handleBlur}
      onChange={handleChange}
      className={`w-full p-2 rounded bg-white/5 text-white border border-white/30 placeholder-gray-400 transition-all duration-300 ease-in-out ${
        isTouched && hasValue
          ? 'focus:outline-none focus:border-green-500  focus:text-pink-200 hover:border-white hover:invalid:border-red-600 focus:invalid:border-red-600 hover:valid:border-green-500 focus:valid:border-green-500'
          : 'focus:outline-none focus:border-white/30 hover:border-white'
      }`}
    />
  );
};

export default Input;
