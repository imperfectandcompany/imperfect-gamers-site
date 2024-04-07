// components/templates/store/StoreHeader.tsx
import React from 'react';
import Button from '~/components/atoms/Button/Button';
import AuthForms from '~/components/organism/AuthForms/AuthForms';
import { MembershipCard } from '~/components/organism/MembershipCard/MembershipCard';
import ModalWrapper from '~/components/organism/ModalWrapper/ModalWrapper';
import UnauthenticatedView from '~/components/organism/UnauthenticatedView';

const StoreHeader: React.FC = () => {
  const isLoggedIn = false; // Replace with actual auth guard later...

  return (
    <div className="">
      <h1 className="title">Imperfect Gamers Club</h1>
      <p className="subtitle">Join now through the exclusive access member pass</p>
      <MembershipCard />
      <div className="mt-8 flex justify-center">
        <ModalWrapper
          title={!isLoggedIn ? 'Unauthorized Action' : 'Access to continue'}
          content={!isLoggedIn ? <AuthForms /> : <>Access to continue</>}
        >
          <Button>Join Now</Button>
        </ModalWrapper>
      </div>
      {!isLoggedIn && (
          <p className="mt-4 text-sm text-center text-white">
            Please log in or sign up to join the club.
          </p>
        )}
    </div>
  );
};

export default StoreHeader;