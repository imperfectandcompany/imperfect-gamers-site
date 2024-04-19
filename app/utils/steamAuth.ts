// utils/steamAuth.ts

// Implementation of Steam authentication utilities for generating login URLs and verifying user assertions.
import { getEnvVar } from './general'

/**
 * Generates the Steam login URL for authentication.
 * @param returnURL - The URL to redirect the user to after authentication.
 * @returns The Steam login URL.
 */
export function generateSteamLoginURL(returnURL: string): string {
	const steamAuthUrl = getEnvVar(
		'STEAM_AUTHORIZATION_URL',
		'https://steamcommunity.com/openid/login',
	)

	const params = new URLSearchParams({
		'openid.ns': 'http://specs.openid.net/auth/2.0',
		'openid.mode': 'checkid_setup',
		'openid.return_to': returnURL,
		'openid.realm': new URL(returnURL).origin,
		'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
		'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
	})

	return `${steamAuthUrl}?${params}`
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
	try {
		if (!query.get('openid.mode') || query.get('openid.mode') !== 'id_res') {
			console.error('Invalid mode in Steam response')
			return null
		}

		const claimedId = query.get('openid.claimed_id')
		if (!claimedId) throw new Error('Claimed ID not found in Steam response')

		// This example simply checks if the claimed_id is a proper Steam ID URL.
		const steamIdMatch = claimedId.match(
			/^https:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/,
		)
		if (!steamIdMatch) throw new Error('Invalid Steam ID format')

		return parseInt(steamIdMatch[1], 10)
	} catch (error) {
		console.error('Error verifying Steam assertion:', error)
		return null // Return null to signify that verification has failed
	}
}



