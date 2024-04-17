// ~/routes/auth.check.username.tsx (/auth/check/username)
import { json, ActionFunction } from '@remix-run/node';

// Simulate a database or API call to check username availability
async function checkUsernameAvailability(username: string): Promise<boolean> {
    // Here you would typically make a database query or external API call
    // For simplicity this assumes a mock function
    const existingUsernames = ['user1', 'admin', 'sample'];
    return !existingUsernames.includes(username.toLowerCase());
}

export let action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get('username');

    if (typeof username !== 'string' || username.trim() === '') {
        return json({ error: 'Invalid username.' }, { status: 400 });
    }

    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
        return json({ usernameAvailable: false });
    } else {
        // Save the username to the database or user profile here before responding
        return json({ usernameAvailable: true });
    }
};