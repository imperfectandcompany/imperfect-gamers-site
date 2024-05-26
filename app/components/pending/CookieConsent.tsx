// Import React and other necessary types
import { useRef, useState, useEffect, FunctionComponent } from 'react';

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}


interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ title, content, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);

    if (modalRef.current) {
      modalRef.current.style.transform = 'scale(0.9)';
      modalRef.current.style.opacity = '0';
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.transform = 'scale(1)';
          modalRef.current.style.opacity = '1';
          modalRef.current.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        }
      }, 10);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed text-black/80 inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div ref={modalRef} className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full" onClick={(e) => e.stopPropagation()} role="document">
        <div className="flex justify-between items-center">
          <h2 id="modalTitle" className="text-2xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800" aria-label="Close modal">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="mt-4">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

const CookieConsent: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const acceptCookies = () => {
    alert('Cookies accepted!');
    setIsVisible(false);
  };

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
            <style>{`
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: black;
                    color: white;
                    margin: 0;
                    padding: 0;
                }
                .cookie-popup {
                    width: 100%;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    background: rgba(10, 10, 10, 0.9);
                    border-top: 2px solid #a83232;
                    z-index: 1000;
                }
                .text-sm {
                    font-size: 14px;
                    line-height: 1.6;
                }
                strong {
                    font-size: 16px;
                    font-weight: bold;
                }
                .footer {
                    padding: 20px;
                    text-align: center;
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    background-color: #222;
                    display: none;
                }
                .footer a, .cookie-popup a {
                    color: #ff6347;
                    text-decoration: none;
                    transition: color 0.3s ease-in-out;
                }
                .cookie-popup a:hover {
                    color: #ffffff;
                }
                button:focus {
                    outline: 2px solid #ff6347; /* High contrast outline for focus */
                }
            `}</style>
      {isVisible && (
        <div className="cookie-popup cookie-consent fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white shadow-md z-50" role="alert">
          <div className="text-sm">
            <strong>Imperfect Gamers - Committed to Your Privacy.</strong>
            <p>We use cookies and similar technologies to enhance your experience. Manage your preferences or withdraw your consent at any time. For more information, visit our "Settings" or view our data protection policies.</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => openModal('privacy')} className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" role="button" tabIndex={0} disabled={activeModal === 'privacy'}>Privacy Policy</button>
              <button onClick={() => openModal('cookiePolicy')} className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" role="button" tabIndex={0} disabled={activeModal === 'cookiePolicy'}>Cookie Policy</button>
              <button onClick={() => openModal('settings')} className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" role="button" tabIndex={0} disabled={activeModal === 'settings'}>Settings</button>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button className="text-white py-2 px-5 tracking-wide bg-gradient-to-r from-red-500 to-red-700 hover:bg-gradient-to-l opacity-100 cursor-pointer shadow-none justify-center border-transparent text-sm font-medium transition-opacity duration-300 focus:outline-none select-none focus:ring-2 focus:ring-white" onClick={acceptCookies} role="button" tabIndex={0}>Accept all</button>
          </div>
        </div>
      )}

      {activeModal && (
        <Modal
          title={`${activeModal[0].toUpperCase() + activeModal.slice(1)} Policy`}
          content={`Read our ${activeModal} policy here. This policy provides detailed information about how we use cookies and how you can manage them.`}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default CookieConsent;
