import type { Basket, Data } from './tebex.interface'

// Tebex API details
const TEBEX_API_BASE = 'https://headless.tebex.io'
const TEBEX_SECRET_KEY = process.env.TEBEX_SECRET_KEY
const TEBEX_WEBSTORE_IDENTIFIER = process.env.TEBEX_WEBSTORE_IDENTIFIER

// Function to create a basket on Tebex
export async function createTebexBasket(
	complete_returnURL: string,
	cancel_returnURL: string,
	userId: number,
	username: string,
	email: string,
	steamId: number,
	ipAddress: string,
): Promise<Basket> {
	let requestBody: any = {
		complete_url: complete_returnURL,
		cancel_url: cancel_returnURL,
		complete_auto_redirect: true,
		custom: {
			user_id: userId,
			username: username,
			email: email,
			steam_id: steamId,
		},
		// Discuss with Tebex regarding the necessity of an error_returnURL for cases where the basket is already paid.
		// Current process lacks clarity on handling already paid baskets which could lead to poor user experience.
	}

	// No 'username' support for the main body (per developer docs). As a workaround,
	// 'username' is included within the 'custom' object. Need clarification from Tebex on this API behavior.
	// Including 'username' (and other custom fields) is essential for our internal tracking and customer support functions.

	// Proposed solution:
	// let requestBody: any = {
	// 	complete_url: complete_returnURL,
	// 	cancel_url: cancel_returnURL,
	// 		username: username,
	// 	error_url: "https://store.yoursite.com/error", // Redirect to custom error handling page
	// 	complete_auto_redirect: true,
	// 	custom: {
	// 		user_id: userId,
	// 		steam_id: st	eamId,
	// 	},
	// };

	if (process.env.NODE_ENV !== 'development') {
		requestBody.ip_address = ipAddress
	}

	const response = await fetch(
		`${TEBEX_API_BASE}/api/accounts/${TEBEX_WEBSTORE_IDENTIFIER}/baskets`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${btoa(`${TEBEX_WEBSTORE_IDENTIFIER}:${TEBEX_SECRET_KEY}`)}`,
			},
			body: JSON.stringify(requestBody),
		},
	)

	if (!response.ok) {
		const errorData = await response.json()
		if (errorData) {
			console.log(`Status: ${errorData.status}
			Type: ${errorData?.type}
			Title: ${errorData?.title}
			Detail: ${errorData?.detail}
			Error Code: ${errorData?.error_code}
			Field Details: ${errorData.field_details?.length > 0 ? errorData.field_details.join(', ') : 'None'}
			Meta: ${errorData.meta?.length > 0 ? errorData.meta.join(', ') : 'None'}`)
			if (errorData.status === 404) {
				// Verify the endpoint and parameters. TODO: adding error logging or notifications for monitoring.
				throw new Error(
					`Tebex basket creation failed - Endpoint or resource not found: ${errorData.detail}`,
				)
			} else {
				// Handle other errors based on the status codes defined in Tebex documentation.
				throw new Error(`Tebex basket creation failed: ${response.statusText}`)
			}
		} else {
			throw new Error(`Tebex basket creation failed: ${response.statusText}`)
		}
	}
	const basketData = await response.json()
	return basketData.data
}

export async function AddPackageToBasket(basketIdent: string): Promise<Basket> {
	console.info('Making API call to add package to basket...')
	try {
		let quantity = 1
		let type = 'subscription'
		const { data }: Data<Basket> = await Request(
			'POST',
			basketIdent,
			'baskets',
			'/packages',
			{},
			{
				package_id: 6288193,
				quantity,
				type,
				variable_data: {
					discord_id: 0o0,
				},
			},
		)
		return data
	} catch (error) {
		throw new Error((error as Error).message)
	}
}

// async function fetchBasketDetails(basketId) {
// 	// API call to fetch basket details using the basketId
// 	// Returns the basket object or null if not found or an error occurs
//   }

export async function Request<T>(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	identifier: string | null,
	route: string,
	path?: string,
	params?: Record<string, any>,
	body?: any,
): Promise<T> {
	const url = new URL(
		`${TEBEX_API_BASE}/api/${route}/${identifier}${path ?? ''}`,
	)
	Object.entries(params || {}).forEach(([key, value]) => {
		if (typeof value === 'boolean') value = value ? '1' : '0'
		url.searchParams.append(key, value)
	})

	console.log(JSON.stringify(body))

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		Authorization: `Basic ${btoa(`${TEBEX_WEBSTORE_IDENTIFIER}:${TEBEX_SECRET_KEY}`)}`,
	}

	try {
		const response = await fetch(url.toString(), {
			method,
			headers,
			body: JSON.stringify(body),
		})
		if (!response.ok) {
			throw new Error(`Request failed: ${response.statusText}`)
		}
		return response.json()
	} catch (error) {
		throw new Error((error as Error).message)
	}
}
