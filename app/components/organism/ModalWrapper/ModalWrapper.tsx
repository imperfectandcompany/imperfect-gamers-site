// components/organism/ModalWrapper/ModalWrapper.tsx
import React, { ReactElement, useState } from 'react';
import Modal from '../../atoms/Modal/Modal';
import ModalContent from '~/components/molecules/ModalContent/ModalContent';
import Button from '~/components/atoms/Button/Button';

interface ModalWrapperProps {
  title: string;
  content: ReactElement;
  children: ReactElement;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ title, content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {React.cloneElement(children, { onClick: openModal })}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalContent title={title} content={content} />
        <div className="mt-5 flex justify-end">
          <Button onClick={closeModal} variant="secondary">
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalWrapper;