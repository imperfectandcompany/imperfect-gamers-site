// components/atoms/Modal/Modal.tsx

import React, {type ReactNode, useEffect, useRef} from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

/**
 * Modal component that displays a modal dialog.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines whether the modal is open or closed.
 * @param {Function} props.onClose - The function to be called when the modal is closed.
 * @param {ReactNode} props.children - The content to be displayed inside the modal.
 * @returns {JSX.Element} The rendered Modal component.
 */
const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
	// Create a ref for the modal content
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		/**
     * Handles the keydown event and closes the modal if the Escape key is pressed.
     *
     * @param {KeyboardEvent} event - The keydown event object.
     */
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

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
				onClose();
			}
		};

		if (isOpen) {
			window.addEventListener('keydown', handleKeydown);
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			window.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			window.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	return (
		<div
			className={`fixed text-white/95 inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center ${
				isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			{/* Use the ref here */}
			<div
				ref={modalRef}
				className="bg-black/50 border-card rounded-lg shadow-lg p-5 w-full max-w-md mx-4 md:mx-0"
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
