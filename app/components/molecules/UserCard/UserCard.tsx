import type React from 'react';
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
    <div className="relative w-full max-w-sm cursor-pointer border-2 border-white transition duration-300 ease-in-out hover:-translate-y-1 hover:border-red-500"
      onClick={onClick}>
      <LottieAnimation
        src={animationUrl}
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="absolute inset-0 select-none bg-gradient-to-t from-black to-transparent p-4">
        <h2 className="text-xl font-bold text-white md:text-4xl">{title}</h2>
        <p className="text-lg font-semibold text-red-500 md:text-xl">{subtitle}</p>
        {/* <p className="text-white">{description}</p>
        <p className="text-gray-300">What's good 😎</p> */}
      </div>
    </div>
  );
};

export default UserCard;
