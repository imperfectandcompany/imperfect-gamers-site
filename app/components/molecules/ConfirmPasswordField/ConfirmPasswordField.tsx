// ConfirmPasswordField.tsx
import { confirmPasswordStyles } from '~/components/atoms/styles/ConfirmPasswordStyles'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import InputField from '../InputField/InputField'

interface ConfirmPasswordFieldProps {
  showField: boolean
  name: string
  type: string
  placeholder: string
  value: string
  error: boolean
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus: () => void
  handleBlur: () => void
  ariaDescribedBy: string
}

const ConfirmPasswordField: React.FC<ConfirmPasswordFieldProps> = ({
  showField,
  name,
  type,
  placeholder,
  value,
  error,
  handleValueChange,
  handleFocus,
  handleBlur,
  ariaDescribedBy,
}) => {
  return (
    <div
      className={`${confirmPasswordStyles.transition} ${
        showField ? confirmPasswordStyles.show : ''
      }`}
    >
      <InputField
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        error={error}
        isFocused={false}
        isTyping={false}
        handleValueChange={handleValueChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        ariaDescribedBy={ariaDescribedBy}
      />
      <ErrorMessage showError={error} message="Passwords do not match" id={ariaDescribedBy} />
    </div>
  )
}

export default ConfirmPasswordField