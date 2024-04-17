import type { Basket, Data } from './tebex.interface'

// Tebex API details
const TEBEX_API_BASE = 'https://headless.tebex.io'
const TEBEX_SECRET_KEY = process.env.TEBEX_SECRET_KEY // Ensure this is set in your environment
const TEBEX_WEBSTORE_IDENTIFIER = process.env.TEBEX_WEBSTORE_IDENTIFIER // Ensure this is set in your environment

// Function to create a basket on Tebex
export async function createTebexBasket(
	userId: number,
	username: string,
	steamId: number,
	ipAddress: string,
): Promise<Basket> {
	let requestBody: any = {
		complete_url: 'http://localhost:5173/complete',
		cancel_url: 'http://localhost:5173/cancel',
		complete_auto_redirect: false,
		custom: {
			user_id: userId,
			username: username,
			steam_id: steamId,
		},
	}

	if (process.env.NODE_ENV !== 'development') {
		requestBody.ip_address = ipAddress
	}

	const response = await fetch(
		`${TEBEX_API_BASE}/api/accounts/${TEBEX_WEBSTORE_IDENTIFIER}/baskets`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		},
	)

	if (!response.ok) {
		// Handle error appropriately
		throw new Error(`Tebex basket creation failed: ${response.statusText}`)
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
				package_id: 6154841,
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