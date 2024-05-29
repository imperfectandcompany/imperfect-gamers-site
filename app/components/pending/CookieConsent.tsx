// CookieConsent.tsx

import {
	FunctionComponent,
	MouseEvent,
	useCallback,
	useEffect,
	useState,
} from 'react'

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

enum ModalNames {
	Privacy = 'privacy',
	Cookie = 'cookie',
	Settings = 'settings',
}

const CookieConsent: FunctionComponent = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [isExiting, setIsExiting] = useState(false);
	const [activeModal, setActiveModal] = useState<ModalNames | null>(null)
	const [settings, setSettings] = useState<Settings>({
		essential: true,
		analytics: {
			enabled: false,
			googleAnalytics: false,
			microsoftClarity: false,
		},
		marketing: false,
	})

	const defaultSettings: Settings = {
		essential: true,
		analytics: {
			enabled: false,
			googleAnalytics: false,
			microsoftClarity: false,
		},
		marketing: false,
	}

	const [closeModalWithAnimation, setCloseModalWithAnimation] = useState<
		(() => void) | null
	>(null)

	const handleExposeCloseFunc = useCallback((func: () => void) => {
		setCloseModalWithAnimation(() => func);
	  }, []); // Empty dependency array assuming no props or state needed

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 2000) // Delay the banner display by 2000 milliseconds

		return () => clearTimeout(timer)
	}, [])

    const startExitAnimation = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false); // Reset exiting state
        }, 500); // Duration of the animation
    };

	const settingsAreEqual = (
		settings1: Settings,
		settings2: Settings,
	): boolean => {
		return JSON.stringify(settings1) === JSON.stringify(settings2)
	}
	const [isSaveDisabled, setIsSaveDisabled] = useState(true)
	const [isResetDisabled, setIsResetDisabled] = useState(true)

	useEffect(() => {
		const storedSettings = localStorage.getItem('cookieSettings')
		const currentSettings = settings

		const initialSettings = storedSettings
			? JSON.parse(storedSettings)
			: defaultSettings
		setIsResetDisabled(settingsAreEqual(settings, initialSettings))

		if (storedSettings) {
			const savedSettings: Settings = JSON.parse(storedSettings)
			setIsSaveDisabled(settingsAreEqual(currentSettings, savedSettings))
		} else {
			setIsSaveDisabled(false) // Enable save if no settings are stored yet
		}
	}, [settings])

	const acceptCookies = () => {
		localStorage.setItem('cookieSettings', JSON.stringify(settings))
		setIsSaveDisabled(true) // Enable save if no settings are stored yet
		setIsResetDisabled(true) // Enable save if no settings are stored yet
		if (activeModal) {
			// If modal is open...
			if (closeModalWithAnimation) closeModalWithAnimation() // Execute the function
		}
		if(settings.analytics.enabled && settings.analytics.microsoftClarity) {
			window.dispatchEvent(new Event("consentGranted"));
		}
		startExitAnimation(); // Start animation when accepting all cookies
	}
	const acceptAllCookies = () => {
		const allEnabledSettings = {
			essential: true, // Essential cookies are always enabled
			analytics: {
				enabled: true,
				googleAnalytics: true,
				microsoftClarity: true,
			},
			marketing: true,
		}
		setSettings(allEnabledSettings)
		localStorage.setItem('cookieSettings', JSON.stringify(allEnabledSettings))
		startExitAnimation(); // Start animation when accepting all cookies
		if (activeModal) {
			// If modal is open...
			if (closeModalWithAnimation) closeModalWithAnimation() // Execute the function
		}
	}

	const resetSettings = () => {
		const storedSettings = localStorage.getItem('cookieSettings')
		const currentSettings = settings
		let newSettings = defaultSettings // Default to initial settings

		if (storedSettings) {
			newSettings = JSON.parse(storedSettings) // Get stored settings if they exist
		}

		// Check if current settings are already the same as the target reset settings
		if (settingsAreEqual(currentSettings, newSettings)) {
			return // Exit function if no changes need to be made
		}

		// Apply the new settings and update the state
		setSettings(newSettings)
		setIsSaveDisabled(true) // Disable the save button since settings are now reverted to stored/default
	}

	useEffect(() => {
		const storedSettings = localStorage.getItem('cookieSettings')
		if (storedSettings) {
			const savedSettings: Settings = JSON.parse(storedSettings)
			setSettings(savedSettings)
			setIsSaveDisabled(true) // Assume no change upon initial load
			setIsResetDisabled(
				settingsAreEqual(
					settings,
					storedSettings ? savedSettings : defaultSettings,
				),
			)
		}
		// Initial check for reset disable
	}, [])

	const openModal = (modalName: ModalNames): void => {
		setActiveModal(modalName)
	}

	const closeModal = () => {
		if (activeModal) {
			// Check if there's an active modal to close
			setActiveModal(null)
		}
	}

	// Handle top-level settings like 'marketing'
	const handleSettingChange = (setting: string, value: boolean) => {
		setSettings(prev => ({
			...prev,
			[setting]: value,
		}))
	}

	// Function to toggle the setting when the container is clicked
	const toggleSettingFromContainer = (
		category: keyof Settings,
		subSetting: keyof AnalyticsSettings,
	) => {
		setSettings(prev => {
			// Toggle the specific sub-setting
			const newSubSettings = {
				...(prev[category] as AnalyticsSettings),
				[subSetting]: !(prev[category] as AnalyticsSettings)[subSetting],
			}

			// Check if both sub-settings are false, then disable analytics entirely
			const shouldDisableAnalytics =
				!newSubSettings.googleAnalytics && !newSubSettings.microsoftClarity

			return {
				...prev,
				[category]: {
					...newSubSettings,
					enabled: shouldDisableAnalytics ? false : prev.analytics.enabled,
				},
			}
		})
	}

	// Marketing cookies container toggle function
	const toggleMarketingFromContainer = () => {
		setSettings(prev => ({
			...prev,
			marketing: !prev.marketing,
		}))
	}

	const handleAnalyticsContainerClick = (
		e: MouseEvent<HTMLDivElement>,
	): void => {
		e.stopPropagation()
		handleAnalyticsToggle(!settings.analytics.enabled)
	}

	const handleAnalyticsToggle = (enabled: boolean) => {
		setSettings(prev => ({
			...prev,
			analytics: {
				enabled,
				googleAnalytics: enabled, // Automatically set based on analytics toggle
				microsoftClarity: enabled, // Automatically set based on analytics toggle
			},
		}))
	}

	const SettingsPanel = () => (
		<>
			<div className="settings-panel" id="settingsPanel">
				<div
					className="settings-option font-semibold"
					onClick={e => e.stopPropagation()} // Prevent any changes
				>
					<label htmlFor="essential" className="select-none">
						Essential (required for login):
					</label>
					<div className="toggle-switch">
						<input type="checkbox" checked={true} disabled />
						<span className="slider"></span>
					</div>
				</div>
				<div
					className="settings-option"
					onClick={e => {
						handleAnalyticsContainerClick(e)
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
							<label
								id="googleAnalyticsLabel"
								htmlFor="googleAnalytics"
								className="select-none"
							>
								Google Analytics:
							</label>
							<div
								className="toggle-switch ml-2"
								onClick={e => e.stopPropagation()}
							>
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
									aria-labelledby="googleAnalyticsLabel"
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
							<div
								className="toggle-switch ml-2"
								onClick={e => e.stopPropagation()}
							>
								<input
									type="checkbox"
									id="microsoftClarity"
									disabled={!settings.analytics.enabled}
									checked={settings.analytics.microsoftClarity}
									onChange={e => {
										e.stopPropagation() // Stop propagation to prevent triggering the container click
										if (settings.analytics.enabled) {
											toggleSettingFromContainer(
												'analytics',
												'microsoftClarity',
											)
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
			<div className="mb-2 mt-6 flex justify-between">
				<button
					className="cursor-pointer select-none justify-center rounded-md border-transparent bg-gradient-to-r from-stone-500 to-stone-700 px-5 py-2 text-sm font-medium tracking-wide text-white opacity-100 shadow-none transition-all duration-300 hover:bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
					onClick={resetSettings}
					disabled={isResetDisabled}
				>
					Reset Settings
				</button>

				<button
					disabled={isSaveDisabled}
					className="cursor-pointer select-none justify-center rounded-md border-transparent bg-gradient-to-r from-red-500 to-red-700 px-5 py-2 text-sm font-medium tracking-wide text-white opacity-100 shadow-none transition-all duration-300 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
					onClick={acceptCookies}
				>
					{isSaveDisabled ? 'Settings Saved' : 'Save Settings'}
				</button>
			</div>
		</>
	)

	return (
		<>
			{isVisible && (
                <div className={`cookie-popup z-30 ${isExiting ? 'exiting' : ''}`}
					id="cookieBanner"
					style={{
						visibility: isVisible ? 'visible' : 'hidden',
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
								onClick={() => openModal(ModalNames.Privacy)}
								disabled={activeModal === 'privacy'}
								className="text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-auto disabled:text-red-700 disabled:hover:disabled:text-red-700"
							>
								Privacy Policy
							</button>
							<button
								onClick={() => openModal(ModalNames.Cookie)}
								disabled={activeModal === 'cookie'}
								className="text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-auto disabled:text-red-700 disabled:hover:disabled:text-red-700"
							>
								Cookie Policy
							</button>
							<button
								onClick={() => openModal(ModalNames.Settings)}
								disabled={activeModal === 'settings'}
								className="text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-auto disabled:text-red-700 disabled:hover:disabled:text-red-700"
							>
								Settings
							</button>
						</div>
					</div>
					<div
						className={`accept-button ${activeModal === 'settings' ? 'hidden' : ''}`}
					>
						<button
							className="cursor-pointer select-none justify-center border-transparent bg-gradient-to-r from-red-500 to-red-700 px-5 py-2 text-sm font-medium tracking-wide text-white opacity-100 shadow-none transition-opacity duration-300 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-white"
							onClick={acceptAllCookies}
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
					exposeCloseAnimationFunc={handleExposeCloseFunc}
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
