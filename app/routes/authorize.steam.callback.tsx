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
	
    const params = new URLSearchParams(url.search);

    const verified = await directVerificationWithSteam(params);
    if (!verified) {
        console.error('Steam OpenID verification failed.');
        throw new Response('Steam OpenID verification failed', { status: 400 });
    }


	// Verify the Steam assertion
	const steamId = await verifySteamAssertion(url.toString(), url.searchParams)

	
	console.log(steamId);

	if (!steamId) {
		// Handle error
		throw new Response('Steam authentication failed', { status: 400 })
	}

    const session = await getSession(request.headers.get('Cookie'));
    if (!session) {
        throw new Response('Session not found', { status: 400 });
    }

    session.set('steamId', steamId);
    return new Response('<script>window.opener.postMessage({ type: "steam-auth-success" }, "*"); window.close();</script>', {
        headers: {
            'Content-Type': 'text/html',
            'Set-Cookie': await commitSession(session),
        },
    });
};