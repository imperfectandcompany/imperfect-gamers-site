// CookieConsent.tsx

import { FunctionComponent, MouseEvent, useEffect, useState } from 'react'

import './CookieConsent.css'
import CookieConsentModal from './CookieConsentModal'

interface Settings {
	essential: boolean
	analytics: AnalyticsSettings
	marketing: boolean
}

interface AnalyticsSettings {
	enabled: boolean
	googleAnalytics: boolean
	microsoftClarity: boolean
}

const CookieConsent: FunctionComponent = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [activeModal, setActiveModal] = useState<string | null>(null)
	const [settings, setSettings] = useState<Settings>({
		essential: true,
		analytics: {
			enabled: false,
			googleAnalytics: false,
			microsoftClarity: false,
		},
		marketing: false,
	})





	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 2000) // Delay the banner display by 2000 milliseconds

		return () => clearTimeout(timer)
	}, [])

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

	// Handle top-level settings like 'marketing'
	const handleSettingChange = (setting: string, value: boolean) => {
		setSettings(prev => ({
			...prev,
			[setting]: value,
		}))
	}

  const [isAnimating, setIsAnimating] = useState(false); // Animation tracking

	// Function to toggle the setting when the container is clicked
	const toggleSettingFromContainer = (
		category: keyof Settings,
		subSetting: keyof AnalyticsSettings,
	) => {
		setSettings(prev => ({
			...prev,
			[category]: {
				...(prev[category] as AnalyticsSettings),
				...(prev.analytics.enabled && {
					[subSetting]: !(prev[category] as AnalyticsSettings)[subSetting],
				}),
			},
		}))
	}

	// Marketing cookies container toggle function
	const toggleMarketingFromContainer = () => {
		setSettings(prev => ({
			...prev,
			marketing: !prev.marketing,
		}))
	}

	const handleAnalyticsContainerClick = () => {
		handleAnalyticsToggle(!settings.analytics.enabled)
	}

	const handleAnalyticsToggle = (enabled: boolean) => {
		setSettings(prev => ({
			...prev,
			analytics: {
				enabled,
				googleAnalytics: enabled ? prev.analytics.googleAnalytics : false,
				microsoftClarity: enabled ? prev.analytics.microsoftClarity : false,
			},
		}))
	}

	const SettingsPanel = () => (
		<div className="settings-panel">
<div className="settings-option text-red-500/50"
     onClick={(e) => e.stopPropagation()} // Prevent any changes
>
    <label htmlFor="essential" className="select-none">
        Essential (required for login sessions):
    </label>
    <div className="toggle-switch">
        <input type="checkbox" checked={true} disabled />
        <span className="slider"></span>
    </div>
</div>
			<div
				className="settings-option"
				onClick={e => {
					e.stopPropagation() // Prevent this click from bubbling up to the container
					handleAnalyticsContainerClick()
				}}
			>
				<label htmlFor="analytics" className="select-none">
					Analytics:
				</label>
				<div className="toggle-switch ml-2 md:ml-0">
					<input
						type="checkbox"
						id="analytics"
						checked={settings.analytics.enabled}
						onClick={e => {
							e.stopPropagation() // Prevent this click from bubbling up to the container
							handleAnalyticsToggle(!settings.analytics.enabled)
						}}
					/>
					<span
						className="slider"
						onClick={e => {
							e.stopPropagation() // Prevent this click from bubbling up to the container
							handleAnalyticsToggle(!settings.analytics.enabled)
						}}
					></span>
				</div>
				<div
					className={`sub-settings ${settings.analytics.enabled ? 'active' : ''}`}
					onClick={e => e.stopPropagation()}
				>
					{' '}
					{/* Stop propagation to prevent toggling when nested options are clicked */}
					<div
						className={`settings-option mb-2 ${!settings.analytics.enabled ? 'disabled' : ''}`}
						onClick={() =>
							toggleSettingFromContainer('analytics', 'googleAnalytics')
						}
					>
						<label htmlFor="googleAnalytics" className="select-none">
							Google Analytics:
						</label>
						<div className="toggle-switch ml-2" onClick={e => e.stopPropagation()}>
							<input
								type="checkbox"
								id="googleAnalytics"
								disabled={!settings.analytics.enabled}
								checked={settings.analytics.googleAnalytics}
								onChange={e => {
									e.stopPropagation() // Stop propagation to prevent triggering the container click
									if (settings.analytics.enabled) {
										toggleSettingFromContainer('analytics', 'googleAnalytics')
									}
								}}
							/>
							<span className="slider"></span>
						</div>
					</div>
					<div
						className={`settings-option ${!settings.analytics.enabled ? 'disabled' : ''}`}
						onClick={() =>
							toggleSettingFromContainer('analytics', 'microsoftClarity')
						}
					>
						<label htmlFor="microsoftClarity" className="select-none">
							Microsoft Clarity:
						</label>
						<div className="toggle-switch ml-2" onClick={e => e.stopPropagation()}>
							<input
								type="checkbox"
								id="microsoftClarity"
								disabled={!settings.analytics.enabled}
								checked={settings.analytics.microsoftClarity}
								onChange={e => {
									e.stopPropagation() // Stop propagation to prevent triggering the container click
									if (settings.analytics.enabled) {
										toggleSettingFromContainer('analytics', 'microsoftClarity')
									}
								}}
							/>
							<span className="slider"></span>
						</div>
					</div>
				</div>
			</div>
			<div className="settings-option" onClick={toggleMarketingFromContainer}>
				<label htmlFor="marketing">Marketing:</label>
				<div className="toggle-switch" onClick={e => e.stopPropagation()}>
					<input
						type="checkbox"
						id="marketing"
						checked={settings.marketing}
						onChange={e => {
							e.stopPropagation() // Prevent this click from triggering the container's onClick
							handleSettingChange('marketing', !settings.marketing)
						}}
					/>
					<span className="slider"></span>
				</div>
			</div>
		</div>
	)

	return (
		<>
			{isVisible && (
				<div
					className="cookie-popup z-30"
					style={{
						visibility: 'visible',
						animation:
							'slideUp 0.5s ease-out forwards, glow 1.5s ease-in-out infinite alternate',
					}}
				>
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
