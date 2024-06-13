// CookieConsent.tsx

import type { FunctionComponent, MouseEvent, KeyboardEvent, FC } from 'react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import './CookieConsent.css'
import CookieConsentModal from './CookieConsentModal'
import ModalPositionContext from './ModalPositionContext'

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
	const [isExiting, setIsExiting] = useState(false)
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
		setCloseModalWithAnimation(() => func)
	}, []) // Empty dependency array assuming no props or state needed

	useEffect(() => {
		const storedSettings = localStorage.getItem('cookieSettings')
		if (!storedSettings) {
			const timer = setTimeout(() => {
				setIsVisible(true)
			}, 2500) // Delay the banner display by 2000 milliseconds

			return () => clearTimeout(timer)
		}
	}, [])

	const startExitAnimation = () => {
		setIsExiting(true)
		setTimeout(() => {
			setIsVisible(false)
			setIsExiting(false) // Reset exiting state
		}, 500) // Duration of the animation
	}

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
		if (settings.analytics.enabled && settings.analytics.microsoftClarity) {
			window.dispatchEvent(new Event('consentGranted'))
		}
		startExitAnimation() // Start animation when accepting all cookies
		adjustModalPosition() // Adjust position for main modal when cookie-banner is triggered
	}

	const { adjustModalPosition } = useContext(ModalPositionContext) // Use the context

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
		startExitAnimation() // Start animation when accepting all cookies
		if (activeModal) {
			// If modal is open...
			if (closeModalWithAnimation) closeModalWithAnimation() // Execute the function
		}
		adjustModalPosition() // Adjust position for main modal when cookie-banner is closing.
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
		localStorage.setItem('consentModalOpen', 'true')
		window.dispatchEvent(new Event('consentSettingsOpened'))
		setActiveModal(modalName)
	}

	const closeModal = () => {
		if (activeModal) {
			localStorage.setItem('consentModalOpen', 'false')
			window.dispatchEvent(new Event('consentSettingsClosed'))
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
		e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
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

	interface AccordionItemProps {
		title: string
		children: React.ReactNode
		isOpen: boolean
		onClick: () => void
	}

	const AccordionItem: FC<AccordionItemProps> = ({
		title,
		children,
		isOpen,
		onClick,
	}) => {
		const contentRef = useRef<HTMLDivElement>(null)
		const ref = useRef<HTMLDivElement>(null)

		useEffect(() => {
			if (contentRef.current) {
				if (isOpen) {
					// Immediately apply the scrollHeight as max-height when opening
					contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`
				} else {
					// Use the scrollHeight to transition to '0' smoothly
					contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`
					// Timeout to allow browser to get the actual height before transitioning to 0
					setTimeout(() => {
						if (contentRef.current) {
							contentRef.current.style.maxHeight = '0'
						}
					}, 10)
				}
			}
		}, [isOpen])

		useEffect(() => {
			if (isOpen && ref.current) {
				setTimeout(() => {
					// Ensure scrollIntoView is called after the transition for opening has likely ended
					ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
				}, 500) // This timeout should be adjusted based on the duration of your CSS transition
			}
		}, [isOpen])

		return (
			<div ref={ref}>
				<button
					className={`accordion ${isOpen ? 'active' : ''}`}
					onClick={onClick}
				>
					{title}
				</button>
				<div ref={contentRef} className={`panel ${isOpen ? 'open' : ''}`}>
					{children}
				</div>
			</div>
		)
	}

	const [openCookieIndex, setOpenCookieIndex] = useState<number | null>(null)
	const [openPrivacyIndex, setPrivacyIndex] = useState<number | null>(null)

	const cookieSections = [
		{
			title: 'Cookie Usage Details',
			content: (
				<>
					<p>
						The functionalities for which we use these technologies may include,
						but are not limited to, the following:
					</p>
					<ul>
						<li>Understanding how you navigate through our website</li>
						<li>Personalizing your experience on our site</li>
						<li>
							Providing you with customized content or offers on our site or
							within our advertising
						</li>
						<li>Optimizing your user experience on our site</li>
					</ul>
				</>
			),
		},
		{
			title: 'Our Cookie Policy',
			content: (
				<>
					<p>
						In the context of this policy, &apos;we&apos;, &apos;our&apos;, and
						&apos;us&apos; refers to store.imperfectgamers.org and
						&apos;you&apos; refers to you, as the user of this website.
					</p>
					<p>
						By using store.imperfectgamers.org, you accept our use of cookies in
						accordance with this Cookie Policy. If you do not accept the use of
						cookies, please disable them as instructed in this Cookie Policy, so
						they are not downloaded to your device when you use our website.
					</p>
					<p>
						We reserve the right to modify this Cookie Policy at any time. Any
						changes will be effective immediately upon posting to the website,
						so please review it frequently.
					</p>
				</>
			),
		},
		{
			title: 'How We Use Cookies',
			content: (
				<p>
					At Imperfect Gamers, we use cookies for various purposes to enhance
					your browsing experience and provide personalized services.
				</p>
			),
		},
		{
			title: 'Types of Cookies We Use',
			content: (
				<ol>
					<li>
						<strong>Analytics Cookies:</strong> These cookies allow us to gather
						information about how our website is used, including the number of
						visitors, the pages visited, and the time spent on each page.
					</li>
					<li>
						<strong>Login Cookies:</strong> Login cookies are used to remember
						your preferences and enable you to log in to our website more
						efficiently.
					</li>
					<li>
						<strong>Preference Cookies:</strong> Preference cookies are used to
						remember your preferences and settings on our website.
					</li>
				</ol>
			),
		},
		{
			title: 'Third-Party Cookies',
			content: (
				<p>
					In addition to our own cookies, we also employ certain third-party
					cookies to enhance our website&apos;s functionality and provide a
					better user experience.
				</p>
			),
		},
	]

	const privacyPolicySections = [
		{
			title: 'Privacy Policy Overview',
			content: (
				<>
					<p>Last updated: June 12, 2024</p>
					<p>
						This Privacy Policy describes Our policies and procedures on the
						collection, use, and disclosure of Your information when You use the
						Service and tells You about Your privacy rights and how the law
						protects You.
					</p>
					<p>
						We use Your Personal data to provide and improve the Service. By
						using the Service, You agree to the collection and use of
						information in accordance with this Privacy Policy.
					</p>
				</>
			),
		},
		{
			title: 'Interpretation and Definitions',
			content: (
				<>
					<h3>Interpretation</h3>
					<p>
						The words of which the initial letter is capitalized have meanings
						defined under the following conditions. The following definitions
						shall have the same meaning regardless of whether they appear in
						singular or in plural.
					</p>
					<h3>Definitions</h3>
					<p>For the purposes of this Privacy Policy:</p>
					<ul>
						<li>
							<p>
								<strong>Account</strong> means a unique account created for You
								to access our Service or parts of our Service.
							</p>
						</li>
						<li>
							<p>
								<strong>Affiliate</strong> means an entity that controls, is
								controlled by or is under common control with a party, where
								&quot;control&quot; means ownership of 50% or more of the
								shares, equity interest or other securities entitled to vote for
								election of directors or other managing authority.
							</p>
						</li>
						<li>
							<p>
								<strong>Company</strong> (referred to as either &quot;the
								Company&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Imperfect
								Gamers&quot; or &quot;Our&quot; in this Agreement) refers to
								Imperfect and Company LLC, 6633 18 Mile Road, MI 48314.
							</p>
						</li>
						<li>
							<p>
								<strong>Cookies</strong> are small files that are placed on Your
								computer, mobile device or any other device by a website,
								containing the details of Your browsing history on that website
								among its many uses.
							</p>
						</li>
						<li>
							<p>
								<strong>Country</strong> refers to: Michigan, United States
							</p>
						</li>
						<li>
							<p>
								<strong>Device</strong> means any device that can access the
								Service such as a computer, a cellphone or a digital tablet.
							</p>
						</li>
						<li>
							<p>
								<strong>Personal Data</strong> is any information that relates
								to an identified or identifiable individual.
							</p>
						</li>
						<li>
							<p>
								<strong>Service</strong> refers to the Website.
							</p>
						</li>
						<li>
							<p>
								<strong>Service Provider</strong> means any natural or legal
								person who processes the data on behalf of the Company. It
								refers to third-party companies or individuals employed by the
								Company to facilitate the Service, to provide the Service on
								behalf of the Company, to perform services related to the
								Service or to assist the Company in analyzing how the Service is
								used.
							</p>
						</li>
						<li>
							<p>
								<strong>Third-party Social Media Service</strong> refers to any
								website or any social network website through which a User can
								log in or create an account to use the Service.
							</p>
						</li>
						<li>
							<p>
								<strong>Usage Data</strong> refers to data collected
								automatically, either generated by the use of the Service or
								from the Service infrastructure itself (for example, the
								duration of a page visit).
							</p>
						</li>
						<li>
							<p>
								<strong>Website</strong> refers to Store - Imperfect Gamers,
								accessible from{' '}
								<a
									href="https://store.imperfectgamers.org"
									target="_blank"
									rel="noreferrer"
								>
									https://store.imperfectgamers.org
								</a>
							</p>
						</li>
						<li>
							<p>
								<strong>You</strong> means the individual accessing or using the
								Service, or the company, or other legal entity on behalf of
								which such individual is accessing or using the Service, as
								applicable.
							</p>
						</li>
					</ul>
				</>
			),
		},
		{
			title: 'Collecting and Using Your Personal Data',
			content: (
				<>
					<h3>Types of Data Collected</h3>
					<p>
						Personal Data, Usage Data, Information from Third-Party Social Media
						Services.
					</p>
					<h4>Tracking Technologies and Cookies</h4>
					<p>
						We use Cookies and similar tracking technologies to track the
						activity on Our Service and store certain information. Tracking
						technologies used are beacons, tags, and scripts to collect and
						track information and to improve and analyze Our Service.
					</p>
					<ul>
						<li>
							<strong>Cookies or Browser Cookies.</strong> A cookie is a small
							file placed on Your Device. Unless you have adjusted Your browser
							setting so that it will refuse Cookies, our Service may use
							Cookies.
						</li>
						<li>
							<strong>Web Beacons.</strong> Certain sections of our Service and
							our emails may contain small electronic files known as web
							beacons.
						</li>
					</ul>
					<p>
						For more information about the cookies we use and your choices
						regarding cookies, please visit our Cookies Policy or the Cookies
						section of our Privacy Policy.
					</p>
					<h3>Use of Your Personal Data</h3>
					<p>
						The Company may use Personal Data for various purposes including to
						provide and maintain our Service, manage Your Account, for the
						performance of a contract, to contact You, to provide You with
						offers, manage Your requests, and for business transfers.
					</p>
				</>
			),
		},
		{
			title: 'Retention and Transfer of Your Personal Data',
			content: (
				<>
					<h3>Retention of Your Personal Data</h3>
					<p>
						The Company will retain Your Personal Data only for as long as is
						necessary for the purposes set out in this Privacy Policy.
					</p>
					<h3>Transfer of Your Personal Data</h3>
					<p>
						Your information, including Personal Data, is processed at the
						Company&apos;s operating offices and in any other places where the
						parties involved in the processing are located. Your consent to this
						Privacy Policy followed by Your submission of such information
						represents Your agreement to that transfer.
					</p>
				</>
			),
		},
		{
			title: 'Disclosure and Security of Your Personal Data',
			content: (
				<>
					<h3>Disclosure of Your Personal Data</h3>
					<p>
						Business Transactions, Law enforcement, Other legal requirements
						such as complying with a legal obligation, protecting and defending
						the rights or property of the Company, etc.
					</p>
					<h3>Security of Your Personal Data</h3>
					<p>
						The security of Your Personal Data is important to Us, but no method
						of transmission over the Internet, or method of electronic storage
						is 100% secure. We strive to use commercially acceptable means to
						protect Your Personal Data.
					</p>
				</>
			),
		},
		{
			title:
				'Children&apos;s Privacy, Links to Other Websites, and Changes to this Privacy Policy',
			content: (
				<>
					<h2>Children&apos;s Privacy</h2>
					<p>Our Service does not address anyone under the age of 13.</p>
					<h2>Links to Other Websites</h2>
					<p>
						Our Service may contain links to other websites not operated by Us.
						We strongly advise You to review the Privacy Policy of every site
						You visit.
					</p>
					<h2>Changes to this Privacy Policy</h2>
					<p>
						We may update Our Privacy Policy from time to time. We will notify
						You of any changes by posting the new Privacy Policy on this page.
					</p>
				</>
			),
		},
		{
			title: 'Contact Us',
			content: (
				<>
					<p>
						If you have any questions about this Privacy Policy, You can contact
						us:
					</p>
					<ul>
						<li>By email: daiyaan@imperfectandcompany.com</li>
					</ul>
				</>
			),
		},
	]

	const handleCookieToggle = (index: number) => {
		setOpenCookieIndex(openCookieIndex === index ? null : index)
	}

	const handlePrivacyToggle = (index: number) => {
		setPrivacyIndex(openPrivacyIndex === index ? null : index)
	}

	const SettingsPanel = () => (
		<>
			<div className="settings-panel" id="settingsPanel">
				<div className="settings-option font-semibold">
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
					onKeyDown={e => {
						if (e.key === 'Enter' || e.key === ' ')
							handleAnalyticsContainerClick(e)
					}}
					role="button"
					tabIndex={0}
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
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.stopPropagation()
									handleAnalyticsToggle(!settings.analytics.enabled)
								}
							}}
							role="button"
							tabIndex={0}
						/>
						<span
							className="slider"
							onClick={e => {
								e.stopPropagation() // Prevent this click from bubbling up to the container
								handleAnalyticsToggle(!settings.analytics.enabled)
							}}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.stopPropagation()
									handleAnalyticsToggle(!settings.analytics.enabled)
								}
							}}
							role="button"
							tabIndex={0}
						></span>
					</div>
					<div
						className={`sub-settings ${settings.analytics.enabled ? 'active' : ''}`}
						onClick={e => e.stopPropagation()}
						onKeyDown={e => {
							if (e.key === 'Enter' || e.key === ' ') e.stopPropagation()
						}}
						role="button"
						tabIndex={0}
					>
						{' '}
						{/* Stop propagation to prevent toggling when nested options are clicked */}
						<div
							className={`settings-option mb-2 ${!settings.analytics.enabled ? 'disabled' : ''}`}
							onClick={() =>
								toggleSettingFromContainer('analytics', 'googleAnalytics')
							}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.stopPropagation()
									toggleSettingFromContainer('analytics', 'googleAnalytics')
								}
							}}
							role="button"
							tabIndex={0}
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
								onKeyDown={e => {
									if (e.key === 'Enter' || e.key === ' ') e.stopPropagation()
								}}
								role="button"
								tabIndex={0}
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
									onKeyDown={e => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.stopPropagation()
											if (settings.analytics.enabled) {
												toggleSettingFromContainer(
													'analytics',
													'googleAnalytics',
												)
											}
										}
									}}
									role="button"
									tabIndex={0}
								/>
								<span className="slider"></span>
							</div>
						</div>
						<div
							className={`settings-option ${!settings.analytics.enabled ? 'disabled' : ''}`}
							onClick={() =>
								toggleSettingFromContainer('analytics', 'microsoftClarity')
							}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.stopPropagation()
									if (settings.analytics.enabled) {
										toggleSettingFromContainer('analytics', 'microsoftClarity')
									}
								}
							}}
							role="button"
							tabIndex={0}
						>
							<label htmlFor="microsoftClarity" className="select-none">
								Microsoft Clarity:
							</label>
							<div
								className="toggle-switch ml-2"
								onClick={e => e.stopPropagation()}
								onKeyDown={e => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.stopPropagation()
									}
								}}
								role="button"
								tabIndex={0}
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
									onKeyDown={e => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.stopPropagation() // Stop propagation to prevent triggering the container click
											if (settings.analytics.enabled) {
												toggleSettingFromContainer(
													'analytics',
													'microsoftClarity',
												)
											}
										}
									}}
									role="button"
									tabIndex={0}
								/>
								<span className="slider"></span>
							</div>
						</div>
					</div>
				</div>
				<div
					className="settings-option"
					onClick={toggleMarketingFromContainer}
					onKeyDown={e => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.stopPropagation() // Stop propagation to prevent triggering the container click
							toggleMarketingFromContainer()
						}
					}}
					role="button"
					tabIndex={0}
				>
					<label htmlFor="marketing">Marketing:</label>
					<div
						className="toggle-switch"
						onClick={e => e.stopPropagation()}
						onKeyDown={e => {
							if (e.key === 'Enter' || e.key === ' ') e.stopPropagation()
						}}
						role="button"
						tabIndex={0}
					>
						<input
							type="checkbox"
							id="marketing"
							checked={settings.marketing}
							onChange={e => {
								e.stopPropagation() // Prevent this click from triggering the container's onClick
								handleSettingChange('marketing', !settings.marketing)
							}}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.stopPropagation() // Stop propagation to prevent triggering the container click
									handleSettingChange('marketing', !settings.marketing)
								}
							}}
							role="button"
							tabIndex={0}
						/>
						<span className="slider"></span>
					</div>
				</div>
			</div>
			<div className="mb-2 mt-6 flex justify-between">
				<button
					className="cursor-pointer select-none justify-center rounded-md border-transparent bg-gradient-to-r from-stone-500 to-stone-700 px-5 py-2 text-sm font-medium tracking-wide text-white opacity-100 shadow-none transition-all duration-300 hover:bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50"
					onClick={resetSettings}
					disabled={isResetDisabled}
					tabIndex={0}
				>
					Reset Settings
				</button>

				<button
					disabled={isSaveDisabled}
					className="cursor-pointer select-none justify-center rounded-md border-transparent bg-gradient-to-r from-red-500 to-red-700 px-5 py-2 text-sm font-medium tracking-wide text-white opacity-100 shadow-none transition-all duration-300 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50"
					onClick={acceptCookies}
					tabIndex={0}
				>
					{isSaveDisabled ? 'Settings Saved' : 'Save Settings'}
				</button>
			</div>
		</>
	)

	return (
		<>
			{activeModal ? (
				<CookieConsentModal
					title={
						activeModal === ModalNames.Settings
							? 'Cookie Settings'
							: `${activeModal[0].toUpperCase() + activeModal.slice(1)} Policy`
					}
					onClose={closeModal}
					exposeCloseAnimationFunc={handleExposeCloseFunc}
					content={''}
				>
					{activeModal === ModalNames.Settings ? (
						<SettingsPanel />
					) : (
						<p>
							{activeModal === 'cookie' ? (
								<div className="max-h-72 overflow-y-scroll">
									<p className="intro-text">
										This Cookie Policy is designed to inform you about our
										practices regarding the collection of information through
										cookies and other tracking technologies. We aim to be
										transparent about how we use these technologies and how they
										affect your privacy.
									</p>
									{cookieSections.map((section, index) => (
										<AccordionItem
											key={index}
											title={section.title}
											isOpen={openCookieIndex === index}
											onClick={() => handleCookieToggle(index)}
										>
											{section.content}
										</AccordionItem>
									))}
								</div>
							) : activeModal === 'privacy' ? (
								<div className="max-h-72 overflow-y-scroll">
									<p className="intro-text">
										This Privacy Policy is crafted to inform you about how we
										manage, protect, and utilize your personal information
										across our services. As you enjoy our services, it’s
										important for you to understand how and why we collect your
										data, and how your information is handled with respect, in
										line with prevailing privacy laws.
									</p>
									{privacyPolicySections.map((section, index) => (
										<AccordionItem
											key={index}
											title={section.title}
											isOpen={openPrivacyIndex === index}
											onClick={() => handlePrivacyToggle(index)}
										>
											{section.content}
										</AccordionItem>
									))}
								</div>
							) : (
								`Read our ${activeModal} policy here. This policy provides detailed information about how we use cookies and how you can manage them.`
							)}
						</p>
					)}
				</CookieConsentModal>
			) : null}

			{isVisible ? (
				<div
					className={`cookie-popup z-50 ${isExiting ? 'exiting' : ''}`}
					id="cookieBanner"
					style={{
						visibility: isVisible ? 'visible' : 'hidden',
						animation:
							'slideUp 0.5s ease-out forwards, glow 1.5s ease-in-out infinite alternate',
					}}
					role="banner"
				>
					<div id="cookieBanner-inner">
						<strong id="cookieBanner-Header">
							Imperfect Gamers - Committed to Your Privacy.
						</strong>
						<p id="cookieBanner-paragraph">
							We use cookies and similar technologies to enhance your
							experience. Manage your preferences or withdraw your consent at
							any time. For more information, visit our &quot;Settings&quot; or
							view our data protection policies.
						</p>
						<div className="button-group" id="cookie-banner-buttons">
							<button
								id="cookie-banner-privacy-button"
								onClick={() => openModal(ModalNames.Privacy)}
								disabled={activeModal === 'privacy'}
								className="text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed	 disabled:text-red-700 disabled:hover:disabled:text-red-700"
							>
								Privacy Policy
							</button>
							<button
								id="cookie-banner-cookie-button"
								onClick={() => openModal(ModalNames.Cookie)}
								disabled={activeModal === 'cookie'}
								className="text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:text-red-700 disabled:hover:disabled:text-red-700"
							>
								Cookie Policy
							</button>
							<button
								id="cookie-banner-settings-button"
								onClick={() => openModal(ModalNames.Settings)}
								disabled={activeModal === 'settings'}
								className="text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:text-red-700 disabled:hover:disabled:text-red-700"
							>
								Settings
							</button>
						</div>
					</div>
					<div
						id="cookie-banner-accept-all-container"
						className={`accept-button ${activeModal === ModalNames.Settings ? 'hidden-accept-all' : ''}`}
					>
						<button
							id="cookie-banner-accept-all"
							className="cursor-pointer select-none justify-center border-transparent bg-gradient-to-r from-red-500 to-red-700 px-5 py-2 text-sm font-medium tracking-wide text-white opacity-100 shadow-none transition-opacity duration-300 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-white"
							onClick={acceptAllCookies}
						>
							Accept all
						</button>
					</div>
				</div>
			) : null}
		</>
	)
}

export default CookieConsent
