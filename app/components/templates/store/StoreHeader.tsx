// components/templates/store/StoreHeader.tsx
import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import { checkUserSession } from '~/auth/session'
import { getSession, sessionStorage } from '~/auth/storage.server';
import Button from '~/components/atoms/Button/Button';
import AuthForms from '~/components/organism/AuthForms/AuthForms';
import { MembershipCard } from '~/components/organism/MembershipCard/MembershipCard';
import ModalWrapper from '~/components/organism/ModalWrapper/ModalWrapper';


export default function StoreHeader() {
  const { isAuthenticated } = useLoaderData<{ isAuthenticated: boolean}>();

  return (
    <div>
      <h1 className="title">Imperfect Gamers Club</h1>
      <p className="subtitle">Join now through the exclusive access member pass</p>
      <MembershipCard />
      <div className="mt-8 flex justify-center">
        {false ? (
          // Show content for logged-in users
          <div>Welcome back!</div>
        ) : (
          // Show the modal wrapper for unauthenticated users
          <ModalWrapper
            title={`${isAuthenticated ? 'Join The Club' : 'Unauthorized Action'}`}
            content={<AuthForms />}
          >
            <Button>Join Now</Button>
          </ModalWrapper>
        )}
      </div>
      {!isAuthenticated && (
        <p className="mt-4 text-sm text-center text-white">
          Please log in or sign up to join the club.
        </p>
      )}
    </div>
  );
};