// components/atoms/Modal/Modal.tsx

import React, { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null); // Create a ref for the modal content

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Call onClose if the click is outside the modal content
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeydown);
      document.addEventListener('mousedown', handleClickOutside); // Add click event listener
    } else {
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleClickOutside); // Remove click event listener
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
      <div ref={modalRef} className="bg-black/50 border-card rounded-lg shadow-lg p-5 w-full max-w-md mx-4 md:mx-0">
        {children}
      </div>
    </div>
  );
};

export default Modal;
