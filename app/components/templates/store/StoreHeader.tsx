// components/templates/store/StoreHeader.tsx
import React from 'react';
import Button from '~/components/atoms/Button/Button';
import { MembershipCard } from '~/components/organism/MembershipCard/MembershipCard';
import ModalWrapper from '~/components/organism/ModalWrapper/ModalWrapper';
import UnauthenticatedView from '~/components/organism/UnauthenticatedView';

const StoreHeader: React.FC = () => {
  const isLoggedIn = false; // Replace with actual auth guard later...

  return (
    <div className="container">
      <h1 className="title">Imperfect Gamers Club</h1>
      <p className="subtitle">Join now through the exclusive access member pass</p>
      <MembershipCard />
      <div className="flex justify-center fade-down">
        <ModalWrapper
          title={!isLoggedIn ? 'Unauthorized Action' : 'Access to continue'}
          content={!isLoggedIn ? <UnauthenticatedView /> : <>Access to continue</>}
        >
          <Button>Join Now</Button>
        </ModalWrapper>
      </div>
    </div>
  );
};

export default StoreHeader;