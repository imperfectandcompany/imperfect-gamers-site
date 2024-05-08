// ~/app/components/molecules/LoginForm.tsx

import { useFetcher } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { z } from 'zod'
import { useState, useEffect, useCallback } from "react"
import { ValidatedForm } from "remix-validated-form"
import Button from "../atoms/Button/Button"
import { CloseInterceptReason } from "../organism/ModalWrapper/ModalWrapper"
import Input from "../atoms/Input/Input"

/**
 * LoginForm component renders a login form with email and password fields.
 * It handles form state and submission logic using the provided fetcher.
 * It also tracks whether the form is dirty (has unsaved changes) and updates
 * the close intercept reason accordingly.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setCloseInterceptReason - A function to set the close intercept reason.
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm: React.FC<LoginFormProps> = ({ setCloseInterceptReason }) => {
    const fetcher = useFetcher()
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
    })
    const [initialFormValues, setInitialFormValues] = useState<FormValues>({ ...formValues })

    const isFormDirty = JSON.stringify(formValues) !== JSON.stringify(initialFormValues)


    const updateCloseInterceptReason = useCallback(() => {
        let reason = CloseInterceptReason.None;
    
        if (fetcher.state === 'submitting' || fetcher.state === 'loading') {
            reason = CloseInterceptReason.RequestInProgress;
        } else if (isFormDirty) {
            reason = CloseInterceptReason.UnsavedChanges;
        } else if ((fetcher.data && typeof fetcher.data === 'object' && ((fetcher.data as { success: boolean })?.success || 'error' in fetcher.data)) || fetcher.state === 'idle') {
            reason = CloseInterceptReason.None;
        }
    
        if (setCloseInterceptReason) {
            setCloseInterceptReason(reason);
        }
    }, [fetcher.state, isFormDirty, setCloseInterceptReason]);

    useEffect(updateCloseInterceptReason, [updateCloseInterceptReason]);

    /**
     * Mark the form as dirty when an input value changes.
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        })
    }

    if (fetcher.state === 'submitting') {
        return <div>Logging in...</div>
    }

    return (
        <ValidatedForm
            data-testid="login-form"
            validator={validator}
            method="post"
            action="/login"
            fetcher={fetcher}
            className="flex flex-col space-y-4"
            // Mark the form as clean when it's submitted
            onSubmit={() => setInitialFormValues({ ...formValues })}
        >
            <Input name="email" type="email" placeholder="Email" required onChange={handleInputChange} />
            <Input name="password" type="password" placeholder="Password" required onChange={handleInputChange} />
            {(fetcher.data as { error: string })?.error ? (
                <div className="mr-0 text-red-700">
                    {(fetcher.data as { error: string }).error}
                </div>
            ) : null}
            <div className="ml-auto">
                <Button type="submit">Login</Button>
            </div>
        </ValidatedForm>
    )
}

/**
 * Represents the values of a login form.
 */
interface FormValues {
    email: string;
    password: string;
}

/**
 * Props for the LoginForm component.
 */
interface LoginFormProps {
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

/**
 * Represents the login schema for the login form.
 */
const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, 'Password is required'),
})

/**
 * Applies the Zod validator to the loginSchema.
 *
 * @param {typeof loginSchema} schema - The login schema to be validated.
 * @returns {Validator<ZodObject>} - The validator with the login schema applied.
 */
const validator = withZod(loginSchema)

export default LoginForm
