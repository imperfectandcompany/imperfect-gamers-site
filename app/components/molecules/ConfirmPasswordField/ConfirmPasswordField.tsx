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
  disabled?: boolean
  autocomplete?:
  | 'on'
  | 'off'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'url'
  | 'photo'
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
  disabled = false,
	autocomplete
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
        autocomplete={autocomplete}
        className={`${confirmPasswordStyles.transition} ${
          showField ? confirmPasswordStyles.show : ''
        }`}
        disabled={disabled}
      />
      <ErrorMessage showError={error} message="Passwords do not match" id={ariaDescribedBy} />
    </div>
  );
};

export default ConfirmPasswordField;
