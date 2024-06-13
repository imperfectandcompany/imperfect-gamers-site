import { useContext, useEffect, useRef } from 'react'
import ModalPositionContext from '~/components/pending/ModalPositionContext'
import modal from './Modal.module.css'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	isResponsive?: boolean
	isShaking?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	isResponsive = false,
	isShaking = false,
}) => {
	const modalRef = useRef<HTMLDivElement>(null)

	const isCloseAllowed = (target: HTMLElement) => {
		// Add class names or IDs that should not trigger onClose
		const excludedClassesOrIds = [
			'cookie-popup',
			'button-group',
			'cookie-consent-modal-backdrop',
			'modal-content',
			'#settingsPanel',
			'#cookieBanner',
			'#cookieBanner-inner',
			'#cookieBanner-Header',
			'#cookieBanner-paragraph',
			'#cookie-banner-buttons',
			'#cookie-banner-privacy-button',
			'#cookie-banner-settings-button',
			'#cookie-banner-cookie-button',
			'#cookie-banner-accept-all',
			'#cookie-banner-accept-all-container',
			'cookie-consent-modal-backdrop',
		]

		return !excludedClassesOrIds.some(selector => {
			if (selector.startsWith('#')) {
				return target.id === selector.slice(1)
			}
			return target.classList.contains(selector)
		})
	}

	const { adjustModalPosition } = useContext(ModalPositionContext) // Use the context

	useEffect(() => {
		const observer = new MutationObserver(() => {
			adjustModalPosition()
		})

		if (modalRef.current) {
			observer.observe(modalRef.current, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true,
			})
		}

		return () => {
			observer.disconnect()
		}
	}, [adjustModalPosition])

	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (
				event.key === 'Escape' &&
				isOpen &&
				isCloseAllowed(event.target as HTMLElement)
			) {
				const consentModalOpen = localStorage.getItem('consentModalOpen')
				if (consentModalOpen !== 'true') {
					onClose()
				}
			}
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				isCloseAllowed(event.target as HTMLElement)
			) {
				const consentModalOpen = localStorage.getItem('consentModalOpen')
				if (consentModalOpen !== 'true') {
					onClose()
				}
			}
		}

		if (isOpen) {
			window.addEventListener('keydown', handleKeydown)
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			window.removeEventListener('keydown', handleKeydown)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, onClose])

	const modalClass = isResponsive
		? 'mx-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl xl:rounded-lg border border-stone-800 bg-black p-5 shadow-lg md:shadow-xl md:mx-0'
		: 'mx-4 w-full max-w-md rounded-lg border border-stone-800 bg-black p-5 shadow-xl md:mx-0'

	return (
		<div
			id="modal"
			className={`fixed inset-0 z-30 flex items-center justify-center overflow-auto bg-black/50 px-4 py-2
			 ${isShaking ? modal.shake__animation : ' '}
				${
				isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
			}`}
		>
			<div ref={modalRef} className={modalClass}>
				{children}
			</div>
		</div>
	)
}

export default Modal
