// FooterLink.tsx
import React from 'react';

type FooterLinkProps = {
	href: string;
	children: React.ReactNode;
	external?: boolean;
	className?: string; // Add this line to include a className prop
};

/**
 * Renders a footer link component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.href - The URL of the link.
 * @param {ReactNode} props.children - The content of the link.
 * @param {boolean} props.external - Indicates if the link should open in a new tab.
 * @param {string} props.className - The CSS class name for the link.
 * @returns {JSX.Element} The rendered footer link component.
 */
const FooterLink: React.FC<FooterLinkProps> = ({
	href,
	children,
	external,
	className,
}) => {
	// Use the className prop in the className attribute of the <a> element
	return (
		<a
			href={href}
			target={external ? '_blank' : '_self'}
			rel={external ? 'noopener noreferrer' : undefined}
			className={`text-gray-400 hover:text-white underline ${className}`}
		>
			{children}
		</a>
	);
};

export default FooterLink;
