// app/routes/auth/steam/callback.tsx
import { type LoaderFunction } from '@remix-run/node'
import { commitSession, getSession } from '~/auth/storage.server'
import { getEnvVar } from '~/utils/general'
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

	// Verify the Steam assertion
	const steamId = await verifySteamAssertion(url.toString(), url.searchParams)
	console.log(steamId);

	if (!steamId) {
		// Handle error or redirect to an error page
		throw new Response('Steam authentication failed', { status: 400 })
	}

	// Get the existing session
	const session = await getSession(request.headers.get('Cookie'))

	if (session) {
		// Set the steamId in the session
		session.set('steamId', steamId)
		await commitSession(session)

		// Send a message to the parent window
		const origin = getEnvVar('HOSTED_ORIGIN/store', 'http://localhost:5173');

		const script = `
      <script>
	  window.opener.postMessage({ type: 'steam-auth-success' }, origin);
        window.close();
      </script>
    `

		return new Response(script, {
			headers: {
				'Content-Type': 'text/html',
				'Set-Cookie': await commitSession(session), // Ensure the cookie is set
			},
		})
	} else {
		throw new Response('Session not found', { status: 400 })
	}
}
