// @/app/auth/authenticator.server.ts
import { commitSession, getSession } from './storage.server';


const API_BASE = 'https://api.imperfectgamers.org';


// Define the user type for your application
interface User {
    status: string;
    email: string;
    userToken: string;
}

/**
 * Authenticates a user by sending a request to the API with the provided email and password.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns A Promise that resolves to a User object if authentication is successful, or null if there is an error.
 */
async function authenticateUser(email: string, password: string): Promise<User | null> {

    try {
        // Send the request to your API
        const response = await fetch(`${API_BASE}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }), // Ensure mapping to "username"
        });
        const text = await response.text(); // First get the response as text
        const data = JSON.parse(text); // Safely parse the text as JSON
        // For simplicity, returning a simplified user object
        return { status: data.status, email: email, userToken: data.token };
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Authenticates a user's login request.
 * 
 * @param request - The login request object.
 * @returns An object containing the result of the login request.
 *          - ok: A boolean indicating if the login was successful.
 *          - cookieHeader: The cookie header to be returned in the response.
 * @throws An error if the user fails to authenticate.
 */
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
        // Check if user has a linked Steam account
        const hasSteamAccount = await checkSteamAccount(user?.userToken);
        if (hasSteamAccount.hasSteam === true) {
            session.set("steamId", hasSteamAccount.steamId);
        }
        // Check if user has a username set
        const OnboardingDetails = await checkOnboarded(user?.userToken);

        if(OnboardingDetails && OnboardingDetails.onboarded === true) {
            session.set("username", OnboardingDetails.username);
        }

        const cookieHeader = await commitSession(session);
        return { ok: true, cookieHeader };
    }
}

/**
 * Registers a user by sending a POST request to the API with the provided email and password.
 * @param email - The email of the user to register.
 * @param password - The password of the user to register.
 * @returns A promise that resolves to an object containing the status and message of the registration.
 */
export async function registerUser(email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return { status: response.ok ? 'success' : 'error', message: data.message };
    } catch (error) {
      console.error('Register error:', error);
      return { status: 'error', message: 'Network or server error' };
    }
  }
  
/**
 * Logs out the user by sending a request to the API.
 * @param token - The user's authentication token.
 * @returns A promise that resolves to an object indicating the success of the logout operation.
 */
export async function logout(token: string) {
    try {
        const response = await fetch(`${API_BASE}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.log(response.status);
            throw new Error('Logout failed at API level');
        }
        return { ok: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { ok: false };
    }
}

/**
 * Checks the Steam account associated with the provided token.
 * @param token - The authentication token.
 * @returns A promise that resolves to an object containing the status, hasSteam, and steamId.
 */
async function checkSteamAccount(token: string): Promise<{ status: string, hasSteam: boolean, steamId: string }> {
    
    try {
        // Send the request to API
        const response = await fetch(`${API_BASE}/user/verifySteam`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        });
        const text = await response.text(); // First get the response as text
        const data = JSON.parse(text); // Safely parse the text as JSON
        return { status: data.status, hasSteam: data.hasSteam, steamId: data.steamId };
    } catch (error) {
        console.error(error);
        return { status: 'error', hasSteam: false, steamId: '' };
    }
}

interface OnboardedResponse {
    status: string;
    onboarded: boolean;
    username?: string;
}

/**
 * Checks the onboarded status of a user using the provided token.
 * @param token - The authentication token for the user.
 * @returns A promise that resolves to an object containing the onboarded status and additional information.
 */
async function checkOnboarded(token: string): Promise<OnboardedResponse> {
    try {
        const response = await fetch(`${API_BASE}/user/onboarded`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        if (!response.ok) {
            // Assuming the API sends a message in the response on error
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching onboard status.');
        }

        const data = await response.json(); // This needs to be after checking response.ok

        // Check if the user has successfully onboarded
        if (data.status === 'success' && data.onboarded) {
            return { status: data.status, username: data.username, onboarded: true };
        } else {
            // Handle scenarios where data.status isn't 'success' or onboarded isn't true
            return { status: data.status, onboarded: false };
        }
    } catch (error) {
        console.error('Error checking onboarded status:', error);
        // Provide a default error message if none was included with the thrown error
        return { status: 'error', onboarded: false };
    }
}
