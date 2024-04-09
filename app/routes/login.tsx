import { ActionFunctionArgs, json } from "@remix-run/node";
import { login } from "~/auth/authenticator.server";

export async function action({
    request,
}: ActionFunctionArgs) {

    const result = await login(request);
    if (result?.ok) {
        // If login is successful, redirect or indicate success somehow.
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