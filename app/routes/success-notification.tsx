// app/routes/success-notification.tsx
import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
	getSession,
	commitSession,
} from '~/components/pending/flash-session.server'

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const message = url.searchParams.get('message') || 'Operation successful' // Provide a default message
	const status = url.searchParams.get('status') || '200' // Default status code
	const type = url.searchParams.get('type') || 'general_success' // Default type

	const session = await getSession(request.headers.get('Cookie'))

	// Store success details in session, ensure that both message, status, and type are strings
	session.flash('success', { message, status, type })

	return redirect('/', {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	})
}
