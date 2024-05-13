// components/molecules/ModalContent/ModalContent.tsx
import React from 'react'
import { type ReactNode } from 'react'
import Heading from '~/components/atoms/Heading/Heading'
import Paragraph from '~/components/atoms/Paragraph/Paragraph'
import type { CloseInterceptReason } from '~/components/organism/ModalWrapper/ModalWrapper'
import ModalHeader from '../ModalHeader/ModalHeader'

type ModalContentProps = {
    title: string
    header?: ReactNode
    content: ReactNode
    footer?: ReactNode
    isOpen?: boolean
    setCloseInterceptReason?: (reason: CloseInterceptReason) => void
    setPopupWindow?: (window: Window | null) => void
    onBack?: () => void // new prop for back button
    backButtonTitle?: string;
    align?: 'left' | 'center' | 'right' // new prop for title alignment
}

const ModalContent: React.FC<ModalContentProps> = ({
    title,
    header,
    content,
    footer,
    isOpen,
    setCloseInterceptReason,
    setPopupWindow,
    onBack, // new prop for back button
    backButtonTitle,
    align, // new prop for title alignment
}) => {
    return (
        <div>
            {header ? (
                <div className="mb-4">{header}</div>
            ) : (
                <ModalHeader title={title} onBack={onBack} backButtonTitle={backButtonTitle} align={align} /> // use ModalHeader when no custom header is provided
            )}
            {typeof content === 'string' ? (
                <Paragraph>{content}</Paragraph>
            ) : React.isValidElement(content) ? (
                React.cloneElement(content as React.ReactElement<ContentElementProps>, {
                    ...(setCloseInterceptReason ? { setCloseInterceptReason } : {}),
                    ...(setPopupWindow ? { setPopupWindow } : {}),
                    isOpen,
                })
            ) : null}
            {footer ? footer : null}
        </div>
    )
}

interface ContentElementProps {
    isOpen: boolean
    setCloseInterceptReason?: (reason: CloseInterceptReason) => void
    setPopupWindow?: (popup: Window | null) => void
}

export default ModalContent