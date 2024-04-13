import { ActionFunctionArgs, json } from "@remix-run/node";
import { login } from "~/auth/authenticator.server";

/**
 * Handles the login action.
 * @param {ActionFunctionArgs} options - The options for the action.
 * @returns {Promise<import('express').Response>} The response object.
 */
export async function action({
    request,
}: ActionFunctionArgs) {

    const result = await login(request);
    if (result?.ok) {
        // If login is successful indicate success.
        return json({ success: 'Login successful' }, {
            headers: {
                'Set-Cookie': await result.cookieHeader,
            },
        });
    } else {
        // If login fails, return an error message to be displayed.
        return json({ error: 'Something happened routes/login.tsx action' }, { status: 400 });
    }
}