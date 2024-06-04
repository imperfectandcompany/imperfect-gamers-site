// app/routes/error-notification.tsx
import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
	commitSession,
	getSession,
} from '~/components/pending/flash-session.server'

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const message = url.searchParams.get('message') || 'Default error message' // Provide a default message
	const status = url.searchParams.get('status') || '500' // Default status code
	const type = url.searchParams.get('type') || 'general_error' // Default type

	const session = await getSession(request.headers.get('Cookie'))

	// Store error details in session, ensure that both message and status are strings
	session.flash('error', { message, status, type })

	return redirect('/', {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	})
}
