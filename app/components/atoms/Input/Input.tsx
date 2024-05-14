import type React from 'react'
import { useField } from 'remix-validated-form'

type InputProps = {
  name: string
  type: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  variant?: 'default' | 'error' | 'success' // Define variant types
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({ name, type, onBlur, onChange, variant = 'default', ...rest }) => {
  // Get field properties and error message from useField
  const { error, getInputProps } = useField(name)
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = getInputProps(rest)

  // Event handlers
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }

  // Determine input classes based on variant and error state
  const baseClass = 'w-full rounded border border-white/30 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none'
  let inputClasses = baseClass

  if (variant === 'error') {
    inputClasses += ' focus:invalid:border-red-600'
  } else if (variant === 'success') {
    inputClasses += ' focus:valid:border-green-500'
  } else {
    inputClasses += ' focus:border-white/30'
  }

  return (
    <>
      <input
        {...inputProps}
        type={type}
        id={name} // Set the id to match the name
        onBlur={handleBlur}
        onChange={handleChange}
        className={inputClasses}
      />
      {error ? <div className="text-red-600">{error}</div> : null}
    </>
  )
}

export default Input