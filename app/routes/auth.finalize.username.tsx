import { json, ActionFunction } from '@remix-run/node'
import { commitSession, getSession } from '~/auth/storage.server'

export let action: ActionFunction = async ({ request }) => {
	const formData = await request.formData()
	const username = formData.get('username')?.toString().trim()

	if (!username) {
		return json({ error: 'Invalid username.' }, { status: 400 })
	}

	const session = await getSession(request.headers.get('Cookie'))
	const userToken = session.get('userToken')

	if (!userToken) {
		return json({ error: 'No user token found' }, { status: 401 })
	}

	try {
		const response = await fetch(
			'https://api.imperfectgamers.org/user/changeusername',
			{
				method: 'POST',
				headers: {
                    authorization: `${userToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username }),
			},
		)

        const data = await response.json();

	// Get the existing session
	const session = await getSession(request.headers.get('Cookie'))

	if (session) {
		// Set the steamId in the session
		session.set('username', username)
		const cookieHeader =await commitSession(session)

        if (data.status === 'success') {
		return json(
			{ success: 'Login successful', message: 'Username added successfully.' },
            {
                headers: {
                    'Set-Cookie': cookieHeader,
                } as HeadersInit, // Cast headers object to HeadersInit type
            },
		)
		} else{
            const errorData = { success: false, message: data.message, status: 400 };
            console.log(errorData);
            return json(errorData);
        }
    } else {
        return json({ error: 'No session found' }, { status: 400 })
    }

	} catch (error) {
		console.error('Failed to change username:', error)
		return json({ error: 'Network or server error.' }, { status: 500 })
	}
}
