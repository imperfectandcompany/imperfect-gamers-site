// app/routes/register.tsx
import {type ActionFunction, json} from '@remix-run/node';
import {registerUser} from '~/auth/authenticator.server'; // Assuming you export it similarly to login function.

/**
 * Handles the registration action.
 *
 * @param request - The request object.
 * @returns The response object.
 */
export const action: ActionFunction = async ({request}) => {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	try {
		const result = await registerUser(email, password);
		if (result.status === 'success') {
			// If login is successful indicate success somehow.
			return json({success: 'Registration successful'});
		} else {
			// Return error message from API
			return json({error: result.message}, {status: 400});
		}
	} catch (error) {
		const message = (error as Error).message || 'Unable to register';
		return json({message}, {status: 500});
	}
};
