import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'
import { getSession, storeCookie } from '~/auth/storage.server'
import { createTebexBasket } from '~/utils/tebex.server'

const ERROR_MESSAGES = {
	authentication: 'User must be authenticated',
	username: 'User must have a username',
	steamId: 'User must have a Steam ID',
	basket: 'User already have a package added to a basket',
}

export const action: ActionFunction = async ({ request }) => {
	console.log('[store.create.tsx] Creating request to Tebex.')
	const cookieHeader = request.headers.get('Cookie')
	const storeCookies = (await storeCookie.parse(cookieHeader)) || {}

	const session = await getSession(cookieHeader)
	const uid = session.get('uid')
	const username = session.get('username')
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

	try {
		const basketResponse = await createTebexBasket(
			uid,
			username,
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
