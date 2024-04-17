// @/app/auth/storage.server.ts
import { createCookieSessionStorage, createCookie } from '@remix-run/node'
import { createTypedCookie } from 'remix-utils/typed-cookie'
import { z } from 'zod'

/**
 * Represents the session data for a user.
 */
type SessionData = {
	uid?: number
	userToken?: string
	steamId?: number
	email?: string
	username?: string
}

/**
 * Creates a session storage using cookie-based storage mechanism.
 *
 * @param cookie - Configuration options for the cookie.
 * @returns The session storage object.
 */
/**
 * Represents the session storage configuration.
 */
export const sessionStorage = createCookieSessionStorage<SessionData>({
	/**
	 * Represents the configuration for the session cookie.
	 */
	cookie: {
		/**
		 * Represents the name of the session cookie.
		 */
		name: '_session',
		/**
		 * Represents the SameSite attribute of the session cookie.
		 * The "lax" value allows the cookie to be sent with top-level navigation and GET requests from other sites.
		 */
		sameSite: 'lax',
		/**
		 * Represents the path attribute of the session cookie.
		 * The cookie will be sent with requests that are made to the specified path and its subpaths.
		 */
		path: '/',
		/**
		 * Represents whether the session cookie is accessible only through HTTP requests.
		 * When set to true, the cookie cannot be accessed by client-side JavaScript.
		 */
		httpOnly: true,
		/**
		 * Represents the secrets used to sign the session cookie.
		 * These secrets are used to verify the integrity of the cookie and prevent tampering.
		 */
		secrets: ['n3wsecr3t', 'olds3cret'],
		/**
		 * Represents whether the session cookie should only be sent over secure connections.
		 * When set to true, the cookie will only be sent over HTTPS in production environments.
		 */
		secure: process.env.NODE_ENV === 'production',
	},
})

export const { getSession, commitSession, destroySession } = sessionStorage

// Define the schema for the in-basket object
const inBasketSchema = z.object({
	quantity: z.number(),
	price: z.number(),
	gift_username_id: z.string().nullable(), // Use nullable for null values
	gift_username: z.string().nullable(),
})

// Define the base schema for an item
const baseItemSchema = z.object({
	id: z.number(),
	name: z.string(),
})

// Define the schema for the store cookie
const basket = baseItemSchema.extend({
	description: z.string(),
	in_basket: inBasketSchema,
	image: z.string().nullable(),
})

// Define the schema for the store cookie
const storeCookieSchema = z
	.object({
		basketId: z.string().optional(),
		packages: z.array(basket).optional(),
		checkoutUrl: z.string().url().optional(),
	})
	.default({})

export const storeCookie = createTypedCookie({
	cookie: createCookie('user-store', {
		path: '/store',
		secrets: ['n3wsecr3t', 'olds3cret'],
		sameSite: 'strict',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
	}),
	schema: storeCookieSchema,
})
