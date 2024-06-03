import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getSession, commitSession, storeCookie } from '~/auth/storage.server'

const ERROR_MESSAGES = {
	authentication: 'User must be authenticated',
	username: 'User must have a username',
	steamId: 'User must have a Steam ID',
	noUserToken: 'No user token found',
}

async function fetchCheckoutDetails(userToken: string) {
	const response = await fetch('https://api.imperfectgamers.org/user/fetchCheckoutDetails', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: `${userToken}`,
		},
	})

	if (response.ok) {
		const result = await response.json()
		if (result.status === 'success' && result.data) {
			return result.data
		}
	}
	return null
}

export const action: ActionFunction = async ({ request }) => {
	const cookieHeader = request.headers.get('Cookie')
	const storeCookies = (await storeCookie.parse(cookieHeader)) || {}

	const session = await getSession(cookieHeader)
	const uid = session.get('uid')
	const username = session.get('username')
	const steamId = session.get('steamId')
	const userToken = session.get('userToken')

	if (!uid) {
		return json({ error: ERROR_MESSAGES.authentication }, { status: 401 })
	} else if (!username) {
		return json({ error: ERROR_MESSAGES.username }, { status: 401 })
	} else if (!steamId) {
		return json({ error: ERROR_MESSAGES.steamId }, { status: 401 })
	} else if (!userToken) {
		return json({ error: ERROR_MESSAGES.noUserToken }, { status: 401 })
	}

	try {
		const checkoutDetails = await fetchCheckoutDetails(userToken)

		let cookiesToClear: Partial<typeof storeCookies> = {}
		let clearedCookies: string[] = []

		if (!checkoutDetails) {
			// Clear all relevant cookies if no details found
			cookiesToClear = {
				basketId: undefined,
				packages: [],
				checkoutUrl: undefined,
			}
			clearedCookies.push('basketId', 'packages', 'checkoutUrl')
		} else {
			// Clear cookies that do not match the database values
			if (!checkoutDetails.basket_id) {
				cookiesToClear.basketId = undefined
				cookiesToClear.packages = []
				cookiesToClear.checkoutUrl = undefined
				clearedCookies.push('basketId', 'packages', 'checkoutUrl')
			} else if (
				(checkoutDetails.basket_id || null) !== (storeCookies?.basketId || null)
			) {
				cookiesToClear.basketId = undefined
				cookiesToClear.packages = []
				cookiesToClear.checkoutUrl = undefined
				clearedCookies.push('basketId', 'packages', 'checkoutUrl')
			}

			if (
				!checkoutDetails.package_id ||
				(checkoutDetails.package_id || null) !== (storeCookies?.packages?.[0]?.id || null)
			) {
				cookiesToClear.packages = []
				clearedCookies.push('packages')
			}

			if (
				!checkoutDetails.checkout_url ||
				(checkoutDetails.checkout_url || null) !== (storeCookies?.checkoutUrl || null)
			) {
				cookiesToClear.checkoutUrl = undefined
				clearedCookies.push('checkoutUrl')
			}
		}

		if (Object.keys(cookiesToClear).length > 0) {
			const clearedCookieHeader = await storeCookie.serialize(cookiesToClear, { maxAge: 0 })
			return json(
				{
					message: 'Cookies cleared due to mismatch with database',
					clearedCookies,
				},
				{
					headers: {
						'Set-Cookie': clearedCookieHeader,
					},
				},
			)
		} else {
			const cookieHeader = await commitSession(session)
			return json(
				{
					message: 'Session and cookies are consistent',
				},
				{
					headers: {
						'Set-Cookie': cookieHeader,
					},
				},
			)
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('An error occurred during checkout detail fetch:', error)
			return json({ error: error.message }, { status: 500 })
		} else {
			console.error('[store.session.check.tsx] An unexpected error occurred:', error)
			return json(
				{ error: '[store.session.check.tsx] An unexpected error occurred' },
				{ status: 500 },
			)
		}
	}
}
