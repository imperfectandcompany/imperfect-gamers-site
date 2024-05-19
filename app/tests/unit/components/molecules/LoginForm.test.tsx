// ~/app/tests/unit/components/molecules/LoginForm.test.tsx

import { createRemixStub } from '@remix-run/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '~/components/molecules/LoginForm.1'
import '@testing-library/jest-dom'

// @vitest-environment jsdom

/**
 * Creates a Remix stub for testing the LoginForm component.
 * @param {Array<{ path: string, Component: React.ComponentType<any> }>} routes - An array of routes to be stubbed.
 * @returns {RemixStub} - The created Remix stub.
 */
const RemixStub = createRemixStub([
	{
		path: '/',
		Component: LoginForm,
	},
])

/**
 * Checks if the LoginForm component renders correctly and behaves as expected.
 */
describe('LoginForm', () => {
	const setup = () => {
		render(<RemixStub />)
		const form = screen.getByTestId('login-form')
		const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement
		const passwordInput = screen.getByPlaceholderText(
			'Password',
		) as HTMLInputElement

		return { form, emailInput, passwordInput }
	}

	/**
	 * Tests if the form exists in the DOM.
	 */
	test('Make sure the form exists', () => {
		const { form } = setup()
		expect(form).toBeInTheDocument()
	})

	/**
	 * Tests if the email input exists in the DOM.
	 */
	test('email input exists', () => {
		const { emailInput } = setup()
		expect(emailInput).toBeInTheDocument()
	})

	/**
	 * Tests if the password input exists in the DOM.
	 */
	test('password input exists', () => {
		const { passwordInput } = setup()
		expect(passwordInput).toBeInTheDocument()
	})

	/**
	 * Tests if typing into the email field updates the input value correctly.
	 */
	test('types into email field', async () => {
		const { emailInput } = setup()
		await userEvent.type(emailInput, 'test')
		await waitFor(() => expect(emailInput.value).toBe('test'))
	})

	/**
	 * Tests if typing into the password field updates the input value correctly.
	 */
	test('types into password field', async () => {
		const { passwordInput } = setup()
		await userEvent.type(passwordInput, 'password')
		await waitFor(() => expect(passwordInput.value).toBe('password'))
	})

	/**
	 * Tests if submitting the form triggers the submit event.
	 */
	test('submits the form', () => {
		const { form } = setup()
		let isSubmitted = false
		form.onsubmit = () => {
			isSubmitted = true
		}

		fireEvent.submit(form)

		expect(isSubmitted).toBe(true)
	})

	/**
	 * Tests if the invalid email message is displayed when the email is invalid and the password is valid.
	 * Also checks that no invalid password error message is displayed.
	 */
	test('displays invalid email message without any invalid password error', async () => {
		const { emailInput, passwordInput, form } = setup()
		await userEvent.type(emailInput, 'test')
		await userEvent.type(passwordInput, 'password')
		fireEvent.submit(form)

		const errorDisplay = await screen.findByText(/invalid email address/i)
		expect(errorDisplay).toBeInTheDocument()

		const notExpectedErrorDisplay = screen.queryByText(/password is required/i)
		expect(notExpectedErrorDisplay).not.toBeInTheDocument()
	})

	/**
	 * Tests if the invalid password message is displayed when the password is missing and the email is valid.
	 * Also checks that no invalid email error message is displayed.
	 */
	test('displays invalid password message without any invalid email error', async () => {
		const { emailInput, form } = setup()
		await userEvent.type(emailInput, 'valid@email.com')
		fireEvent.submit(form)

		const errorDisplay = await screen.findByText(/password is required/i)
		expect(errorDisplay).toBeInTheDocument()

		const notExpectedErrorDisplay = screen.queryByText(/invalid email address/i)
		expect(notExpectedErrorDisplay).not.toBeInTheDocument()
	})
})
