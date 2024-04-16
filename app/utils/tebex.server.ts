import { json } from '@remix-run/node'
import { Basket, Data, KeyValuePair, PackageType } from './tebex.interface'

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

interface RequestBody {
    complete_url: string;
    cancel_url: string;
    complete_auto_redirect: boolean;
    ip_address?: string;
    custom: {
        user_id: number;
        username: string;
        steam_id: number;
    };
}

// Function to create a basket on Tebex
export async function createTebexBasket(
	userId: number,
	username: string,
	steamId: number,
	ipAddress: string
): Promise<Basket> {

	let requestBody: any = {
		complete_url: 'http://localhost:5173/complete', 
		cancel_url: 'http://localhost:5173/cancel', 
		complete_auto_redirect: false, 
		custom: {
			user_id: userId,
			username: username,
			steam_id: steamId
		},
	}

	if (process.env.NODE_ENV !== 'development') {
		requestBody.ip_address = ipAddress;
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
	return basketData;
}


/**
 * @function AddPackageToBasket
 * @description A function to add a package to a basket from the Tebex Headless API
 * 
 * @param {string} basketIdent The identifier of the basket
 * @param {number} package_id The ID of the package
 * @param {number} quantity The quantity of the package
 * @param {PackageType} type The type of the package
 * @param {KeyValuePair<string, any>} variable_data The variable data of the package
 * 
 * @returns {Promise<Basket>}
 */
export async function AddPackageToBasket(basketIdent: string, package_id: number, quantity: number, type: PackageType, variable_data?: KeyValuePair<string, any>): Promise<Basket> {
    const { data }: Data<Basket> = await Request("POST", basketIdent, "baskets", "/packages", {}, {
        package_id,
        quantity,
        type,
        variable_data
    })

    return data;
}

export async function Request<T, Body>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
    identifier: string | null, 
    route: string, 
    path?: string, 
    params?: Record<string, any>, 
    body?: Body
): Promise<T> {
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (typeof value === "boolean") {
                params[key] = value ? 1 : 0;
            }
        }
    }

    let url = `${TEBEX_API_BASE}/api/${route}/${identifier}${path ?? ""}`;
    if (params) {
        url += '?' + new URLSearchParams(params).toString();
    }

const headers: Record<string, string> = {
	'Content-Type': 'application/json',
};

if (TEBEX_WEBSTORE_IDENTIFIER && TEBEX_SECRET_KEY) {
	headers['Authorization'] = 'Basic ' + btoa(TEBEX_WEBSTORE_IDENTIFIER + ':' + TEBEX_SECRET_KEY);
}

const response = await fetch(url, {
	method,
	headers,
	body: body ? JSON.stringify(body) : undefined,
});

    if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
    }

    return response.json();
}