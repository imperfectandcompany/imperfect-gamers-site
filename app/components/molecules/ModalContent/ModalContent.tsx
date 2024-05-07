// components/molecules/ModalContent/ModalContent.tsx
import React from 'react'
import { type ReactNode } from 'react'
import Heading from '~/components/atoms/Heading/Heading'
import Paragraph from '~/components/atoms/Paragraph/Paragraph'
import { CloseInterceptReason } from '~/components/organism/ModalWrapper/ModalWrapper'

type ModalContentProps = {
	title: string
	header?: ReactNode
	content: ReactNode
	footer?: ReactNode
	isOpen?: boolean
	setCloseInterceptReason: (reason: CloseInterceptReason) => void
}

/**
 * Renders the content of a modal.
 *
 * TODO ENTIRE REFACTOR OF ARCHITECTURE FOR THIS COMPONENT
 * STATUS: IN PROGRESS
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the modal.
 * @param {string | React.ReactNode} props.content - The content of the modal.
 * @returns {React.ReactNode} The rendered modal content.
 */
const ModalContent: React.FC<ModalContentProps> = ({
	title,
	header,
	content,
	footer,
	isOpen,
	setCloseInterceptReason,
}) => {
	return (
		<div>
			{/** TODO setup standard header for modals with fall backs */}
			{header ? (
				<div className="mb-4">{header}</div>
			) : (
				<Heading>{title}</Heading>
			)}
			{typeof content === 'string' ? (
				<Paragraph>{content}</Paragraph>
			) : React.isValidElement(content) ? (
				React.cloneElement(content as React.ReactElement<any>, {
					isOpen,
					setCloseInterceptReason,
				})
			) : null}
			{/** TODO setup standard footer for modals with fall backs */}
			{footer ? footer : null}
		</div>
	)
}

export default ModalContent
