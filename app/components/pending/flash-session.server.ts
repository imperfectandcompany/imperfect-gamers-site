import { createCookieSessionStorage } from '@remix-run/node'

// Name of the session
const FLASH_SESSION = '__session'

interface SessionData {}

interface SessionFlashData {
	error?: {
		message: string
		status: string
		type: string
	}
	success?: {
		message: string
		status: string
		type: string
	}
}

const storage = createCookieSessionStorage<SessionData & SessionFlashData>({
	cookie: {
		name: FLASH_SESSION,
		httpOnly: true,
		maxAge: 60,
		path: '/',
		sameSite: 'lax',
		secrets: ['s3cret1'],
		secure: process.env.NODE_ENV === 'production',
	},
})

const { getSession, commitSession, destroySession } = storage

// Utility function to get and clear the flash message from the session
async function getFlashMessage(
	request: Request,
): Promise<{ message?: string; status?: string; type?: string } | undefined> {
	const session = await getSession(request.headers.get('Cookie'))
	const error = session.get('error')
	const success = session.get('success')

	if (error) {
		session.unset('error')
		await commitSession(session)
		return error
	} else if (success) {
		session.unset('success')
		await commitSession(session)
		return success
	}

	return undefined
}

export { getSession, commitSession, destroySession, getFlashMessage }
