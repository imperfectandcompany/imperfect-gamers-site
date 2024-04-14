// TextElement.tsx
import type React from 'react'

type TextElementProps = {
	text: string
	className?: string
}

/**
 * Renders a text element.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be rendered.
 * @param {string} props.className - The CSS class name for the text element.
 * @returns {JSX.Element} The rendered text element.
 */
const TextElement: React.FC<TextElementProps> = ({ text, className }) => (
	<span className={className}>{text}</span>
)

export default TextElement
