// components/atoms/Modal/Modal.tsx

import { useEffect, useRef } from 'react'

// Type definition for the props that the Modal component will accept
type ModalProps = {
	isOpen: boolean // Indicates whether the modal is open
	onClose: () => void // Function to call when the modal needs to be closed
	children: React.ReactNode // Content to be rendered inside the modal
	isResponsive?: boolean // Optional prop to enable responsive behavior
}

/**
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
 */
const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	isResponsive = false,
}) => {
	// Reference to the modal element used for detecting clicks outside
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		/**
		 * Handles the keydown event and closes the modal if the Escape key is pressed.
		 *
		 * @param {KeyboardEvent} event - The keydown event object.
		 */
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		/**
		 * Handles the mousedown event and closes the modal if the click is outside the modal content.
		 *
		 * @param {MouseEvent} event - The mousedown event object.
		 */
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose()
			}
		}

		// Event listeners are added when the modal is open
		if (isOpen) {
			window.addEventListener('keydown', handleKeydown)
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			// Remove event listeners when the modal is not open
			window.removeEventListener('keydown', handleKeydown)
			document.removeEventListener('mousedown', handleClickOutside)
		}

		// Cleanup function to remove event listeners
		return () => {
			window.removeEventListener('keydown', handleKeydown)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, onClose]) // Dependencies for the effect

	// Conditional class assignment based on the isResponsive prop
	const modalClass = isResponsive
		? 'mx-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:rounded-lg border border-stone-800 bg-black p-5 shadow-lg md:shadow-xl md:mx-0'
		: 'mx-4 w-full max-w-md rounded-lg border border-stone-800 bg-black p-5 shadow-xl md:mx-0'

	// Render the modal with dynamic class names and visibility
	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 px-4 py-2 ${
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
