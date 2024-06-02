// app/routes/auth/steam/callback.tsx

import { type LoaderFunction } from '@remix-run/node'
import { directVerificationWithSteam } from '~/auth/steam.server'
import { commitSession, getSession } from '~/auth/storage.server'
import { verifySteamAssertion } from '~/utils/steamAuth'

/**
 * This file contains the loader function for handling the callback from the Steam authorization process.
 * It verifies the Steam assertion, sets the steamId in the session, and sends a message to the parent window.
 *
 * @param request - The incoming request object.
 * @returns A Response object with the appropriate content and headers.
 * @throws {Response} If Steam authentication fails or the session is not found.
 */
export const loader: LoaderFunction = async ({ request }) => {
	// Parse the request URL
	const url = new URL(request.url)

	const params = new URLSearchParams(url.search)

	const verified = await directVerificationWithSteam(params)

	if (!verified) {
		console.error('Steam OpenID verification failed.')
		return sendErrorToParent('Steam OpenID verification failed', 400) // Bad request
	}

	// Verify the Steam assertion
	const steamId = await verifySteamAssertion(url.toString(), url.searchParams)

	if (!steamId) {
		return sendErrorToParent('Steam authentication failed', 400) // Bad request
	}

	const session = await getSession(request.headers.get('Cookie'))
	if (!session) {
		return sendErrorToParent('Session not found', 403) // Forbidden or Unauthorized
	}

	// Link steam ID to user's account in the database
	const userToken = session.get('userToken') // userToken should be stored in session since logged in action

	if (!userToken) {
		console.error('User token not found in session')
		return sendErrorToParent('Authentication required', 401) // Unauthorized
	}

	const response = await fetch(
		'https://api.imperfectgamers.org/user/linkSteam',
		{
			method: 'POST',
			headers: {
				authorization: `${userToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ steamId64: steamId.toString() }),
		},
	)

	if (!response.ok) {
		console.error('Failed to link Steam ID in the database')
		return sendErrorToParent('Failed to link Steam ID', 500) // Internal Server Error
	}

	session.set('steamId', steamId)

	return new Response(
		'<script>window.opener.postMessage({ type: "steam-auth-success" }, "*"); window.close();</script>',
		{
			headers: {
				'Content-Type': 'text/html',
				'Set-Cookie': await commitSession(session),
			},
		},
	)
}

function sendErrorToParent(errorMessage: string, statusCode: number) {
	return new Response(
		`<script>window.opener.postMessage({ type: "steam-auth-error", message: "${errorMessage}", statusCode: ${statusCode} }, "*"); window.close();</script>`,
		{
			headers: {
				'Content-Type': 'text/html',
				Status: statusCode.toString(),
			},
		},
	)
}
