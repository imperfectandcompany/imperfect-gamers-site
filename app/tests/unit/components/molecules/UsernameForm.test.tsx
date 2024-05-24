import { json } from '@remix-run/node'
import { createRemixStub } from '@remix-run/testing'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import UsernameForm from '~/components/molecules/UsernameForm.1'

test('Username form renders correctly', async () => {
	const App = createRemixStub([
		{
			id: 'components/molecules/UsernameForm',
			path: '/components/molecules/UsernameForm',
			Component: UsernameForm,
			loader: () => json({}),
		},
	])

	const routeUrl = '/components/molecules/UsernameForm'
	await render(<App initialEntries={[routeUrl]} />, {
		wrapper: ({ children }) => <>{children}</>,
	})

	const usernameInput = screen.getByPlaceholderText('Username')
	const continueButton = screen.getByRole('button', { name: 'Continue' })

	expect(usernameInput).toBeInTheDocument()
	expect(continueButton).toBeInTheDocument()
})

test('Username form displays username status', async () => {
	const App = createRemixStub([
		{
			id: 'components/molecules/UsernameForm',
			path: '/components/molecules/UsernameForm',
			Component: UsernameForm,
			loader: () => json({}),
		},
	])

	const routeUrl = '/components/molecules/UsernameForm'
	await render(<App initialEntries={[routeUrl]} />, {
		wrapper: ({ children }) => <>{children}</>,
	})

	const usernameInput = screen.getByPlaceholderText('Username')
	const continueButton = screen.getByRole('button', { name: 'Continue' })

	await userEvent.type(usernameInput, 'test')
	await userEvent.click(continueButton)

	await waitFor(() => {
		const usernameStatus = screen.getByTestId('usernameStatus')
		expect(usernameStatus).toHaveTextContent('Checking...')
	})
})
