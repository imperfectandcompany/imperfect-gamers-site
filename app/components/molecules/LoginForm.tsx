// components/molecules/LoginForm.tsx
import React from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {withZod} from '@remix-validated-form/with-zod';
import {z} from 'zod';
import Button from '~/components/atoms/Button/Button';
import Input from '~/components/atoms/Input/Input';
import {useActionData, useFetcher} from '@remix-run/react';

/**
 * Represents the login schema for the login form.
 */
const loginSchema = z.object({
	email: z.string().email({message: 'Invalid email address'}),
	password: z.string().min(1, 'Password is required'),
});

// Client-side validation
/**
 * Applies the Zod validator to the loginSchema.
 *
 * @param {typeof loginSchema} schema - The login schema to be validated.
 * @returns {Validator<ZodObject>} - The validator with the login schema applied.
 */
const validator = withZod(loginSchema);

/**
 * LoginForm component renders a login form with email and password fields.
 * It handles form state and submission logic using the provided fetcher.
 *
 * @returns The LoginForm component.
 */
const LoginForm: React.FC = () => {
	// Implement the form state and submission logic here
	const fetcher = useFetcher();
	const actionData = useActionData();

	if (fetcher.state === 'submitting') {
		return <div>Logging in...</div>;
	}

	return (
		<ValidatedForm
			validator={validator}
			method="post"
			action="/login"
			fetcher={fetcher}
			className="flex flex-col space-y-4"
		>
			{/* The input fields */}
			<Input name="email" type="email" placeholder="Email" />
			<Input name="password" type="password" placeholder="Password" />
			{(fetcher.data as {error: string})?.error && (
				<div className="mr-0 text-red-700">
					{(fetcher.data as {error: string}).error}
				</div>
			)}
			{/* The login button */}
			<div className="items-right justify-right ml-auto">
				<Button type="submit">Login</Button>
			</div>
		</ValidatedForm>
	);
};

export default LoginForm;
