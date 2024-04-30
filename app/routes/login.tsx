// ~/app/routes/login.tsx

import { type ActionFunctionArgs, json } from '@remix-run/node'

import { login } from '~/auth/authenticator.server'

export async function action({ request }: ActionFunctionArgs) {
	const result = await login(request)
	if (result.ok) {
		// If login is successful indicate success.
		return json(
			{ success: 'Login successful' },
			{
				headers: {
					'Set-Cookie': result.cookieHeader,
				} as HeadersInit, // Cast headers object to HeadersInit type
			},
		)
	} else {
		// If login fails, return an error message to be displayed.
		console.log('Error in login:', result.error)
		return json({ error: result.error }, { status: 400 })
	}
}
