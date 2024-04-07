// FooterLink.tsx
import React from 'react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string; // Add this line to include a className prop
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, external, className }) => {
  // Use the className prop in the className attribute of the <a> element
  return (
    <a href={href} target={external ? '_blank' : '_self'} rel={external ? 'noopener noreferrer' : undefined} className={`text-gray-400 hover:text-white underline ${className}`}>
      {children}
    </a>
  );
};

export default FooterLink;
