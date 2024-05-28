import React, { useRef, useEffect, FunctionComponent, ReactNode } from 'react';

interface ModalProps {
    title: string;
    content: string;
    onClose: () => void;
    children?: ReactNode;
}

const CookieConsentModal: FunctionComponent<ModalProps> = ({ title, content, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

    const modalNode = modalRef.current;
    if (modalNode) {
        modalNode.style.transform = 'scale(1)';
        modalNode.style.opacity = '1';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = ''; // Re-enable scrolling when modal is closed
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
        <div
            className="modal-backdrop"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            style={{ opacity: 1, visibility: 'visible' }}
        >
            <div
                ref={modalRef}
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                role="document"
            >
                <div className="modal-header">
                    <h2 id="modalTitle" className="modal-title">{title}</h2>
                    <button onClick={onClose} className="close-button">
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                    </button>
                </div>
                <div className="modal-body">
                    {children || <p>{content}</p>}
                </div>
            </div>
        </div>
  );
};

export default CookieConsentModal;
