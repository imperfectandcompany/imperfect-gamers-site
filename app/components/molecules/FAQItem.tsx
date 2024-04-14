import type React from 'react'
import { useState } from 'react'

type FAQItemProps = {
	question: string
	children: React.ReactNode
}

/**
 * FAQItem component displays a frequently asked question and its answer.
 *
 * @component
 * @param {FAQItemProps} props - The props for the FAQItem component.
 * @param {string} props.question - The question to be displayed.
 * @param {ReactNode} props.children - The answer to the question.
 * @returns {JSX.Element} The rendered FAQItem component.
 */
const FAQItem: React.FC<FAQItemProps> = ({ question, children }) => {
	const [isActive, setIsActive] = useState(false)

	/**
	 * Toggles the active state of the FAQItem.
	 */
	const toggleIsActive = () => {
		setIsActive(!isActive)
	}

	return (
		<div
			className={`faq-item ${isActive ? 'active' : ''}`}
			role="button"
			tabIndex={0}
			onClick={toggleIsActive}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') {
					toggleIsActive()
				}
			}}
		>
			<div className="faq-question">{question}</div>
			{isActive ? <div className="faq-answer">{children}</div> : null}
		</div>
	)
}

export default FAQItem
