// app/routes/auth/steam.tsx
import { LoaderFunction, json, redirect } from '@remix-run/node';
import { getSteamLoginURL } from '~/utils/steamAuth';

export const loader: LoaderFunction = ({ request }) => {
  // The URL to which Steam should redirect the user after login
  const returnURL = new URL('/authorize/steam/callback', request.url).toString();
  const steamLoginURL = getSteamLoginURL(returnURL);
  
  // Redirect the user to Steam for authentication
  return json({ url: steamLoginURL });
};
