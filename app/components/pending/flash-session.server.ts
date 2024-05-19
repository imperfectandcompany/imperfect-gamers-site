import { createCookieSessionStorage } from '@remix-run/node'

// Name of the session
const FLASH_SESSION = 'flash'

type SessionData = {
	email: string
}

type SessionFlashData = {
	error: string
}

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		// a Cookie from `createCookie` or the CookieOptions to create one
		cookie: {
			name: FLASH_SESSION,

			// all of these are optional
			//domain: "dev.imperfectgamers.org",
			// Expires can also be set (although maxAge overrides it when used in combination).
			// Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
			//
			// expires: new Date(Date.now() + 60_000),
			httpOnly: true,
			maxAge: 60,
			path: '/',
			sameSite: 'lax',
			secrets: ['s3cret1'],
			secure: process.env.NODE_ENV === 'production',
		},
	})

export { getSession, commitSession, destroySession }
