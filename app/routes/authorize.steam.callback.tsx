// app/routes/auth/steam/callback.tsx

import { type LoaderFunction } from '@remix-run/node'
import { apiBase, checkPremiumStatus } from '~/auth/authenticator.server'
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
	const type = params.get('type') // This will be either 'main' or 'fallback'

	const verified = await directVerificationWithSteam(params)

	if (!verified) {
		console.error('Steam OpenID verification failed.')
		return sendErrorToParent(
			'Steam OpenID verification failed',
			400,
			type || '',
		) // Ensure type is always a string
	}

	// Verify the Steam assertion
	const steamId = await verifySteamAssertion(url.searchParams)
	if (!steamId) {
		return sendErrorToParent('Steam authentication failed', 400, type || '') // Bad request
	}

	const session = await getSession(request.headers.get('Cookie'))
	if (!session) {
		return sendErrorToParent('Session not found', 403, type || '') // Forbidden or Unauthorized
	}

	// Link steam ID to user's account in the database
	const userToken = session.get('userToken') // userToken should be stored in session since logged in action

	if (!userToken) {
		console.error('User token not found in session')
		return sendErrorToParent('Authentication required', 401, type || '') // Unauthorized
	}

	const userId = session.get('uid') // userToken should be stored in session since logged in action

	if (!userId) {
		console.error('User ID not found in session')
		return sendErrorToParent('Authentication required', 401, type || '') // Unauthorized
	}

	// Verify if Steam ID is already linked to another account
	const existingUser = await fetchUserBySteamId(steamId, userToken)
	if (existingUser) {
		console.error('Steam ID is already linked to another account')
		return sendErrorToParent(
			'Steam ID is already linked to another account',
			400,
			type || '',
		)
	}
	// Check if the user exists in the game server
	const userExistsInGameServer = await checkSteamExistsInGameServer(
		steamId,
		userToken,
	)
	if (!userExistsInGameServer) {
		console.error('User does not exist in game server')
		return sendErrorToParent(
			'User does not exist in game server',
			400,
			type || '',
		)
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
		return sendErrorToParent('Failed to link Steam ID', 500, type || '') // Internal Server Error
	}

	// Check if the user is a premium member
	const isPremium = await checkPremiumStatus(userToken, userId)
	session.set('isPremium', isPremium)

	session.set('steamId', steamId)

	if (type === 'fallback') {
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/success-notification?message=Steam+authorization+was+successful!&status=200&type=steam_authorization_success`,
				'Set-Cookie': await commitSession(session), // Commit the session changes
			},
		})
	}

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

function sendErrorToParent(
	errorMessage: string,
	statusCode: number,
	type: string,
) {
	if (type === 'fallback') {
		// Redirect user back to an error handling route with the error message and status
		return new Response(null, {
			status: 302, // HTTP status for redirection
			headers: {
				Location: `/error-notification?message=${encodeURIComponent(errorMessage)}&status=${statusCode}&type=steam_authorization_error`,
			},
		})
	}

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

/**
 * Fetches a user by their Steam ID from the backend.
 * @param steamId The Steam ID to search for.
 * @param userToken The user's authorization token.
 * @returns The user data if found, or null if no user is linked with the given Steam ID.
 */
async function fetchUserBySteamId(
	steamId: string,
	userToken: string,
): Promise<Boolean | null> {
	try {
		const response = await fetch(
			`${apiBase}/user/checkSteamLinked/${steamId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: userToken,
				},
			},
		)

		if (!response.ok) {
			// Handle non-200 status codes
			const errorData = await response.json()
			throw new Error(errorData.message || 'Failed to fetch user by Steam ID.')
		}

		const data = await response.json()

		if (data.status === 'success') {
			return data.linked // Return the linked status directly
		} else {
			throw new Error(data.message || 'Unexpected error occurred.')
		}
	} catch (error) {
		console.error('Error fetching user by Steam ID:', error)
		return null // Return null in case of any error
	}
}

/**
 * Checks if a steam ID exists in the game server.
 * @param steamId The steam ID to check.
 * @param userToken The user's authorization token.
 * @returns A boolean indicating if the user exists in the game server, or null if an error occurs.
 */
async function checkSteamExistsInGameServer(
	steamId: string,
	userToken: string,
): Promise<boolean | null> {
	try {
		const response = await fetch(`${apiBase}/premium/steamExists/${steamId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: userToken,
			},
		})

		if (!response.ok) {
			// Handle non-200 status codes
			const errorData = await response.json()
			throw new Error(
				errorData.message || 'Failed to check user existence in game server.',
			)
		}

		const data = await response.json()

		if (data.status === 'success') {
			console.log({data})
			return data.exists // Return the existence status directly
		} else {
			throw new Error(data.message || 'Unexpected error occurred.')
		}
	} catch (error) {
		console.error('Error checking user existence in game server:', error)
		return null // Return null in case of any error
	}
}
