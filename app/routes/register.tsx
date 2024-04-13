// app/routes/register.tsx
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { registerUser } from "~/auth/authenticator.server";  // Assuming you export it similarly to login function.

// export const loader: LoaderFunction = ({ request }) => {
//     return (
//         <>
//             <div style={{ display: 'none' }}>
//                 ⚠️ This page is intentionally hidden. ⚠️
//             </div>
//             <div>
//                 POWERED BY IMPERFECT AND COMPANY LLC
//                 <br />
//                 © 2024 Imperfect and Company LLC. All rights reserved.
//             </div>
//         </>
//     );
// };
  

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const result = await registerUser(email, password);
        if (result.status === 'success') {
            // If login is successful indicate success somehow.
            return json({ success: 'Registration successful' });
        } else {
            // Return error message from API
            return json({ message: result.message }, { status: 400 });
        }
    } catch (error) {
        const message = (error as Error).message || 'Unable to register';
        return json({ message }, { status: 500 });
    }
};
