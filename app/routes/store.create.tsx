import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'
import { getSession, storeCookie } from '~/auth/storage.server'
import { createTebexBasket } from '~/utils/tebex.server'

const ERROR_MESSAGES = {
	authentication: 'User must be authenticated',
	username: 'User must has a username',
	steamId: 'User must has a Steam ID',
	basket: 'User already has a package added to a basket',
}

export const action: ActionFunction = async ({ request }) => {
	console.log('[store.create.tsx] Creating request to Tebex.')
	const cookieHeader = request.headers.get('Cookie')
	const storeCookies = (await storeCookie.parse(cookieHeader)) || {}

	const session = await getSession(cookieHeader)
	const uid = session.get('uid')
	const username = session.get('username')
	const email = session.get('email')
	const steamId = session.get('steamId')

	if (!uid) {
		return json({ error: ERROR_MESSAGES.authentication }, { status: 401 })
	} else if (!username) {
		return json({ error: ERROR_MESSAGES.username }, { status: 401 })
	} else if (!steamId) {
		return json({ error: ERROR_MESSAGES.steamId }, { status: 401 })
	}

	if (storeCookies.basketId) {
		console.log('[store.create.tsx] User already has a basket.')
		return json({ error: ERROR_MESSAGES.basket }, { status: 401 })
	}

	const ipAddress =
		process.env.NODE_ENV === 'development'
			? '1.3.3.7'
			: getClientIPAddress(request.headers)

	if (!ipAddress) {
		return json(
			{ error: '[store.create.tsx] Failed to determine client IP address' },
			{ status: 500 },
		)
	}

	// TODO: Discuss with Tebex the potential need for an error_returnURL option in cases where the basket has already been paid.
	// Currently shows "{Title: Something went wrong, Subtitle: The basket with that identifier has already been paid for"} to the customer on external checkout.
	// Refer to: https://docs.tebex.io/developers/checkout-api/endpoints#baskets
	// complete_auto_redirect: boolean - If true, the user will be redirected to the complete_returnURL if the basket has been paid for.
	// Current complete_auto_redirect support: return_url, complete_url

	// Proposed: error_url
	// e.g., body = {complete_auto_redirect: true, error_url: "https://store.imperfectgamers.org/error-notification"}
	// error_url: string - The URL to redirect to if the basket has already been paid for.

	// Flow:
	// If the basket was created with complete_auto_redirect set to true...
	// 1. Check if the basket has already been paid for.
	// 2. If not, redirect to the complete_returnURL.
	// 3. If yes, redirect to the error_url to handle the situation on customer's store.

	// Additional comments:
	// Confirm if cancel_url is missed or undocumented within developer documentation.
	// Discovery confirmed that the cancel_url is settable in the body of the request.
	// Confirmed that the cancel_url is returned in the response with the complete_auto_redirect set to true (documented in developer docs).
	// Refer to: https://docs.tebex.io/developers/checkout-api/endpoints#baskets-ident-packages

	// Pending investigation:
	// IG team-member provided feedback: "I assume 404 at the end of payment is okay?" > "on the tebex page".
	// Context: Tebex page referred: checkout.tebex.io. (Appears to be Laravel's default 404 error page)
	// Confirm if this is reproducible and, if so, determine the impact on the user experience and the cause of the error.

	const complete_returnURL = new URL(
		`/success-notification?message=${encodeURIComponent('Tebex checkout processed successfully!')}&status=200&type=tebex_checkout_success`,
		request.url,
	).toString()
	const cancel_returnURL = new URL(
		`/error-notification?message=${encodeURIComponent('Tebex checkout successfully cancelled.')}&status=500&type=tebex_checkout_cancel`,
		request.url,
	).toString()

	try {
		const basketResponse = await createTebexBasket(
			complete_returnURL,
			cancel_returnURL,
			uid,
			username,
			email,
			steamId,
			ipAddress,
		)
		console.log('[store.create.tsx] Basket response:', basketResponse)

		if (basketResponse) {
			storeCookies.basketId = basketResponse.ident
			console.log('[store.create.tsx] Basket created:', basketResponse.ident)

			return json(
				{ basketId: basketResponse.ident },
				{
					headers: {
						'Set-Cookie': await storeCookie.serialize(storeCookies),
					},
				},
			)
		} else {
			return json(
				{ error: '[store.create.tsx] Failed to create basket' },
				{ status: 400 },
			)
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred during basket creation:', error)
			return json({ error: error.message }, { status: 500 })
		} else {
			console.error('[store.create.tsx] An unexpected error occurred:', error)
			return json(
				{ error: '[store.create.tsx] An unexpected error occurred' },
				{ status: 500 },
			)
		}
	}
}
