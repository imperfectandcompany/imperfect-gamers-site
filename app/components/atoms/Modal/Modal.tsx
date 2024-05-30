import { useEffect, useRef } from 'react';

// Type definition for the props that the Modal component will accept
interface ModalProps {
  isOpen: boolean; // Indicates whether the modal is open
  onClose: () => void; // Function to call when the modal needs to be closed
  children: React.ReactNode; // Content to be rendered inside the modal
  isResponsive?: boolean; // Optional prop to enable responsive behavior
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
 * @param {ModalProps} props - The component props.
 * @returns {JSX.Element} The rendered Modal component.
 */ 
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, isResponsive = false }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const isConsentModalBackdropOpen = () => {
    return document.querySelector('.modal-backdrop') !== null;
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isConsentModalBackdropOpen()) {
        const consentModalOpen = localStorage.getItem('consentModalOpen');
        if (consentModalOpen !== 'true') {
          onClose();
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {

      if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node) && !isConsentModalBackdropOpen()) {
        const consentModalOpen = localStorage.getItem('consentModalOpen');
        if (consentModalOpen !== 'true') {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeydown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const modalClass = isResponsive
    ? 'mx-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl xl:rounded-lg border border-stone-800 bg-black p-5 shadow-lg md:shadow-xl md:mx-0'
    : 'mx-4 w-full max-w-md rounded-lg border border-stone-800 bg-black p-5 shadow-xl md:mx-0';

  return (
    <div
      className={`fixed inset-0 z-30 flex items-center justify-center overflow-auto bg-black/50 px-4 py-2 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div ref={modalRef} className={modalClass}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
