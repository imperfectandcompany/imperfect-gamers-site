// CookieConsentModal.tsx
import { useRef, useEffect, FunctionComponent } from 'react';

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const CookieConsentModal: FunctionComponent<ModalProps> = ({ title, content, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.style.transform = 'scale(1)';
        modalRef.current.style.opacity = '1';
        modalRef.current.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      }
    }, 10);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div ref={modalRef} className="modal-content" onClick={e => e.stopPropagation()} role="document">
        <div className="modal-header">
          <h2 id="modalTitle">{title}</h2>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentModal;
