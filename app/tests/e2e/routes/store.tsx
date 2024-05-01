import { json } from '@remix-run/node'
import { createRemixStub } from '@remix-run/testing'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Store from '~/routes/store'

// @vitest-environment jsdom

// Setting up a stub with the correct path and loader if necessary
const RemixStub = createRemixStub([
	{
		id: 'routes/store',
		path: '/store',
		Component: Store,
		// Ensure the loader returns expected values for the test
		loader: () =>
			json({
				isAuthenticated: false,
				isSteamLinked: false,
				isOnboarded: false,
				username: null,
				userToken: null,
				steamId: null,
				uid: null,
				email: null,
				basketId: null,
				packages: [],
				checkoutUrl: null,
			}),
	},
])

// beforeAll(() => server.listen()); // Start the server before all tests
// afterEach(() => server.resetHandlers()); // Reset any runtime request handlers after each test
// afterAll(() => server.close()); // Close the server after all tests

describe('LoginForm', () => {
	test('submits correct credentials and handles response', async () => {
		// Use the RemixStub instead of the component directly
		const routeUrl = '/store' // Ensure this matches the intended test route
		await render(<RemixStub initialEntries={[routeUrl]} />, {
			wrapper: ({ children }) => <>{children}</>,
		})

		const button = await screen.findByRole('button', { name: 'Join Now' })
		userEvent.click(button)

		await waitFor(() => screen.getByPlaceholderText('Email')) // Make sure the component has mounted
		const emailInput = screen.getByPlaceholderText('Email')
		const passwordInput = screen.getByPlaceholderText('Password')
		const submitButton = screen.getByRole('button', { name: /login/i })

		userEvent.type(emailInput, 'test@example.com')
		userEvent.type(passwordInput, 'password')
		userEvent.click(submitButton)

		// Suppose an error is expected
		await waitFor(() => {
			const errorDisplay = screen.queryByText(/invalid credentials/i)
			expect(errorDisplay).toBeInTheDocument() // Ensure error is displayed
		})
	})
})
