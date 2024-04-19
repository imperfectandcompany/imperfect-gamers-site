// TODO MIGRATIOH FROM STEAMAUTH.TS
// // app/routes/auth/steam.tsx
// import { type LoaderFunction, json, ActionFunction } from '@remix-run/node'

// import { generateSteamLoginURL } from '~/utils/steamAuth'

// /**
//  * Handles the loader function for Steam authorization.
//  *
//  * @param request - The incoming request object.
//  * @returns A JSON response containing the URL to redirect the user to Steam for authentication.
//  */
// export const action: ActionFunction = async ({ request }) => {

// 	const verificationResponse = await fetch(opEndpoint, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded'
// 		},
// 		body: verificationParams
// 	});

// 	const verificationResult = await verificationResponse.text();
// 	if (!verificationResult.includes('is_valid:true')) {
// 		console.error('Steam OpenID validation failed');
// 		return json({ error: 'Steam OpenID validation failed' }, { status: 400 })
// 	}
// 	return json({ ok: true, message: 'Steam OpenID validation successful' })
// }
