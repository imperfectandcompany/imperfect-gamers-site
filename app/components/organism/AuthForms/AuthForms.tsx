// components/organism/AuthForms/AuthForms.tsx
import { useFetcher, useLoaderData } from '@remix-run/react';
import React, { useEffect, useState } from 'react';
import { useRevalidator } from "react-router-dom";
import Button from '~/components/atoms/Button/Button';
import AuthorizeForm from '~/components/molecules/AuthorizeForm';
import LoginForm from '~/components/molecules/LoginForm';
import SignUpForm from '~/components/molecules/SignUpForm';

const AuthForms: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { revalidate } = useRevalidator();


  const switchForm = () => setIsLoginForm(!isLoginForm);
  const { isAuthenticated, isSteamLinked } = useLoaderData<{ isAuthenticated: boolean; isSteamLinked?: boolean }>();
  const fetcher = useFetcher();
  // isAuthorize is a pre-check for membership purchase under condition user has satisfied 3 requirements. 1. Completed onboarding (set a user), 2. Verified Email 3.
  // mock value for now
  // const isAuthorized = false;
  const handleLogout = () => {
    fetcher.submit({}, { method: "post", action: "/logout" });
  };

  useEffect(() => {
    const handleMessage = (event: { origin: string; data: { type: string; }; }) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === 'steam-auth-success') {
        // Fetch the updated session data
        revalidate(); // This re-triggers the loader
      }
    };
  
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [revalidate]);

  return (
    <>
      <div className="flex flex-col space-y-6">
        {isAuthenticated ? (
          <>
            {isSteamLinked ? (
              <>Authenticated, Authorized, and Steam Linked</>
            ) : (
              <AuthorizeForm />
            )}
          </>
        ) : isLoginForm ? (
          <LoginForm />
        ) : (
          <SignUpForm />
        )}
      </div>
      <div className="flex flex-row justify-between items-baseline space-x-8 mt-4 text-center text-sm text-white">
        {isAuthenticated ? (
          <>
            You are currently signed in
            <button onClick={handleLogout} className="underline">Log out</button>
          </>
        ) : isLoginForm ? (
          <>
            Don't have an account? <button onClick={() => switchForm()} className="underline">Sign up</button>
          </>
        ) : (
          <>
            Already have an account?<button onClick={() => switchForm()} className="underline">Sign in</button>
          </>
        )}
      </div>
    </>
  );
};

export default AuthForms;
