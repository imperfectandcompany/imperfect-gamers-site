// components/molecules/ModalContent/ModalContent.tsx
import React from 'react'
import { type ReactNode } from 'react'
import Heading from '~/components/atoms/Heading/Heading'
import Paragraph from '~/components/atoms/Paragraph/Paragraph'

type ModalContentProps = {
	title: string
	content: ReactNode
	isOpen?: boolean
}

/**
 * Renders the content of a modal.
 *
 * TODO ENTIRE REFACTOR OF ARCHITECTURE FOR THIS COMPONENT
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the modal.
 * @param {string | React.ReactNode} props.content - The content of the modal.
 * @returns {React.ReactNode} The rendered modal content.
 */
const ModalContent: React.FC<ModalContentProps> = ({
	title,
	content,
	isOpen,
}) => {
	return (
		<div>
			<Heading>{title}</Heading>
			{typeof content === 'string' ? (
				<Paragraph>{content}</Paragraph>
			) : React.isValidElement(content) ? (
				React.cloneElement(content as React.ReactElement<any>, { isOpen })
			) : null}
		</div>
	)
}

export default ModalContent
