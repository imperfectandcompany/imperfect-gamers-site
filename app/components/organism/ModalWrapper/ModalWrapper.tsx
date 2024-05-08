// components/organism/ModalWrapper/ModalWrapper.tsx
import type { ReactElement } from 'react'
import React, { useState } from 'react'
import ModalContent from '~/components/molecules/ModalContent/ModalContent'
import Modal from '../../atoms/Modal/Modal'
import modal from './ModalWrapper.module.css'

interface ModalWrapperProps {
	title: string
	header?: ReactElement
	content: ReactElement
	footer?: ReactElement
	children: ReactElement
}

export enum CloseInterceptReason {
	None = 'None',
	UnsavedChanges = 'UnsavedChanges',
	ActivePopup = 'ActivePopup',
	RequestInProgress = 'RequestInProgress',
	AdditionalModalOpen = 'AdditionalModalOpen',
	AlertDialogOpen = 'AlertDialogOpen',
}

/**
 * ModalWrapper component displays a modal dialog with a title, content, and children.
 * It manages the state of the modal and provides functions to open and close it.
 */
const ModalWrapper: React.FC<ModalWrapperProps> = ({
	title,
	header,
	content,
	footer,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [popupWindow, setPopupWindow] = useState<Window | null>(null)

	/**
	 * Opens the modal dialog by setting the isOpen state to true.
	 */
	const openModal = () => setIsOpen(true)

	const [closeInterceptReason, setCloseInterceptReason] =
		useState<CloseInterceptReason>(CloseInterceptReason.None)

	const shouldClose = () => closeInterceptReason === CloseInterceptReason.None

	const handlePopupWindow = () => {
		if (popupWindow && !popupWindow.closed) {
			popupWindow.focus() // Focus the popup window if it's still open
			setCloseInterceptReason(CloseInterceptReason.ActivePopup)
			return true
		}
		return false
	}

	const closeModal = () => {
		if (!handlePopupWindow() && shouldClose()) {
			setIsOpen(false)
		}
		// TODO: Implement UI/UX enhancements for when the modal close attempt is intercepted
		// due to unsaved changes or an active popup window. Consider adding a confirmation
		// dialog or visual feedback to inform the user why the modal cannot be closed and
		// what actions they might need to take to securely close it.
		//
		// SEE: https://github.com/imperfectandcompany/imperfect-gamers-site/issues/54
	}

	return (
		<>
			{React.cloneElement(children, { onClick: openModal })}
			<Modal isOpen={isOpen} onClose={closeModal}>
				<ModalContent
					header={header}
					title={title}
					content={content}
					footer={footer}
					isOpen={isOpen}
					setCloseInterceptReason={setCloseInterceptReason}
					setPopupWindow={setPopupWindow}
				/>
				{/** Escape modal button **/}
				<div
					className={modal.close__button}
					role="button"
					tabIndex={0}
					onClick={closeModal}
					onKeyDown={e => {
						if (e.key === 'Enter' || e.key === ' ') {
							closeModal()
						}
					}}
				>
					&times;
				</div>
			</Modal>
		</>
	)
}

export default ModalWrapper
