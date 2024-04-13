// utils/steamAuth.ts
import { createHmac } from 'crypto';
import { redirect } from '@remix-run/node';


/**
 * Generates the Steam login URL for authentication.
 * @param returnURL - The URL to redirect the user to after authentication.
 * @returns The Steam login URL.
 */
export function getSteamLoginURL(returnURL: string) {
  const params = new URLSearchParams({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': returnURL,
    'openid.realm': new URL(returnURL).origin,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
  });
  // TODO move to ${process.env.AUTHORIZATION_URL}?${params}
  return `${"https://steamcommunity.com/openid/login"}?${params}`;
}

/**
 * Verifies the Steam user's assertion and returns the user's identity.
 * 
 * @param returnURL - The return URL after user authentication.
 * @param query - The query parameters returned by Steam after user authentication.
 * @returns A string representing the user's identity, or null if the verification fails.
 */
export async function verifySteamAssertion(returnURL: string, query: URLSearchParams): Promise<string | null> {
  // Implementation of verifying the Steam user's identity
  // This involves checking the query parameters returned by Steam after user authentication
  // and optionally verifying a signature for security

  // For simplicity, this is just a placeholder
  return query.get('openid.claimed_id')?.replace('https://steamcommunity.com/openid/id/', '') || null;
}
