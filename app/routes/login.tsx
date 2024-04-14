import { ActionFunctionArgs, json } from "@remix-run/node";
import { login } from "~/auth/authenticator.server";

export async function action({
    request,
}: ActionFunctionArgs) {

    const result = await login(request);
    if (result.ok) {
        // If login is successful indicate success.
        return json({ success: 'Login successful' }, {
            headers: {
                'Set-Cookie': await result.cookieHeader,
            } as HeadersInit, // Cast headers object to HeadersInit type
        });
    } else {
        // If login fails, return an error message to be displayed.0
        console.log("Error in login:", result.error);
        return json({ error: result.error }, { status: 400 });
    }
}