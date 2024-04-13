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


interface LoaderData {
  isAuthenticated: boolean;
  userToken: string | null;
  isSteamLinked: boolean;
  steamId: string | null;
  username: string | null;
}

/**
 * Renders the header component for the store page.
 * 
 * This component displays the header section of the store page. It includes the title,
 * subtitle, membership card, and a modal wrapper for authentication forms. The content
 * of the header may vary depending on the user's authentication status and Steam
 * account linkage.
 * 
 * @returns The rendered StoreHeader component.
 */
export default function StoreHeader() {
  const { isAuthenticated, userToken, isSteamLinked, steamId, username } = useLoaderData<LoaderData>();

  const title = isAuthenticated && username && isSteamLinked
    ? `Join The Club, ${username}`
    : `Unauthorized Action`;

    return (
      <div>
        <h1 className="title">Imperfect Gamers Club</h1>
        <p className="subtitle">Join now through the exclusive access member pass</p>
        <MembershipCard />
        <div className="mt-8 flex justify-center">
            <ModalWrapper title={title} content={<AuthForms />}>
              <Button>Join Now</Button>
            </ModalWrapper>
        </div>
        {!isAuthenticated && (
          <p className="mt-4 text-sm text-center text-white">
            Please log in or sign up to join the club.
          </p>
        )}
      </div>
    );
  };