// utils/steamAuth.ts
import { createHmac } from 'crypto';
import { redirect } from '@remix-run/node';


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

export async function verifySteamAssertion(returnURL: string, query: URLSearchParams): Promise<string | null> {
  // Implementation of verifying the Steam user's identity
  // This involves checking the query parameters returned by Steam after user authentication
  // and optionally verifying a signature for security

  // For simplicity, this is just a placeholder
  return query.get('openid.claimed_id')?.replace('https://steamcommunity.com/openid/id/', '') || null;
}
