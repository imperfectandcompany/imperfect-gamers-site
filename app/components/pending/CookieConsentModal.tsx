import type { ReactNode } from 'react'
import type React from 'react'
import { useState, useRef, useEffect, useCallback } from 'react'

const focusableModalElements: string =
	'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

const trapFocus = (modalRef: React.RefObject<HTMLDivElement>): (() => void) => {
	const focusableElements = modalRef.current?.querySelectorAll(
		focusableModalElements,
	)
	const firstFocusableElement = focusableElements?.[0] as HTMLElement
	const lastFocusableElement = focusableElements?.[
		focusableElements.length - 1
	] as HTMLElement

	function handleFocus(event: KeyboardEvent) {
		if (event.shiftKey && document.activeElement === firstFocusableElement) {
			lastFocusableElement?.focus()
			event.preventDefault()
		} else if (
			!event.shiftKey &&
			document.activeElement === lastFocusableElement
		) {
			firstFocusableElement?.focus()
			event.preventDefault()
		}
	}

	firstFocusableElement?.focus()
	document.addEventListener('keydown', handleFocus)

	return () => {
		document.removeEventListener('keydown', handleFocus)
	}
}

interface ModalProps {
	title: string
	content: string
	onClose: () => void
	exposeCloseAnimationFunc: (func: () => void) => void
	children?: ReactNode
}

const CookieConsentModal: React.FC<ModalProps> = ({
	title,
	content,
	onClose,
	exposeCloseAnimationFunc,
	children,
}) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const [isExiting, setIsExiting] = useState(false) // State to control the exit animation

	const onCloseWithAnimation = useCallback(() => {
		// Animation and close logic
		setIsExiting(true) // For animation
		setTimeout(() => {
			onClose() // Actually close the modal
		}, 300) // Delay for animation
	}, [onClose]) // Ensure dependencies are stable and won't cause re-creation unless necessary

	useEffect(() => {
		const modalNode = modalRef.current // Capture the modal ref at the time of effect execution.

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onCloseWithAnimation()
			}
		}

		window.addEventListener('keydown', handleEscape)
		document.body.style.overflow = 'hidden'

		if (modalNode) {
			modalNode.style.transform = 'scale(1)'
			modalNode.style.opacity = '1'
			const focusCleanup = trapFocus(modalRef) // Ensure focus trapping setup can be cleanly removed.

			return () => {
				// Return a cleanup function to run when component unmounts or dependencies change.
				window.removeEventListener('keydown', handleEscape)
				document.body.style.overflow = ''
				modalNode.style.transform = 'scale(0.8)'
				modalNode.style.opacity = '0'
				focusCleanup() // Clean up focus trapping.
			}
		}
	}, [onClose, onCloseWithAnimation]) // Dependencies array includes only the necessary props/state.

	useEffect(() => {
		exposeCloseAnimationFunc(onCloseWithAnimation)
	}, [exposeCloseAnimationFunc])

	return (
		<div
			className="modal-backdrop z-40 opacity-100"
			onClick={e => {
				if (e.currentTarget === e.target) onCloseWithAnimation()
			}}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') {
					if (e.currentTarget === e.target) onCloseWithAnimation()
				}
			}}
			aria-hidden="true"
		>
			<div
				ref={modalRef}
				className={`modal-content mx-4 w-full max-w-md rounded-lg border border-stone-800 bg-black p-5 shadow-xl md:mx-0 ${isExiting ? 'modal-exiting' : ''}`}
			>
				<div className="modal-header">
					<h2 id="modalTitle" className="modal-title">
						{title}
					</h2>
					<button onClick={onCloseWithAnimation} className="close-button">
						<span aria-hidden="true">×</span>
						<span className="sr-only">Close</span>
					</button>
				</div>
				<div className="modal-body">{children || <p>{content}</p>}</div>
			</div>
		</div>
	)
}

export default CookieConsentModal
