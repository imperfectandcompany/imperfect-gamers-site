import { json, ActionFunction } from '@remix-run/node';
import { getSession } from '~/auth/storage.server';

// TODO add cache storage - prevent calls to the API for previously checked usernames

export let action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get('username') as string;

    if (!username || username.trim() === '') {
        return json({ error: 'Invalid username.' }, { status: 400 });
    }


	const session = await getSession(request.headers.get('Cookie'))
	const userToken = session.get('userToken')

	if (!userToken) {
		return json({ error: 'No user token found' }, { status: 400 })
	}

    // TODO Move to user.server.ts
    try {
        const response = await fetch('https://api.imperfectgamers.org/user/checkUsernameExistence', {
            method: 'POST',
            headers: {
				authorization: `${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });

        const data = await response.json();

        if (data.status === 'success') {
            return json({ usernameAvailable: !data.exists });
        } else {
            return json({ error: 'Failed to check username.' }, { status: 500 });
        }
    } catch (error) {
        return json({ error: 'Network or server error.' }, { status: 500 });
    }
};