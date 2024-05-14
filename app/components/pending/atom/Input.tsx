// components/atoms/Input.tsx
import type React from 'react';
import { memo } from 'react';
import { useField } from 'remix-validated-form';

interface InputProps {
    name: string;
    type: string;
    placeholder: string;
    inputProps: {
        value: string;
        inputClassName: string;
        error: boolean;
        ariaDescribedBy?: string;
        handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleFocus: () => void;
        handleBlur: () => void;
    };
}

const Input: React.FC<InputProps> = memo(({ name, type, placeholder, inputProps }) => {
    const { getInputProps, error } = useField(name, { formId: 'register' });

    return (
        <>
        <input
            {...getInputProps({ id: name, type })}
            className={`w-full rounded ${inputProps.inputClassName} input-background border border-white/5 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out placeholder:text-white/35 focus:border-white/30 focus:outline-none`}
            placeholder={placeholder}
            value={inputProps.value}
            onChange={inputProps.handleValueChange}
            onFocus={inputProps.handleFocus}
            onBlur={inputProps.handleBlur}
            aria-invalid={inputProps.error ? 'true' : 'false'}
            aria-describedby={inputProps.ariaDescribedBy}
        />
            {error ? <span className="error-message show">{error}</span> : null}
        </>
    );
});

export default Input;
