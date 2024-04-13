// @/app/auth/storage.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
    userToken?: string;
    steamId?: string;
    username?: string;
  };

export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["n3wsecr3t", "olds3cret"],
    secure: process.env.NODE_ENV === "production",
  },
});


export const { getSession, commitSession, destroySession } = sessionStorage;