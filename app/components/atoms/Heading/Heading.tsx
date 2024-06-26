// components/atoms/Heading/Heading.tsx
import type React from 'react'
import { type ReactNode } from 'react'

type HeadingProps = {
	children: ReactNode
	className?: string
}

/**
 * Represents a heading component.
 *
 * @component
 * @param {React.ReactNode} children - The content of the heading.
 * @param {string} className - Additional CSS class names for the heading.
 * @returns {React.ReactElement} The rendered heading component.
 */
const Heading: React.FC<HeadingProps> = ({ children, className }) => {
	return (
		<>
			<h2
				className={`form-title mb-4 select-none text-2xl text-white ${className}`}
			>
				{children}
			</h2>
		</>
	)
}

export default Heading
