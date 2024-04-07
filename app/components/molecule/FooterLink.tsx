// FooterLink.tsx
import React from 'react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, external }) => {
  return (
    <a href={href} target={external ? '_blank' : '_self'} rel={external ? 'noopener noreferrer' : undefined} className="text-gray-400 hover:text-white underline">
      {children}
    </a>
  );
};

export default FooterLink;