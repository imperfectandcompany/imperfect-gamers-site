// app/routes/logout.tsx
import { ActionFunction, json } from '@remix-run/node';
import { getSession, destroySession } from '~/auth/storage.server';
import { logout } from '~/auth/authenticator.server';

/**
 * Handles the logout action.
 * 
 * @param request - The request object.
 * @returns A JSON response indicating the success or failure of the logout action.
 */
export const action: ActionFunction = async ({ request }) => {
    const session = await getSession(request.headers.get('Cookie'));
    const userToken = session.get('userToken');

    if (!userToken) {
        return json({ error: 'No user token found' }, { status: 400 });
    }

    const logoutResult = await logout(userToken);
    if (logoutResult.ok) {
        const headers = {
            'Set-Cookie': await destroySession(session),
        };
        return json({ success: 'Logout successful' }, { headers });
    } else {
        alert('Failed to log out. Please try again.');
        return json({ error: 'Logout failed' }, { status: 500 });
    }
};
