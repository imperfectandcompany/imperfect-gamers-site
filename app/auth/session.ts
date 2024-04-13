import { json } from "@remix-run/node";
import { sessionStorage } from "./storage.server";
  
  
  export async function checkUserSession(request: Request) {
    // get the session
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    const isAuthenticated = session.has('userToken'); // Check if the userToken exists in the session
    return isAuthenticated;
  }

  export async function checkSteamIntegration(request: Request) {
    // get the session
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    const isSteamLinked = session.has('steamId'); // Check if the userToken exists in the session
    return isSteamLinked;
  }

  export async function checkUsername(request: Request) {
    // get the session
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    const isUserOnboarded = session.has('username'); // Check if the userToken exists in the session
    return isUserOnboarded;
  }


  export async function returnUserModel(request: Request) {
    // get the session
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    const userToken = session.get('userToken');
    const steamId = session.get('steamId');
    return json({ userToken, steamId });
  }


  // export async function linkSteamAccount(request: Request) {
  //   // get the session
  //   const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  //   const userToken = session.get('userToken');
  //   const steamId = session.get('steamId');
  
  //   // Assuming linkSteam is a function you create to call your backend's /user/linkSteam endpoint
  //   const response = await linkSteam(userToken, steamId, steamToken);
  //   if (response.ok) {
  //     return json({ success: true });
  //   }
  //   return json({ success: false });
  // }