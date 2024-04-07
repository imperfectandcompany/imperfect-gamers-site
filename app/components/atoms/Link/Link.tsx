// components/atoms/Link/Link.tsx
import React, { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, className }) => {
  return (
    <a
      href={href}
      className={`text-blue-400 hover:text-blue-600 ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;