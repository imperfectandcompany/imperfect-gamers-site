// FAQSection.tsx
import type React from 'react'
import FAQItem from '~/components/molecules/FAQItem'

type FAQSectionProps = {
	faqs: Array<{ question: string; answer: React.ReactNode }>
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
	return (
		<div className="faq-section">
			<h2 className="faq-title">Frequently Asked Questions</h2>
			{faqs.map((faq, index) => (
				<FAQItem key={index} question={faq.question}>
					{faq.answer}
				</FAQItem>
			))}
		</div>
	)
}

export default FAQSection
