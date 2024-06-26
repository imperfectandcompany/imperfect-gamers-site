// components/organism/ModalWrapper/ModalWrapper.tsx
import type { ReactElement } from 'react'
import React, { useState, useEffect, useContext } from 'react'
import Modal from '~/components/atoms/Modal/Modal'
import ModalContent from '~/components/molecules/ModalContent/ModalContent'
import ModalPositionContext from '~/components/pending/ModalPositionContext'
import modal from './ModalWrapper.module.css'

interface ModalWrapperProps {
	title: string
	header?: ReactElement
	content: ReactElement
	footer?: ReactElement
	children: ReactElement
	onBack?: () => void
	backButtonTitle?: string
	align?: 'left' | 'center' | 'right'
	isResponsive?: boolean
	shouldOpen?: boolean // Control initial state from outside
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
 * ModalWrapper component displays a modal dialog with a title, content, and optional footer.
 * It manages the state of the modal and provides functions to open and close it, with support for handling
 * interceptions like unsaved changes or active popups.
 */
const ModalWrapper: React.FC<ModalWrapperProps> = ({
	children,
	header,
	title,
	content,
	footer,
	onBack,
	backButtonTitle,
	align,
	isResponsive = false,
	shouldOpen = false,
}: {
	children: React.ReactElement
	header?: React.ReactNode
	title: string
	content: React.ReactNode
	footer?: React.ReactNode
	onBack?: () => void
	backButtonTitle?: string
	align?: 'left' | 'center' | 'right'
	isResponsive?: boolean
	shouldOpen?: boolean // Control initial state from outside
}) => {
	const [isOpen, setIsOpen] = useState(shouldOpen)

	useEffect(() => {
		setIsOpen(shouldOpen)
	}, [shouldOpen])

	const [popupWindow, setPopupWindow] = useState<Window | null>(null)

	const { adjustModalPosition } = useContext(ModalPositionContext) // Use the context

	const [isShaking, setIsShaking] = useState(false)

	/**
	 * Opens the modal dialog by setting the isOpen state to true.
	 */
	const openModal = () => {
		setIsOpen(true)
		adjustModalPosition() // Adjust position when the modal is triggered
	}

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

	const [allowClose, setAllowClose] = useState(true)
	useEffect(() => {
		const handleConsentSettingsOpened = () => setAllowClose(false)
		const handleConsentSettingsClosed = () => setAllowClose(true)

		if (typeof window !== 'undefined') {
			window.addEventListener(
				'consentSettingsOpened',
				handleConsentSettingsOpened,
			)
			window.addEventListener(
				'consentSettingsClosed',
				handleConsentSettingsClosed,
			)
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener(
					'consentSettingsOpened',
					handleConsentSettingsOpened,
				)
				window.removeEventListener(
					'consentSettingsClosed',
					handleConsentSettingsClosed,
				)
			}
		}
	}, [])

	const [isFadingOut, setIsFadingOut] = useState(false)

	const closeModal = () => {
		if (!handlePopupWindow() && shouldClose()) {
			const consentModalOpen = localStorage.getItem('consentModalOpen')
			if (consentModalOpen !== 'true') {
				// Step 2: Start the fade-out animation
				setIsFadingOut(true)
				// Step 3: Wait for the animation to complete
				setTimeout(() => {
					setIsOpen(false)
					setIsFadingOut(false) // Reset the fade-out state for the next open-close cycle
				}, 500) // This duration should match our CSS animation duration
			}
		} else {
			setIsShaking(true)
			setTimeout(() => setIsShaking(false), 820) // Animation duration
		}
		// TODO: Implement UI/UX enhancements for when the modal close attempt is intercepted
		// due to unsaved changes or an active popup window. Consider adding a confirmation
		// dialog or visual feedback to inform the user why the modal cannot be closed and
		// what actions they might need to take to securely close it.
		//
		// SEE: https://github.com/imperfectandcompany/imperfect-gamers-site/issuefs/54
	}

	return (
		<>
			{React.cloneElement(children, { onClick: openModal })}
			{/**
			 * Modal component that displays a modal dialog.
			 *
			 * This component renders a modal overlay that can be toggled via the `isOpen` prop.
			 * It supports both fixed and responsive behaviors determined by the `isResponsive` prop.
			 * The modal can be closed by pressing the Escape key, clicking outside its bounds,
			 * or invoking the `onClose` function.
			 *
			 * @component
			 * @param {Object} props - The component props.
			 * @param {boolean} props.isOpen - Determines whether the modal is open or closed.
			 * @param {Function} props.onClose - The function to be called when the modal needs to be closed.
			 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
			 * @param {boolean} [props.isResponsive=false] - Enables responsive behavior, adjusting the modal size based on the viewport.
			 * @returns {JSX.Element} The rendered Modal component.
			 */}
			<Modal
				isOpen={isOpen}
				isResponsive={isResponsive}
				onClose={closeModal}
				isShaking={isShaking}
				isClosing={isFadingOut}
			>
				<ModalContent
					header={header}
					title={title}
					content={content}
					footer={footer}
					isOpen={isOpen}
					setCloseInterceptReason={setCloseInterceptReason}
					setPopupWindow={setPopupWindow}
					onBack={onBack}
					backButtonTitle={backButtonTitle}
					align={align}
				/>
			</Modal>
			{/** Escape modal button **/}
			{allowClose && isOpen ? (
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
			) : null}
		</>
	)
}

export default ModalWrapper
