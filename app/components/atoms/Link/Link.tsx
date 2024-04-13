// components/atoms/Link/Link.tsx
import React, { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * A component that renders a link.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.href - The URL of the link.
 * @param {ReactNode} props.children - The content of the link.
 * @param {string} props.className - The CSS class name for the link.
 * @returns {JSX.Element} The rendered link component.
 */
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