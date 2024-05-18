// app/routes/register.tsx
import { type ActionFunction, json } from '@remix-run/node'

import { registerUser } from '~/auth/authenticator.server'
// import { commitSession, getSession } from '~/components/pending/flash-session.server'

/**
 * Handles the registration action.
 *
 * @param request - The request object.
 * @returns The response object.
 */
export const action: ActionFunction = async ({ request }) => {
	// const session = await getSession(
	// 	request.headers.get("Cookie")
	//   );
	const formData = await request.formData()
	const email = formData.get('email') as string
	const password = formData.get('password') as string

	//   const data = { error: session.get("error") };

	try {
		const result = await registerUser(email, password)
		if (result.status === 'success' && result.statusCode === 200) {
			// If login is successful indicate success somehow.
			return json({
				success: 'Registration successful',
			})
		} else {
			// Return error message from API
			return json({
				error: result.message,
			}, {
                status: result.statusCode,
				// headers: {
				// 	"Set-Cookie": await commitSession(session),
				// } as HeadersInit, // Cast headers object to HeadersInit type
			})
		}
	} catch (error) {
		const message = (error as Error).message || 'Unable to register'
		return json({ message }, { status: 500 })
	}
}
