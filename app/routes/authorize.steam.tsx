// app/routes/auth/steam.tsx
import { type LoaderFunction, json } from '@remix-run/node'

import { generateSteamLoginURL } from '~/utils/steamAuth'

/**
 * Handles the loader function for Steam authorization.
 *
 * @param request - The incoming request object.
 * @returns A JSON response containing the URL to redirect the user to Steam for authentication.
 */
export const loader: LoaderFunction = ({ request }) => {
	// The URL to which Steam should redirect the user after login
	const returnURL = new URL('/authorize/steam/callback', request.url).toString()
	const steamLoginURL = generateSteamLoginURL(returnURL)

	// Redirect the user to Steam for authentication
	return json({ url: steamLoginURL })
}
