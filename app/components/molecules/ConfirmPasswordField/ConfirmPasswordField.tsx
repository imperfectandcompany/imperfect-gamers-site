import { confirmPasswordStyles } from '~/components/atoms/styles/ConfirmPasswordStyles';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InputField from '../InputField/InputField';

interface ConfirmPasswordFieldProps {
  showField: boolean;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error: boolean;
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  ariaDescribedBy: string;
  tooltipMessage?: string; // Optional prop for the tooltip message
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
  tooltipMessage,
}) => {
  return (
    <div

    >
      <InputField
        name={name}
        type={type}
        tooltipMessage={tooltipMessage} // Pass the tooltip message prop
        placeholder={placeholder}
        value={value}
        error={error}
        isFocused={false}
        isTyping={false}
        handleValueChange={handleValueChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        ariaDescribedBy={ariaDescribedBy}
        className={`${confirmPasswordStyles.transition} ${
          showField ? confirmPasswordStyles.show : ''
        }`}
      />
      <ErrorMessage showError={error} message="Passwords do not match" id={ariaDescribedBy} />
    </div>
  );
};

export default ConfirmPasswordField;
