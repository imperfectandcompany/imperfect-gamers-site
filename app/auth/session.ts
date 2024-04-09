import { json } from "@remix-run/node";
import { sessionStorage } from "./storage.server";
  
  
  export async function checkUserSession(request: Request) {
    // get the session
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    const isAuthenticated = session.has('userToken'); // Check if the userToken exists in the session
    return json({ isAuthenticated });
  }