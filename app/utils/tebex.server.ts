import { json } from '@remix-run/node'

// Tebex API details
const TEBEX_API_BASE = 'https://headless.tebex.io'
const TEBEX_SECRET_KEY = process.env.TEBEX_SECRET_KEY // Ensure this is set in your environment
const TEBEX_WEBSTORE_IDENTIFIER = process.env.TEBEX_WEBSTORE_IDENTIFIER // Ensure this is set in your environment


interface TebexBasketResponse {
	success: boolean
	data?: {
		basketId: string
	}
	error?: string
}

// Function to create a basket on Tebex
export async function createTebexBasket(
	userId: number,
	username: string,
	steamId: number,
	ipAddress: string
): Promise<TebexBasketResponse> {

	const requestBody = {
        complete_url: 'https://example.com/complete', // Replace with your complete URL
        cancel_url: 'https://example.com/cancel', // Replace with your cancel URL
        complete_auto_redirect: false, // Replace with your preference
        ip_address: ipAddress,
		custom: {
			user_id: userId,
			username: username,
			steam_id: steamId
		},
	}
	const response = await fetch(`${TEBEX_API_BASE}/api/accounts/${TEBEX_WEBSTORE_IDENTIFIER}/baskets`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	})

	if (!response.ok) {
		// Handle error appropriately
		throw new Error(`Tebex basket creation failed: ${response.statusText}`)
	}
	const basketData = await response.json()
    console.log(basketData);
	if (basketData.error) {
		return {
			success: false,
			error: basketData.error,
		}
	} else {
		return {
			success: true,
			data: {
				basketId: basketData.basket_id,
			},
		}
	}
}
