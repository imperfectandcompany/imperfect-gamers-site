import React from 'react';
import LottieAnimation from '~/components/atoms/LottieAnimation';

interface UserCardProps {
  onClick: () => void;
  title: string;
  subtitle: string;
  description: string;
  animationUrl: string;
}

const UserCard: React.FC<UserCardProps> = ({
  onClick,
  title,
  subtitle,
  description,
  animationUrl,
}) => {
  return (
    <div className="relative w-full max-w-sm cursor-pointer border-2 border-white transition duration-300 ease-in-out hover:border-red-500 hover:-translate-y-1"
      onClick={onClick}>
      <LottieAnimation
        src={animationUrl}
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="absolute inset-0 p-4 bg-gradient-to-t select-none from-black to-transparent">
        <h2 className="text-xl md:text-4xl font-bold text-white">{title}</h2>
        <p className="text-lg md:text-xl font-semibold text-red-500">{subtitle}</p>
        {/* <p className="text-white">{description}</p>
        <p className="text-gray-300">What's good 😎</p> */}
      </div>
    </div>
  );
};

export default UserCard;
