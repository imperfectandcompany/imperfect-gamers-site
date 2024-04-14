import { json } from '@remix-run/node'
import { sessionStorage } from './storage.server'

/**
 * Checks if the user session is authenticated.
 * @param request - The request object containing the headers.
 * @returns A boolean indicating whether the user session is authenticated.
 */
export async function checkUserSession(request: Request) {
	// get the session
	const session = await sessionStorage.getSession(request.headers.get('Cookie'))
	const isAuthenticated = session.has('userToken') // Check if the userToken exists in the session
	return isAuthenticated
}

/**
 * Checks if the user's Steam account is integrated with the session.
 * @param request - The request object containing the headers.
 * @returns A boolean indicating whether the user's Steam account is linked to the session.
 */
export async function checkSteamIntegration(request: Request) {
	// get the session
	const session = await sessionStorage.getSession(request.headers.get('Cookie'))
	const isSteamLinked = session.has('steamId') // Check if the userToken exists in the session
	return isSteamLinked
}

/**
 * Checks if the username exists in the session.
 * @param request - The request object.
 * @returns A boolean indicating whether the username exists in the session.
 */
export async function checkUsername(request: Request) {
	// get the session
	const session = await sessionStorage.getSession(request.headers.get('Cookie'))
	const isOnboarded = session.has('username') // Check if the userToken exists in the session
	return isOnboarded
}

/**
 * Returns the user model containing the user token and Steam ID.
 * @param request - The request object.
 * @returns A Promise that resolves to an object containing the user token and Steam ID.
 */
export async function returnUserModel(request: Request) {
	// get the session
	const session = await sessionStorage.getSession(request.headers.get('Cookie'))
	const userToken = session.get('userToken')
	const steamId = session.get('steamId')
	return json({ userToken, steamId })
}