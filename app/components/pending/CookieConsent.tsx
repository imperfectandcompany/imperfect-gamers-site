// CookieConsent.tsx

import { FunctionComponent, useState } from 'react'
import CookieConsentModal from './CookieConsentModal'
import './CookieConsent.css'

interface Settings {
  essential: boolean;
  analytics: {
    enabled: boolean;
    googleAnalytics: boolean;
    microsoftClarity: boolean;
  };
  marketing: boolean;
}


const CookieConsent: FunctionComponent = () => {
	const [isVisible, setIsVisible] = useState(true)
	const [activeModal, setActiveModal] = useState<string | null>(null)
  const [settings, setSettings] = useState<Settings>({
    essential: true,
    analytics: {
      enabled: false,
      googleAnalytics: false,
      microsoftClarity: false,
    },
    marketing: false,
  });
  

	const acceptCookies = () => {
		alert('Cookies accepted!')
		setIsVisible(false)
	}

	const openModal = (modalName: string) => {
		setActiveModal(modalName)
	}

	const closeModal = () => {
		setActiveModal(null)
	}

  const handleSettingChange = (setting: string, value: boolean, subSetting?: string) => {
    setSettings((prev) => {
      if (subSetting) {
        return {
          ...prev,
          [setting]: {
            ...(prev[setting as keyof typeof prev] as any),
            [subSetting]: value
          }
        };
      } else {
        return { ...prev, [setting]: value };
      }
    });
  };
  

  const SettingsPanel = () => (
    <div className="settings-panel">
        <div className="settings-option">
            <label htmlFor="essential">Essential Cookies (required for login sessions):</label>
            <div className="toggle-switch">
                <input type="checkbox" checked={settings.essential} disabled />
                <span className="slider"></span>
            </div>
        </div>
        <div className="settings-option">
            <label htmlFor="analytics">Analytics Cookies:</label>
            <div className="toggle-switch">
                <input type="checkbox" id="analytics" checked={settings.analytics.enabled} onChange={() => handleSettingChange('analytics', !settings.analytics.enabled, 'enabled')} />
                <span className="slider"></span>
            </div>
            <div className={`sub-settings ${settings.analytics.enabled ? "active" : ""}`}>
                <div className="settings-option">
                    <label htmlFor="googleAnalytics">Google Analytics (GA4):</label>
                    <div className="toggle-switch">
                        <input type="checkbox" id="googleAnalytics" checked={settings.analytics.googleAnalytics} onChange={() => handleSettingChange('analytics', !settings.analytics.googleAnalytics, 'googleAnalytics')} />
                        <span className="slider"></span>
                    </div>
                </div>
                <div className="settings-option">
                    <label htmlFor="microsoftClarity">Microsoft Clarity:</label>
                    <div className="toggle-switch">
                        <input type="checkbox" id="microsoftClarity" checked={settings.analytics.microsoftClarity} onChange={() => handleSettingChange('analytics', !settings.analytics.microsoftClarity, 'microsoftClarity')} />
                        <span className="slider"></span>
                    </div>
                </div>
            </div>
        </div>
        <div className="settings-option">
            <label htmlFor="marketing">Marketing Cookies:</label>
            <div className="toggle-switch">
                <input type="checkbox" id="marketing" checked={settings.marketing} onChange={() => handleSettingChange('marketing', !settings.marketing)} />
                <span className="slider"></span>
            </div>
        </div>
    </div>
  );
  

	const modalContents = {
		privacy:
			'This Privacy Policy outlines how we handle your personal information to protect your privacy. We collect personal data such as name, email, and contact details for communication purposes and to enhance our services. We ensure that your data is handled securely and in compliance with applicable laws.',
		cookie:
			'Our Cookie Policy explains the types of cookies we use and how they improve your experience on our website. Cookies help us understand user behavior, which enables us to improve our web services. You can manage cookie preferences through your browser settings.',
		settings:
			'In the settings panel, you can customize your preferences for how we use cookies on our site. You can choose to disable non-essential cookies, adjust notification settings, and more. Your settings will be saved and can be changed at any time.',
	}

	return (
		<>
			{isVisible && (
				<div className="cookie-popup glow-effect">
					<div>
						<strong>Imperfect Gamers - Committed to Your Privacy.</strong>
						<p>
							We use cookies and similar technologies to enhance your
							experience. Manage your preferences or withdraw your consent at
							any time. For more information, visit our "Settings" or view our
							data protection policies.
						</p>
						<div className="button-group">
                                    <button
                                        onClick={() => openModal('privacy')}
                                        disabled={activeModal === 'privacy'}
                                        className="text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-auto disabled:text-red-700 disabled:hover:disabled:text-red-700"
                                    >
                                        Privacy Policy
                                    </button>
							<button
								onClick={() => openModal('cookie')}
								disabled={activeModal === 'cookie'}
								className="text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-auto disabled:text-red-700 disabled:hover:disabled:text-red-700"
							>
								Cookie Policy
							</button>
							<button
								onClick={() => openModal('settings')}
								disabled={activeModal === 'settings'}
								className="text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-auto disabled:text-red-700 disabled:hover:disabled:text-red-700"
							>
								Settings
							</button>
						</div>
					</div>
					<div className="accept-button">
						<button
							className="cursor-pointer select-none justify-center border-transparent bg-gradient-to-r from-red-500 to-red-700 px-5 py-2 text-sm font-medium tracking-wide text-white opacity-100 shadow-none transition-opacity duration-300 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-white"
							onClick={acceptCookies}
						>
							Accept all
						</button>
					</div>
				</div>
			)}

			{activeModal && (
				<CookieConsentModal
					title={`${activeModal[0].toUpperCase() + activeModal.slice(1)} Policy`}
					onClose={closeModal}
					content={''}
				>
					{activeModal === 'settings' ? (
						<SettingsPanel />
					) : (
						<p>{`Read our ${activeModal} policy here. This policy provides detailed information about how we use cookies and how you can manage them.`}</p>
					)}
				</CookieConsentModal>
			)}
		</>
	)
}

export default CookieConsent
