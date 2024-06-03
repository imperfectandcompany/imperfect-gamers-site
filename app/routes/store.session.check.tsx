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
	const response = await fetch(
		'https://api.imperfectgamers.org/user/fetchCheckoutDetails',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: `${userToken}`,
			},
		},
	)

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

	const formData = await request.formData()

	const basket_id = formData.get('basket_id')
	const checkout_url = formData.get('checkout_url')
	const package_id = formData.get('package_id')

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
		let isFirstTime = false

		if (!checkoutDetails) {
			// Clear all relevant cookies if no details found
			cookiesToClear = {
				basketId: undefined,
				packages: [],
				checkoutUrl: undefined,
			}
			clearedCookies.push('basketId', 'packages', 'checkoutUrl')
			isFirstTime = true // No relevant details found, first time setup
		} else {
			// Check if all details are null to set the first-time flag
			if (
				!checkoutDetails.basket_id &&
				!checkoutDetails.package_id &&
				!checkoutDetails.checkout_url
			) {
				isFirstTime = true
			}

			if (checkoutDetails.basket_id) {
				console.log('checkoutDetails.basket_id:', checkoutDetails.basket_id)
			}
			if (checkoutDetails.package_id) {
				console.log('checkoutDetails.package_id:', checkoutDetails.package_id)
			}
			if (checkoutDetails.checkout_url) {
				console.log(
					'checkoutDetails.checkout_url:',
					checkoutDetails.checkout_url,
				)
			}
			// if (checkoutDetails.basket_id !== basket_id) {
			// 	await storeCookie.serialize(null, { expires: new Date(Date.now() - 1) });
			// }

			// if (checkoutDetails.package_id !== package_id) {
			// 	await storeCookie.serialize(null, { expires: new Date(Date.now() - 1) });
			// }

			// if (checkoutDetails.checkout_url !== checkout_url) {
			// 	await storeCookie.serialize(null, { expires: new Date(Date.now() - 1) });
			// }

			let shouldSkipFurtherChecks = false

			// Clear cookies that do not match the database values
			if (
				!checkoutDetails.basket_id ||
				(checkoutDetails.basket_id || null) !== (basket_id || null)
			) {
				cookiesToClear.basketId = undefined
				cookiesToClear.packages = []
				cookiesToClear.checkoutUrl = undefined
				clearedCookies.push('basketId', 'packages', 'checkoutUrl')
				shouldSkipFurtherChecks = true // Set the flag to skip further cookie checks s ince we need to wipe it all if basket is off
			}

			if (!shouldSkipFurtherChecks) {
				if (
					!checkoutDetails.package_id ||
					(checkoutDetails.package_id || null) !== (package_id || null)
				) {
					cookiesToClear.packages = []
					clearedCookies.push('packages')
				}

				if (
					!checkoutDetails.checkout_url ||
					(checkoutDetails.checkout_url || null) !== (checkout_url || null)
				) {
					cookiesToClear.checkoutUrl = undefined
					clearedCookies.push('checkoutUrl')
				}
			}
		}

		if (Object.keys(cookiesToClear).length > 0) {
			const clearedCookieHeader = await storeCookie.serialize(cookiesToClear, {
				maxAge: 0,
			})
			return json(
				{
					message: 'Cookies cleared due to mismatch with database',
					clearedCookies,
					isFirstTime,
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
					isFirstTime,
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
			console.error(
				'[store.session.check.tsx] An unexpected error occurred:',
				error,
			)
			return json(
				{ error: '[store.session.check.tsx] An unexpected error occurred' },
				{ status: 500 },
			)
		}
	}
}
