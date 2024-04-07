// components/organism/AuthForms/AuthForms.tsx
import React, { useState } from 'react';
import LoginForm from '~/components/molecules/LoginForm';
import SignUpForm from '~/components/molecules/SignUpForm';

const AuthForms: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const switchForm = () => setIsLoginForm(!isLoginForm);

  return (
    <>
    <div className="flex flex-col space-y-6">
    {isLoginForm ? <LoginForm /> : <SignUpForm />}
    </div>
      <div className="flex flex-row justify-between items-baseline space-x-8 mt-4 text-center text-sm text-white">
        {isLoginForm ? (
          <>
            Don't have an account? <button onClick={switchForm} className="underline">Sign up</button>
          </>
        ) : (
          <>
            <div>Already have an account?</div><button onClick={switchForm} className="underline">Sign in</button>
          </>
        )}
      </div>
    </>
  );
};

export default AuthForms;
