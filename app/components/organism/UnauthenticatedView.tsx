// UnauthenticatedView.tsx
import React from 'react';
import Heading from '~/components/atoms/Heading';
import Paragraph from '~/components/atoms/Paragraph';
import LoginForm from '~/components/molecule/LoginForm';

const UnauthenticatedView = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="mb-2 text-center">
        <Heading>You must be logged in</Heading>
      </div>
      <div className="w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedView;