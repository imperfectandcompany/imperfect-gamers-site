// components/atoms/Heading/Heading.tsx
import React, { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  return (
    <h2 className={`text-xl font-bold ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;