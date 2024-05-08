// components/molecules/SignUpForm.tsx
import { useFetcher } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import type React from 'react'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import Button from '~/components/atoms/Button/Button'
import Input from '~/components/atoms/Input/Input'
import { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'
import { useEffect, useState } from 'react'

/**
 * Sign up form component.
 *
 * This component renders a sign-up form using the Remix framework, React Router Fetcher,
 * and Remix Validated Form flavor. It allows users to enter their email and password,
 * and submits the form data to the "/register" endpoint.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} setCloseInterceptReason - Function to set the close intercept reason.
 * @returns {JSX.Element} The rendered SignUpForm component.
 */
const SignUpForm: React.FC<SignUpFormProps> = ({ setCloseInterceptReason }) => {
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [initialFormValues, setInitialFormValues] = useState({ ...formValues })

	const isFormDirty =
		JSON.stringify(formValues) !== JSON.stringify(initialFormValues)

	useEffect(() => {
		if (setCloseInterceptReason) {
			setCloseInterceptReason(
				isFormDirty
					? CloseInterceptReason.UnsavedChanges
					: CloseInterceptReason.None,
			)
		}
	}, [isFormDirty, setCloseInterceptReason])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value,
		})
	}

	const fetcher = useFetcher()

	// React to the fetcher's state after submission
	if ((fetcher.data as { success: boolean })?.success) {
		return <p>Registration Successful!</p>
	}

	if (fetcher.state === 'submitting') {
		return <div>Registering...</div>
	}

	return (
		<ValidatedForm
			validator={validate}
			method="post"
			action="/register"
			fetcher={fetcher}
			onSubmit={data => {
				// Handle the form submission with the data
				fetcher.submit(data)
				// This will mark the form as not dirty after submission.
				setInitialFormValues({ ...formValues })
			}}
			className="flex flex-col space-y-4"
		>
			<Input
				name="email"
				type="email"
				placeholder="Email"
				required
				onChange={handleInputChange}
			/>
			<Input
				name="password"
				type="password"
				placeholder="Password"
				required
				onChange={handleInputChange}
			/>
			<Input
				name="confirmPassword"
				type="password"
				placeholder="Confirm Password"
				required
				onChange={handleInputChange}
			/>
			{(fetcher.data as { error: string })?.error ? (
				<div className="mr-0 text-red-700">
					{(fetcher.data as { error: string }).error}
				</div>
			) : null}
			<div className="ml-auto">
				<Button type="submit">Sign Up</Button>
			</div>
		</ValidatedForm>
	)
}

/**
 * Props for the LoginForm component.
 */
interface SignUpFormProps {
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

/**
 * Represents the sign up schema for the form.
 */
const signUpSchema = z
	.object({
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

/**
 * Validates the sign-up form using the provided schema.
 *
 * @param schema - The schema to validate the form against.
 * @returns A function that can be used to validate the form.
 */
const validate = withZod(signUpSchema)

export default SignUpForm
