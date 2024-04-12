// app/routes/auth/steam/callback.tsx
import { LoaderFunction, json } from '@remix-run/node';
import { commitSession, getSession } from '~/auth/storage.server';
import { verifySteamAssertion } from '~/utils/steamAuth';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const steamId = await verifySteamAssertion(url.toString(), url.searchParams);

  if (!steamId) {
    // Handle error or redirect to an error page
    throw new Response('Steam authentication failed', { status: 400 });
  }

  // Get the existing session
  const session = await getSession(request.headers.get("Cookie"));

  if (session) {
    session.set("steamId", steamId);
    await commitSession(session);
    
    // Send a message to the parent window
    //TODO: SETUP PROCESS.ENV ORIGIN INSTEAD OF * FOR SECURITY
    const script = `
      <script>
        window.opener.postMessage({ type: 'steam-auth-success' }, '*');
        window.close();
      </script>
    `;

    return new Response(script, {
      headers: {
        "Content-Type": "text/html",
        "Set-Cookie": await commitSession(session), // Ensure the cookie is set
      },
    });
  } else {
    throw new Response('Session not found', { status: 400 });
  }
};

//   // Return a script that sends a message to the parent window
//   const script = `
//     <script>
//       window.opener.postMessage({
//         type: 'steam-auth-success',
//         steamId: '${steamId}'
//       }, '*');
//       window.close();
//     </script>
//   `;
//   return new Response(script, {
//     headers: { 'Content-Type': 'text/html' },
//     status: 200
//   });
// };