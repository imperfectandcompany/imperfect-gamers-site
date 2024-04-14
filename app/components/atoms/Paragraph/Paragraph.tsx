// components/atoms/Paragraph/Paragraph.tsx
import React, {type ReactNode} from 'react';

type ParagraphProps = {
	children: ReactNode;
	className?: string;
};

/**
 * Renders a paragraph element.
 *
 * @component
 * @param {React.ReactNode} children - The content to be rendered inside the paragraph.
 * @param {string} className - Additional CSS class name(s) to be applied to the paragraph element.
 * @returns {React.ReactElement} The rendered paragraph element.
 */
const Paragraph: React.FC<ParagraphProps> = ({children, className}) => {
	return <p className={`mt-4 ${className}`}>{children}</p>;
};

export default Paragraph;
