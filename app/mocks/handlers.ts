import { http, HttpResponse } from 'msw'
import { users } from './user.data'

export const apiBase = 'https://api.imperfectgamers.org'

export const handlers = [
	http.post(`${apiBase}/auth`, async ({ request }) => {
		const { username, password } = (await request.json()) as {
			username: string
			password: string
		}
		// Check against the fake databank of users
		const user = users.find(
			u => u.email === username && u.password === password,
		)

		if (user && user.userToken && user.uid) {
			// Simulating successful authentication
			return HttpResponse.json({
				status: 200,
				headers: { 'Content-Type': 'application/json' },
				email: user.email,
				token: user.userToken,
				uid: user.uid,
			})
		} else {
			// Simulating invalid credentials or server errors based on the username
			if (username === 'error@example.com') {
				return new HttpResponse(
					JSON.stringify({
						status: 'error',
						message: 'An unexpected error occurred',
					}),
				)
			} else {
				return HttpResponse.json({
					status: 401,
					headers: { 'Content-Type': 'application/json' },
					message: 'Ifnvalid Username or Password',
				})
			}
		}
	}),
	// Register endpoint
	http.post(`${apiBase}/register`, async ({ request }) => {
		const { email, password } = (await request.json()) as {
			email: string
			password: string
		}
		const userExists = users.some(user => user.email === email)
		if (userExists) {
			return HttpResponse.json(
				{ message: 'User already exists' },
				{ status: 409 },
			)
		}
		const newUser = {
			email: email.toString(),
			password: password.toString(),
			userToken: 'new-token-' + Math.random().toString(36).substr(2, 9),
			uid: Math.floor(Math.random() * 10000),
			isOnboarded: false,
			steamVerified: false,
			steamId: null,
		}
		users.push(newUser)
		return HttpResponse.json(
			{ status: 'success', data: newUser },
			{ status: 201 },
		)
	}),
	// Logout endpoint
	http.post(`${apiBase}/logout`, async ({ request }) => {
		const userToken = request.headers.get('authorization')
		const user = users.find(u => u.userToken === userToken)
		if (!user) {
			return HttpResponse.json({ message: 'Invalid token' }, { status: 401 })
		}
		// Simulate logout
		return HttpResponse.json({ status: 'success' }, { status: 200 })
	}),
	// Verify Steam endpoint
http.post(`${apiBase}/user/verifySteam`, async ({ request }) => {
    const userToken = request.headers.get('authorization')
    const user = users.find(u => u.userToken === userToken)
    if (!user) {
        return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }
    if (!user.steamVerified) {
        return HttpResponse.json({ message: 'User is not Steam verified' }, { status: 403 })
    }
	return HttpResponse.json(
		{ status: 'success', hasSteam: true, steamId: user.steamId },
		{ status: 200 },
	)
}),
	// Onboarded endpoint
	http.get(`${apiBase}/user/onboarded`, async ({ request }) => {
		const userToken = request.headers.get('authorization')
		const user = users.find(u => u.userToken === userToken)
		if (!user) {
			return HttpResponse.json({ message: 'User not found' }, { status: 404 })
		}
		return HttpResponse.json(
			{
				status: 'success',
				onboarded: user.isOnboarded,
				username: user.email.split('@')[0],
			},
			{ status: 200 },
		)
	}),
]
