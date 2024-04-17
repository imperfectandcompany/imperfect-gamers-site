// TODO: Implement Steam authentication utilities for generating login URLs and verifying user assertions.
// Necessary for securing the application and authenticating users with Steam.
// import { createHmac } from 'crypto';
// import { redirect } from '@remix-run/node';

// utils/steamAuth.ts

/**
 * Generates the Steam login URL for authentication.
 * @param returnURL - The URL to redirect the user to after authentication.
 * @returns The Steam login URL.
 */
export function generateSteamLoginURL(returnURL: string) {
	const params: URLSearchParams = new URLSearchParams({
		openidNs: 'http://specs.openid.net/auth/2.0',
		openidMode: 'checkid_setup',
		openidReturnTo: returnURL,
		openidRealm: new URL(returnURL).origin,
		openidIdentity: 'http://specs.openid.net/auth/2.0/identifier_select',
		openidClaimedId: 'http://specs.openid.net/auth/2.0/identifier_select',
	} as Record<string, string>)
	// TODO move to ${process.env.AUTHORIZATION_URL}?${params}
	return `${'https://steamcommunity.com/openid/login'}?${params}`
}

/**
 * Verifies the Steam user's assertion and returns the user's identity.
 *
 * @param returnURL - The return URL after user authentication.
 * @param query - The query parameters returned by Steam after user authentication.
 * @returns A number representing the user's identity, or null if the verification fails.
 */
export async function verifySteamAssertion(
	returnURL: string,
	query: URLSearchParams,
): Promise<number | null> {
	// Implementation of verifying the Steam user's identity
	// This involves checking the query parameters returned by Steam after user authentication
	// and optionally verifying a signature for security

	// For simplicity, this is just a placeholder
	const steamId = query
		.get('openidClaimedId')
		?.replace('https://steamcommunity.com/openid/id/', '')
	return steamId ? parseInt(steamId, 10) : null
}
