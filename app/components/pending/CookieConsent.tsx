// CookieConsent.tsx

import { FunctionComponent, useState } from 'react';
import CookieConsentModal from './CookieConsentModal';
import './CookieConsent.css';

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
      {isVisible && (
        <div className="cookie-popup">
          <div>
            <strong>Imperfect Gamers - Committed to Your Privacy.</strong>
            <p>We use cookies and similar technologies to enhance your experience. Manage your preferences or withdraw your consent at any time. For more information, visit our "Settings" or view our data protection policies.</p>
            <div className="button-group">
              <button onClick={() => openModal('privacy')} disabled={activeModal === 'privacy'} className="focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-auto disabled:text-red-700 disabled:hover:disabled:text-red-700">Privacy Policy</button>
              <button onClick={() => openModal('cookiePolicy')} disabled={activeModal === 'cookiePolicy'} className="focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-auto disabled:text-red-700 disabled:hover:disabled:text-red-700">Cookie Policy</button>
              <button onClick={() => openModal('settings')} disabled={activeModal === 'settings'} className="focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-auto disabled:text-red-700 disabled:hover:disabled:text-red-700">Settings</button>
            </div>
          </div>
          <div className="acceton text-white mx-auto py-2 px-5 tracking-wide bg-gradient-to-r from-red-500 to-red-700 hover:bg-gradient-to-l opacity-100 cursor-pointer shadow-none justify-center border-transparent text-sm font-medium transition-opacity duration-300 focus:outline-none select-none focus:ring-2 focus:ring-white">
            <button onClick={acceptCookies}>Accept all</button>
          </div>
        </div>
      )}

      {activeModal && (
        <CookieConsentModal
          title={`${activeModal[0].toUpperCase() + activeModal.slice(1)} Policy`}
          content={`Read our ${activeModal} policy here. This policy provides detailed information about how we use cookies and how you can manage them.`}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default CookieConsent;
