// app/routes/error-notification.tsx
import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
	commitSession,
	getSession,
} from '~/components/pending/flash-session.server'

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const message = url.searchParams.get('message') || 'Default error message'
	const status = url.searchParams.get('status') || '500'
	const type = url.searchParams.get('type') || 'general_error'

	console.log(`Received error of type: ${type} with message: ${message}`)

	const session = await getSession(request.headers.get('Cookie'))

	session.flash('error', { message, status, type })
	console.error(
		`Logging error to session: ${message}, Status: ${status}, Type: ${type}`,
	)

	const cookieHeader = await commitSession(session)
	console.log(`Session committed with cookie header: ${cookieHeader}`)

	return redirect('/', {
		headers: {
			'Set-Cookie': cookieHeader,
		},
	})
}
