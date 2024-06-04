import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getSession, commitSession, storeCookie } from '~/auth/storage.server'

// const ERROR_MESSAGES = {
//     authentication: 'User must be authenticated',
//     username: 'User must have a username',
//     steamId: 'User must have a Steam ID',
//     noUserToken: 'No user token found',
// };

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
		return result.status === 'success' ? result.data : null
	}
	return null
}

export const action: ActionFunction = async ({ request }) => {
	const cookieHeader = request.headers.get('Cookie')
	const session = await getSession(cookieHeader)
	const uid = session.get('uid')
	const username = session.get('username')
	const steamId = session.get('steamId')
	const userToken = session.get('userToken')

	if (!uid || !username || !steamId || !userToken) {
		return json(
			{
				error: 'Missing required user details or not authenticated',
			},
			{ status: 401 },
		)
	}

	// const formData = await request.formData();
	// const basket_id = formData.get('basket_id');
	// const package_id = formData.get('package_id');
	// const checkout_url = formData.get('checkout_url');

	const checkoutDetails = await fetchCheckoutDetails(userToken)
	if (!checkoutDetails) {
		const clearedCookieHeader = await storeCookie.serialize(
			{
				basketId: undefined,
				packages: [],
				checkoutUrl: undefined,
			},
			{ maxAge: 0 },
		)

		return json(
			{
				message: 'No details found; all cookies cleared.',
				isFirstTime: true,
			},
			{
				headers: { 'Set-Cookie': clearedCookieHeader },
			},
		)
	}

	// TODO: include logic to verify and update details as necessary
	// This foundation assumes all values match and there are no discrepancies
	return json(
		{
			message: 'Session and cookies are consistent.',
			isFirstTime: false,
		},
		{
			headers: { 'Set-Cookie': await commitSession(session) },
		},
	)
}
