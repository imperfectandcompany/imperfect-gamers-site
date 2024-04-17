// app/routes/logout.tsx
import { type ActionFunction, json } from '@remix-run/node'

import { logout } from '~/auth/authenticator.server'

import { getSession, destroySession } from '~/auth/storage.server'

/**
 * Handles the logout action.
 *
 * @param request - The request object.
 * @returns A JSON response indicating the success or failure of the logout action.
 */
export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get('Cookie'))
	const userToken = session.get('userToken')

	if (!userToken) {
		return json({ error: 'No user token found' }, { status: 400 })
	}

	try {
		const logoutResult = await logout(userToken)
		if (logoutResult.ok) {
			const headers = {
				'Set-Cookie': await destroySession(session),
			}
			return json({ success: 'Logout successful' }, { headers })
		} else if (logoutResult.error === 'Token invalid') {
			const headers = {
				'Set-Cookie': await destroySession(session),
			}
			return json(
				{
					success:
						'Logout successful. Token was invalid, so session was destroyed.',
				},
				{ headers },
			)
		}
	} catch (error) {
		console.error('An error occurred during logout:', error)
		return json({ error: 'An error occurred during logout' }, { status: 500 })
	}

	return json(
		{ error: 'An error occurred during logout. Please try again later.' },
		{ status: 500 },
	)
}
