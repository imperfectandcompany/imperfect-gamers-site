// ~/routes/auth.check.username.tsx (/auth/check/username)
import { json, ActionFunction } from '@remix-run/node';

// Possible in-memory store or local cache mechanism for efficiency
let usernameCache = new Map<string, boolean>();


// Simulate a database or API call to check username availability
async function checkUsernameAvailability(username: string): Promise<boolean> {
    // If present in cache, return from it to avoid database hit
    if (usernameCache.has(username)) {
        return usernameCache.get(username)!;
    } else {
        // Simulating a database/api check
        const existingUsernames = ['user1', 'admin', 'sample'];
        const availability = !existingUsernames.includes(username.toLowerCase());
        usernameCache.set(username, availability);
        return availability;
    }
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
        // Since the username is available, returning the result without extra data storage
        return json({ usernameAvailable: true });
    }
};