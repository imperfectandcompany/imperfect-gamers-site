// @/app/auth/storage.server.ts
import { createCookieSessionStorage } from '@remix-run/node'
import { createCookie } from '@remix-run/node'
import { createTypedCookie } from 'remix-utils/typed-cookie'
import { z } from "zod";

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

const storeCookieSchema = z.object({
    basketId: z.string().optional()
}).default({});

export const storeCookie = createTypedCookie({
    cookie: createCookie("user-store", {
        path: "/store",
        secrets: ["n3wsecr3t", "olds3cret"],
        sameSite: "strict",
        httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
    }),
    schema: storeCookieSchema,
});