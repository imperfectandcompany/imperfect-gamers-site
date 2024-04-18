import { json, ActionFunction } from '@remix-run/node';

export let action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get('username') as string;

    if (!username || username.trim() === '') {
        return json({ error: 'Invalid username.' }, { status: 400 });
    }

    try {
        const response = await fetch('https://api.imperfectgamers.org/user/changeusername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        const data = await response.json();

        if (data.status === 'error') {
            return json({ success: false, message: data.message }, { status: 400 });
        } else {
            return json({
                success: true,
                message: 'User registration completed successfully.'
            });
        }
    } catch (error) {
        return json({ error: 'Network or server error.' }, { status: 500 });
    }
};
