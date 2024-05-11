import { inputBorderStyles } from "~/components/atoms/styles/InputBorderStyles"
import { inputHoverStyles } from "~/components/atoms/styles/InputHoverStyles"
import { transitionStyles } from "~/components/atoms/styles/TransitionStyles"

interface InputProps {
  name: string
  type: string
  placeholder: string
  value: string
  error: boolean
  isFocused: boolean
  isTyping: boolean
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus: () => void
  handleBlur: () => void
  ariaDescribedBy?: string
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
  const inputClassName = `w-full rounded ${transitionStyles.transition} ${
    isTyping
      ? inputBorderStyles.typing
      : value.length === 0 || (!error && !isFocused)
      ? 'border-white/10'
      : error
      ? inputBorderStyles.error
      : !error && isFocused
      ? inputBorderStyles.valid
      : inputBorderStyles.neutral
  } input-background border border-white/5 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out placeholder:text-white/35 focus:border-white/30 focus:outline-none`

  const hoverClassName = `${
    error
      ? inputHoverStyles.hoverError
      : !error && isFocused
      ? inputHoverStyles.hoverValid
      : inputHoverStyles.hoverNeutral
  }`

  return (
    <input
      id={name}
      type={type}
      className={`${inputClassName} ${
        isTyping ? inputBorderStyles.typing : ''
      } ${hoverClassName}`}
      placeholder={placeholder}
      value={value}
      onChange={handleValueChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-invalid={error}
      aria-describedby={ariaDescribedBy}
    />
  )
}

export default InputField