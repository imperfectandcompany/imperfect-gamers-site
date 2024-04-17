// @/app/auth/authenticator.server.ts
import { commitSession, getSession } from './storage.server'

const apiBase = 'https://api.imperfectgamers.org'

type User = {
	email: string
	uid?: number
	userToken?: string
}

type ApiResponse<T> = {
	status: 'success' | 'error'
	message?: string
	data?: T
}

/**
 * Authenticates a user by sending a request to the API with the provided email and password.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns A Promise that resolves to a User object if authentication is successful, or null if there is an error.
 */
async function authenticateUser(
	email: string,
	password: string,
): Promise<ApiResponse<User | undefined>> {
	try {
		// Send the request to your API
		const response = await fetch(`${apiBase}/auth`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: email, password }), // Ensure mapping to "username"
		})
		try {
			const data = await response.json()
			// For simplicity, returning a simplified user object
			if (response.ok) {
				return {
					status: 'success',
					data: { email, userToken: data.token, uid: data.uid },
				}
			} else if (response.status === 404) {
				return { status: 'error', message: 'User not found' }
			} else if (response.status === 500) {
				if (data.message === 'Token could not be saved.') {
					return { status: 'error', message: 'Token could not be saved' }
				} else if (
					data.message === 'Device of user could not be associated with login.'
				) {
					return {
						status: 'error',
						message: 'Device of user could not be associated with login',
					}
				} else if (data.message === 'Device of user could not be saved.') {
					return {
						status: 'error',
						message: 'Device of user could not be saved',
					}
				} else {
					return { status: 'error', message: 'An unexpected error occurred' }
				}
			} else if (response.status === 401) {
				return { status: 'error', message: 'Invalid Username or Password' }
			} else if (response.status === 400) {
				return {
					status: 'error',
					message: 'One or more expected required inputs were missing',
				}
			} else {
				return { status: 'error', message: 'An unexpected error occurred' }
			}
		} catch (error) {
			console.error('Authentication request failed:', error)
			return { status: 'error', message: 'Network or server error' }
		}
	} catch (error) {
		console.error('Authentication request failed:', error)
		return { status: 'error', message: 'Network or server error' }
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
	const formData = await request.formData()
	const email = formData.get('email')
	const password = formData.get('password')

	if (typeof email !== 'string' || typeof password !== 'string') {
		return { ok: false, error: 'Invalid input data provided.' }
	}

	try {
		const user = await authenticateUser(email, password)
		if (!user || user.status !== 'success') {
			return {
				ok: false,
				error: 'Authentication failed, please check your credentials.',
			}
		}

		const session = await getSession()
		if (user.data?.userToken && user.data?.uid && user.data?.email) {
			session.set('userToken', user.data.userToken)
			session.set('uid', user.data.uid)
			session.set('email', user.data.email)

			const hasSteamAccount = await checkSteamAccount(user.data?.userToken)
			if (hasSteamAccount.hasSteam) {
				session.set('steamId', hasSteamAccount.steamId ?? undefined)
			}

			const onboardingDetails = await checkOnboarded(user.data?.userToken)
			if (onboardingDetails && onboardingDetails.onboarded) {
				session.set('username', onboardingDetails.username)
			}

			const cookieHeader = await commitSession(session)
			return { ok: true, cookieHeader }
		} else {
			return {
				ok: false,
				error: 'Authentication failed, please check your credentials.',
			}
		}
	} catch (error) {
		console.error('Login error:', error)
		return { ok: false, error: 'An unexpected error occurred during login.' }
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
		const response = await fetch(`${apiBase}/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
		const data = await response.json()
		return { status: response.ok ? 'success' : 'error', message: data.message }
	} catch (error) {
		console.error('Register error:', error)
		return { status: 'error', message: 'Network or server error' }
	}
}

/**
 * Logs out the user by sending a request to the API.
 * @param token - The user's authentication token.
 * @returns A promise that resolves to an object indicating the success of the logout operation.
 */
export async function logout(token: string) {
	try {
	  const response = await fetch(`${apiBase}/logout`, {
		method: 'POST',
		headers: {
		  authorization: `${token}`,
		  'Content-Type': 'application/json',
		},
	  });
	  if (!response.ok) {
		if (response.status === 401) {
		  return { ok: false, error: 'Token invalid' };
		}
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
async function checkSteamAccount(
	token: string,
): Promise<{ status: string; hasSteam: boolean; steamId: (number | null)}> {
	try {
		// Send the request to API
		const response = await fetch(`${apiBase}/user/verifySteam`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `${token}`,
			},
		})
		const text = await response.text() // First get the response as text
		const data = JSON.parse(text) // Safely parse the text as JSON
		return {
			status: data.status,
			hasSteam: data.hasSteam,
			steamId: data.steamId,
		}
	} catch (error) {
		console.error(error)
		return { status: 'error', hasSteam: false, steamId: null }
	}
}

type OnboardedResponse = {
	status: string
	onboarded: boolean
	username?: string
}

/**
 * Checks the onboarded status of a user using the provided token.
 * @param token - The authentication token for the user.
 * @returns A promise that resolves to an object containing the onboarded status and additional information.
 */
async function checkOnboarded(token: string): Promise<OnboardedResponse> {
	try {
		const response = await fetch(`${apiBase}/user/onboarded`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		})

		if (!response.ok) {
			// Assuming the API sends a message in the response on error
			const errorData = await response.json()
			throw new Error(errorData.message || 'Error fetching onboard status.')
		}

		const data = await response.json() // This needs to be after checking response.ok

		// Check if the user has successfully onboarded
		if (data.status === 'success' && data.onboarded) {
			return { status: data.status, username: data.username, onboarded: true }
		} else {
			// Handle scenarios where data.status isn't 'success' or onboarded isn't true
			return { status: data.status, onboarded: false }
		}
	} catch (error) {
		console.error('Error checking onboarded status:', error)
		// Provide a default error message if none was included with the thrown error
		return { status: 'error', onboarded: false }
	}
}
