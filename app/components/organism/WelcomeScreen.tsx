import React from 'react';
import UserCard from '../molecules/UserCard/UserCard';

interface WelcomeScreenProps {
  onNewUser: () => void;
  onExistingUser: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNewUser,
  onExistingUser,
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 bg-black">
      <div className="max-w-4xl w-full">
        <h1 className="text-center text-white text-4xl font-bold mb-8">
          Who's joining?
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <UserCard
            onClick={onNewUser}
            title="New User"
            subtitle="New here"
            description="Unranked"
            animationUrl="https://lottie.host/f4cdfc7c-f9a3-40ae-ab75-f7b3dd57f678/N0XLmIQErG.json"
          />
          <UserCard
            onClick={onExistingUser}
            title="Old Timer"
            subtitle="Been here before"
            description="Veteran"
            animationUrl="https://lottie.host/879e211e-1f3a-4015-8815-79d5cd1af0d2/RaWWjJVbB4.json"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
