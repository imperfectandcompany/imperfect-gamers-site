// @/app/auth/authenticator.server.ts
import { commitSession, getSession } from './storage.server';


const API_ENDPOINT = 'https://api.imperfectgamers.org/auth';


// Define the user type for your application
interface User {
    status: string;
    username: string;
    userToken: string;
}

// Function to authenticate a user with the external API
async function authenticateUser(email: string, password: string): Promise<User | null> {
    try {
        // Send the request to your API
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }), // Ensure mapping to "username"
        });
        const text = await response.text(); // First get the response as text
        const data = JSON.parse(text); // Safely parse the text as JSON
        // For simplicity, returning a simplified user object
        return { status: data.status, username: email, userToken: data.token };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function login(request: Request) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    // Ensure email and password are not null and are of type string
    if (typeof email === 'string' && typeof password === 'string') {
        // Authenticate against external API
        const user = await authenticateUser(email, password);

        // Authenticate against external API
        // TODO add catch
        if (!user || user.status !== "success") {
            throw new Error("Failed to authenticate user");
        }

        const session = await getSession();
        session.set("userToken", user?.userToken);
        const cookieHeader = await commitSession(session);
        return { ok: true, cookieHeader };
    }
}