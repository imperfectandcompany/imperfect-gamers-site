import React, { memo } from 'react';
import { useField } from 'remix-validated-form';

interface InputProps {
    name: string;
    type: string;
    placeholder: string;
    value: string;
    inputClassName: string;
    error: boolean;
    ariaDescribedBy?: string;
    handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFocus: () => void;
    handleBlur: () => void;
}

const Input: React.FC<InputProps> = memo(({
    name,
    type,
    placeholder,
    value,
    inputClassName,
    error,
    ariaDescribedBy,
    handleValueChange,
    handleFocus,
    handleBlur
}) => {
    const { getInputProps, error: fieldError } = useField(name);

    return (
        <>
            <input
                {...getInputProps({ id: name, type })}
                className={`w-full rounded ${inputClassName} input-background border border-white/5 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out placeholder:text-white/35 focus:border-white/30 focus:outline-none`}
                placeholder={placeholder}
                value={value}
                onChange={handleValueChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={ariaDescribedBy}
            />
            {fieldError && <span className="error-message show">{fieldError}</span>}
        </>
    );
});

export default Input;