// app/routes/auth/steam/callback.tsx
import { LoaderFunction } from '@remix-run/node';
import { verifySteamAssertion } from '~/utils/steamAuth';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const steamId = await verifySteamAssertion(url.toString(), url.searchParams);

  if (!steamId) {
    // Handle error or redirect to an error page
    throw new Response('Steam authentication failed', { status: 400 });
  }

  // Proceed to link Steam ID with the user's account in your system
  // Redirect the user to their profile or dashboard after successful linking

  return new Response(`Steam ID: ${steamId}`, { status: 200 });
};
