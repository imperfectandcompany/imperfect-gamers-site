// components/organism/ModalWrapper/ModalWrapper.tsx
import React, {type ReactElement, useState} from 'react';
import Modal from '../../atoms/Modal/Modal';
import ModalContent from '~/components/molecules/ModalContent/ModalContent';
import Button from '~/components/atoms/Button/Button';
import modal from './ModalWrapper.module.css';

type ModalWrapperProps = {
	title: string;
	content: ReactElement;
	children: ReactElement;
};

/**
 * ModalWrapper component displays a modal dialog with a title, content, and children.
 * It manages the state of the modal and provides functions to open and close it.
 */
const ModalWrapper: React.FC<ModalWrapperProps> = ({
	title,
	content,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	/**
   * Opens the modal dialog by setting the isOpen state to true.
   */
	const openModal = () => {
		setIsOpen(true);
	};

	/**
   * Closes the modal dialog by setting the isOpen state to false.
   */
	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			{React.cloneElement(children, {onClick: openModal})}
			<Modal isOpen={isOpen} onClose={closeModal}>
				<ModalContent title={title} content={content} />
				<div className="mt-5 flex justify-end">
					<div className={modal.close__button} onClick={closeModal}>
            &times;
					</div>
				</div>
			</Modal>
		</>
	);
};

export default ModalWrapper;
