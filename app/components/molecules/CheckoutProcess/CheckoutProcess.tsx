import { useFetcher, useLoaderData, useRevalidator } from '@remix-run/react'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CloseInterceptReason } from '~/components/organism/ModalWrapper/ModalWrapper'
import type { LoaderData } from '~/routes/_index'
import { useFetcherWithPromise } from '~/utils/general'
import type { TebexCheckoutConfig } from '~/utils/tebex.interface'
import { useCreateBasket, useAddPackageToBasket } from './BasketManager'
import { useCheckStoreCookieSession } from './SessionCheck'
import { useSaveStoreSession } from './SessionSave'

interface CheckoutProcessProps {
	isOpen?: boolean
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

/**
 * Component to manage the checkout process, handling basket creation, package addition, and payment processing.
 */
const CheckoutProcess: React.FC<CheckoutProcessProps> = ({
	isOpen,
	setCloseInterceptReason,
}) => {
	const {
		isAuthenticated,
		isSteamLinked,
		steamId,
		isOnboarded,
		username,
		basketId,
		packages = [],
		checkoutUrl,
	} = useLoaderData<LoaderData>()

	const [basketExists, setBasketExists] = useState(!!basketId)
	const prevIsAuthenticated = useRef(isAuthenticated)
	const storeRequestTriggeredRef = useRef(false)
	const prevIsOpen = useRef(isOpen)
	const fetcher = useFetcher()
	const isAuthorized = isOnboarded && isAuthenticated && isSteamLinked

	const [successfulPayment, setSuccessfulPayment] = useState(false)
	const [failedPayment, setFailedPayment] = useState(false)

	const createBasket = useCreateBasket()
	const addPackageToBasket = useAddPackageToBasket()
	const revalidator = useRevalidator()

	const checkStoreCookieSession = useCheckStoreCookieSession()
	const saveStoreSession = useSaveStoreSession()

	const { submit } = useFetcherWithPromise()

	const [basketIdCleared, setBasketIdCleared] = useState(false)
	const [packagesCleared, setPackagesCleared] = useState(false)
	const [alreadyFetched, setAlreadyFetched] = useState(false)
	const [launchingCheckout, setLaunchingCheckout] = useState(false)
	const [checkoutOpen, setCheckoutOpen] = useState(false)
	const checkoutOpenRef = useRef(false) // Use ref to track open state
	const [showFallbackMessage, setShowFallbackMessage] = useState(false)
	const [tebexPopup, setTebexPopup] = useState<Window | null>(null)

	const [showClosedCheckoutMessage, setShowClosedCheckoutMessage] =
		useState(false)

	useEffect(() => {
		setBasketExists(!!basketId)
	}, [basketId])

	const callback = () => {
		revalidator.revalidate()
	}

	// REFER TO LINE 49 OF STORE.CREATE.TSX FOR INSIGHT ON MISSING TEBEX CHECKOUT ERROR REDIRECT HANDLING
	useEffect(() => {
		const handleEvent = (event: Event) => {
			console.log('[CheckoutProcess.tsx] Received event:', event.type)
			switch (event.type) {
				case 'steamAuthSuccess':
					console.log(
						'[CheckoutProcess.tsx] User has successfully integrated their Steam account.',
					)
					callback()
					break
				case 'tebexCheckoutSuccess':
					console.log(
						'[CheckoutProcess.tsx] User has successfully completed checkout.',
					)
					setSuccessfulPayment(true)
					callback()
					break
				case 'tebexCheckoutCancel':
					console.log('[CheckoutProcess.tsx] User has cancelled the checkout.')
					setShowClosedCheckoutMessage(true)
					callback()
					break
				default:
					console.log('[CheckoutProcess.tsx] Unhandled event type:', event.type)
					break
			}
		}

		window.addEventListener('steamAuthSuccess', handleEvent)
		window.addEventListener('tebexCheckoutSuccess', handleEvent)
		window.addEventListener('tebexCheckoutCancel', handleEvent)

		return () => {
			window.removeEventListener('steamAuthSuccess', handleEvent)
			window.removeEventListener('tebexCheckoutSuccess', handleEvent)
			window.removeEventListener('tebexCheckoutCancel', handleEvent)
		}
	}, [])

	/**
	 * Initializes the Tebex checkout process.
	 * @param {string} checkoutId - The ID for the Tebex checkout.
	 * @param {'light' | 'dark'} theme - The theme for the Tebex checkout.
	 */
	const UseTebexCheckout = useCallback(
		(checkoutId: string, theme: 'light' | 'dark') => {
			const { Tebex } = window

			if (!Tebex) return

			const config: TebexCheckoutConfig = {
				ident: checkoutId,
				theme: theme,
				colors: [
					{
						name: 'primary',
						color: '#910f0f',
					},
					{
						name: 'secondary',
						color: '#25c235',
					},
				],
			}

			Tebex.checkout.init(config)

			// Intercept window.open temporarily
			const originalWindowOpen = window.open
			window.open = (...args) => {
				const popup = originalWindowOpen.apply(window, args)
				setTebexPopup(popup)
				return popup
			}

			// Listen for Tebex checkout events and set modal close intercept reasons accordingly
			Tebex.checkout.on(Tebex.events.OPEN, () => {
				console.log('[Checkout Process] Tebex Checkout Opened')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.ActivePopup)
				}
				setLaunchingCheckout(false)
				setCheckoutOpen(true)
				checkoutOpenRef.current = true // Update ref
				setShowFallbackMessage(false) // Ensure fallback message is not shown when checkout opens
				setShowClosedCheckoutMessage(false) // Use this flag to hide resume checkout
			})

			Tebex.checkout.on(Tebex.events.CLOSE, () => {
				console.log('[Checkout Process] Tebex Checkout Closed')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
				setCheckoutOpen(false)
				setLaunchingCheckout(false)
				checkoutOpenRef.current = false // Update ref
				setShowFallbackMessage(false) // Ensure fallback message is not shown when checkout opens
				// Here, check if the payment was not successful and the checkout was indeed closed by the user
				if (!successfulPayment || !failedPayment) {
					setShowClosedCheckoutMessage(true) // Use this flag to show resume checkout
				}
			})

			Tebex.checkout.on(Tebex.events.PAYMENT_COMPLETE, () => {
				console.log('[Checkout Process] Payment Complete')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
				setSuccessfulPayment(true)
			})

			Tebex.checkout.on(Tebex.events.PAYMENT_ERROR, () => {
				console.log('[Checkout Process] Payment Error')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
				setFailedPayment(true)
			})

			Tebex.checkout.launch()
			// Restore original window.open after launch
			window.open = originalWindowOpen
		},
		[setCloseInterceptReason],
	)

	/**
	 * Initiates the checkout process.
	 * @param {string} basketId - The ID of the basket to be checked out.
	 */
	const initiateCheckout = useCallback(
		(basketId: string) => {
			// Fallback to close the popup if the Tebex checkout close fails
			if (tebexPopup && !tebexPopup.closed) {
				tebexPopup.close()
				console.log('[Checkout Process] Popup closed through fallback')
			}

			if (basketId !== '') {
				console.log('[Checkout Process] Step 3: Initiating checkout...')
				setLaunchingCheckout(true)
				if (!launchingCheckout) {
					UseTebexCheckout(basketId, 'dark')
					const timeoutId = setTimeout(() => {
						if (!checkoutOpenRef.current) {
							console.error(
								'[Checkout Sentry] Assuming popup was blocked, enabling fallback...',
							)
							setShowFallbackMessage(true) // Show message that the popup was blocked
							if (setCloseInterceptReason) {
								// add support for redirect in future
								setCloseInterceptReason(CloseInterceptReason.AlertDialogOpen)
							}
							setLaunchingCheckout(false) // disable 'is launching' state
							// if (checkoutUrl) {
							// 	window.location.href = checkoutUrl // Redirect as a fallback
							// }
						} else {
							console.log(
								'[Checkout Sentry] Checkout open, no need to show fallback option',
							)
						}
					}, 1000)
					return () => clearTimeout(timeoutId)
				}
			}
		},
		[UseTebexCheckout, launchingCheckout],
	)

	const [redirecting, setRedirecting] = useState(false)
	const [countdown, setCountdown] = useState(3)

	const handleFallbackRedirect = () => {
		const { Tebex } = window
		if (Tebex) {
			Tebex.checkout.closePopup()
		}

		// Fallback to close the popup if the Tebex checkout close fails
		if (tebexPopup && !tebexPopup.closed) {
			tebexPopup.close()
			console.log('[Checkout Process] Popup closed through fallback')
		}

		if (setCloseInterceptReason) {
			// add support for redirect in future
			setCloseInterceptReason(CloseInterceptReason.RequestInProgress)
		}

		console.log('Checkout initiated with basketId:', basketId)
		setRedirecting(true) // Begin the redirect process
		setShowFallbackMessage(false) // Hide the fallback message
	}

	const cancelRedirect = () => {
		setRedirecting(false) // Stop the redirect process
		setShowFallbackMessage(true) // Show the fallback message
		setCountdown(3) // Reset the countdown
		console.log('[Checkout Process] Redirect cancelled')
		if (setCloseInterceptReason) {
			// add support for redirect in future
			setCloseInterceptReason(CloseInterceptReason.AlertDialogOpen)
		}
	}

	// Handle the countdown and redirect logic
	useEffect(() => {
		let intervalId: string | number | NodeJS.Timeout | undefined
		if (redirecting) {
			intervalId = setInterval(() => {
				setCountdown(prevCountdown => {
					const newCountdown = prevCountdown - 1
					if (newCountdown < 1) {
						clearInterval(intervalId) // Clear interval
						if (checkoutUrl) {
							window.location.href = checkoutUrl // Redirect
						}
					}
					return newCountdown
				})
			}, 1000)
		}

		// Cleanup function to clear the interval when component unmounts or redirecting changes
		return () => {
			if (intervalId) {
				clearInterval(intervalId)
			}
		}
	}, [redirecting, checkoutUrl])

	/**
	 * Handles store interactions including basket creation and package addition.
	 */
	const handleStoreInteractions = useCallback(async () => {
		if (setCloseInterceptReason) {
			setCloseInterceptReason(CloseInterceptReason.RequestInProgress)
		}
		if (!isAuthorized || !isOpen || storeRequestTriggeredRef.current) return

		storeRequestTriggeredRef.current = true // Set the flag to true to prevent multiple calls

		let localBasketId = basketId
		let localPackages = packages

		let data = {
			basket_id: localBasketId,
			package_id: 6288193,
			checkout_url: checkoutUrl,
		}

		const sessionCheck = await submit(data, {
			method: 'post',
			action: '/store/session/check',
		})

		if (!sessionCheck || sessionCheck.error) {
			console.log(
				'[Checkout Process] Pre-authorization: Store cookie session validation failed',
			)
			return
		}

		if (
			sessionCheck.message === 'No relevant details found, cookies cleared' ||
			sessionCheck.message === 'Cookies cleared due to mismatch with database'
		) {
			revalidator.revalidate()
			console.log(
				'Cookies that have been cleared: ',
				sessionCheck.clearedCookies,
			)
			if (sessionCheck.clearedCookies.includes('basketId')) {
				setBasketIdCleared(true)
			}
			if (sessionCheck.clearedCookies.includes('packages')) {
				setPackagesCleared(true)
			}
			// if (sessionCheck.clearedCookies.includes('checkoutUrl')) {
			// }
		}
		console.log('[Checkout Process] Step 1: Checking basket existence...')
		if (!localBasketId || basketIdCleared) {
			console.log('[Checkout Process] Creating basket...')
			const result = await createBasket()
			if (result) {
				console.log('[Checkout Process] Result received from createBasket()')
				localBasketId = result
				setBasketExists(true)
			}
		} else {
			console.log('[Checkout Process] User already has basket...')
			console.log('[Checkout Process] Basket:', localBasketId)
		}

		console.log(
			'[Checkout Process] Step 2: Checking package to basket existence...',
		)
		if (
			localBasketId &&
			(!packages.some(pkg => pkg.id === 6288193) || packagesCleared)
		) {
			console.log('[Checkout Process] Adding package to basket...')
			const result = await addPackageToBasket(localBasketId)
			console.log(result)
			if (result) {
				console.log(
					'[Checkout Process] Result received from addPackageToBasket()...',
				)
				localPackages = result
			}
		} else {
			console.log(
				'[Checkout Process] User already has package added to basket...',
			)
			console.log('[Checkout Process] Package:', packages)
			console.log('[Checkout Process] Expected Package ID:', 6288193)
		}
		if (localBasketId && localPackages.some(pkg => pkg.id === 6288193)) {
			if (!alreadyFetched) {
				if (sessionCheck.isFirstTime) {
					revalidator.revalidate()
					if (checkoutUrl) {
						let data = {
							basket_id: localBasketId,
							package_id: localPackages[0].id,
							checkout_url: checkoutUrl,
						}

						fetcher.submit(data, {
							method: 'post',
							action: '/store/session/save',
						})
					}
				}
				setAlreadyFetched(true)
			}
			initiateCheckout(localBasketId)
		} else {
			console.log(
				'[Checkout Process] User had basket and added package to basket, but somehow added package not matching our expected id...',
			)
		}
		if (setCloseInterceptReason) {
			setCloseInterceptReason(CloseInterceptReason.None)
		}
	}, [
		basketId,
		packages,
		isAuthorized,
		isOpen,
		createBasket,
		addPackageToBasket,
		initiateCheckout,
		checkStoreCookieSession,
		saveStoreSession,
	])

	useEffect(() => {
		if (!isAuthenticated && prevIsAuthenticated.current) {
			storeRequestTriggeredRef.current = false
			setAlreadyFetched(false)
			setBasketIdCleared(false)
			setPackagesCleared(false)
			setBasketExists(false) // Reset on logout
			return // Exit if user is not authenticated
		}

		prevIsAuthenticated.current = isAuthenticated

		if (isOpen && isAuthorized && !storeRequestTriggeredRef.current) {
			setTimeout(() => {
				handleStoreInteractions()
			}, 100) // Adjust delay if necessary
		}

		if (!isOpen && prevIsOpen.current) {
			storeRequestTriggeredRef.current = false
		}

		prevIsOpen.current = isOpen
	}, [
		isOpen,
		isAuthenticated,
		isAuthorized,
		isOnboarded,
		handleStoreInteractions,
		basketExists,
	])

	if (!basketId && !checkoutOpen) {
		return (
			<>
				<div id="primaryLoader" className="loader">
					<div className="spinner"></div>
					<p id="loaderText">Loading or creating your basket...</p>
				</div>
			</>
		)
	}

	if (fetcher.state === 'loading') {
		;<div id="primaryLoader" className="loader">
			<div className="spinner"></div>
			<p id="loaderText">Processing...</p>
		</div>
	}

	if ((fetcher.data as { error: string })?.error) {
		return <div>Error: {(fetcher.data as { error: string }).error}</div>
	}

	if (!packages.some(pkg => pkg.id === 6288193)) {
		return (
			<div id="primaryLoader" className="loader">
				<div className="spinner"></div>
				<p id="loaderText">Loading or adding premium package to basket...</p>
			</div>
		)
	}

	if (isSteamLinked) {
		if (
			successfulPayment &&
			!launchingCheckout &&
			!checkoutOpen &&
			!showFallbackMessage
		) {
			return (
				<>
					<div className="mx-auto mt-4 pb-4 text-center text-green-500/95">
						<div>
							<i className="fas fa-check-circle mr-2 "></i>
							<strong>Payment Successful!</strong> <br />
							<span className="margin-left-5 text-white/90">
								Our background process will deliver perks to your account
								in-game!
							</span>
							<div>
								If you are already online, please wait for the next map-change
								or rejoin.
							</div>
						</div>
						<div className="items-align mt-2">
							Questions? Reach our Discord:{' '}
							<a
								href="https://imperfectgamers.org/discord/"
								className="button mx-auto mt-2 inline-flex items-center px-4 py-2 text-center text-white transition-all hover:bg-red-700 focus:bg-red-900"
							>
								<i className="fab fa-discord mr-2"></i>Join Discord
							</a>
						</div>
					</div>
				</>
			)
		} else if (
			failedPayment &&
			!launchingCheckout &&
			!checkoutOpen &&
			!showFallbackMessage
		) {
			return (
				<>
					<div className="mt-4 pb-4 text-center text-red-500/95">
						<div>
							<i className="fas fa-exclamation-triangle mr-2 "></i>
							<strong>Payment Failed!</strong> <br />
							<span className="margin-left-5 text-white/90">
								Please reach out to staff on discord.
							</span>
						</div>
						<a
							href="https://imperfectgamers.org/discord/"
							className="button mx-auto mt-2 inline-flex items-center px-4 py-2 text-center text-white transition-all hover:bg-red-700 focus:bg-red-900"
						>
							<i className="fab fa-discord mr-2"></i>Join Discord
						</a>
					</div>
				</>
			)
		} else if (launchingCheckout) {
			return (
				<div id="primaryLoader" className="loader">
					<div className="spinner"></div>
					<p id="loaderText">Launching checkout...</p>
				</div>
			)
		} else if (
			showClosedCheckoutMessage &&
			!failedPayment &&
			!successfulPayment &&
			!launchingCheckout &&
			!checkoutOpen &&
			!showFallbackMessage &&
			!redirecting
		) {
			// Case where checkout was closed without completing the payment
			return (
				<div className="cta-container mt-8 pb-6 text-center">
					<h3 className="cta-text text-lg text-stone-300">
						Ready to Complete Your Membership?
					</h3>
					<button
						onClick={() => initiateCheckout(basketId ? basketId : '')}
						className="steam-button button mt-3 rounded px-4 py-2 font-bold text-stone-50"
					>
						Click here to resume
					</button>
					<p id="alternativeText" className="loader mt-2 text-sm text-gray-400">
						It seems like you closed the checkout.
					</p>
				</div>
			)
		} else if (redirecting) {
			return (
				<div className="cta-container mt-8 pb-6 text-center">
					<h3 className="cta-text animate animate-pulse text-lg text-stone-300">
						Redirecting you to checkout...
					</h3>
					<button
						onClick={cancelRedirect}
						className="steam-button button mt-3 rounded px-4 py-2 font-bold text-stone-50"
					>
						Click here to cancel
					</button>
					<p id="alternativeText" className="loader mt-2 text-sm text-gray-400">
						{countdown} seconds to redirect...
					</p>
				</div>
			)
		} else if (showFallbackMessage && checkoutUrl) {
			return (
				<div className="fallbackMessage rounded-lg bg-black/90 p-6 shadow-xl transition-all duration-300 ease-in-out">
					<p className="mb-4 text-lg font-semibold leading-relaxed text-white/95 md:text-xl">
						Oops! It seems a popup blocker has interfered with opening the
						checkout window.
					</p>
					<p className="text-lg italic text-white/90 md:text-xl">
						No worries, you can still
						<button
							onClick={handleFallbackRedirect}
							className="text-red-500 underline transition-colors duration-300 ease-in-out hover:text-red-700 md:ml-2"
						>
							proceed manually
						</button>
						.
					</p>
					<div className="mt-6">
						<p className="mb-4 text-lg text-white/95 md:text-xl">
							Alternatively, try to start the checkout process again here:
						</p>
						<button
							onClick={() => initiateCheckout(basketId ?? '')}
							className="steam-button button rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-bold text-white shadow transition-all duration-300 ease-in-out hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Attempt Checkout
						</button>
					</div>
				</div>
			)
		} else if (checkoutOpen && !launchingCheckout && !showFallbackMessage) {
			return (
				<div id="primaryLoader" className="loader">
					<p id="loaderText">Checkout launched...</p>
				</div>
			)
		} else {
			return (
				<>
					<div className="mb-8 px-4 sm:px-6 lg:px-8">
						<div className="text-md mb-4 text-white sm:text-lg lg:text-xl">
							Steam Linked with ID: {steamId}
						</div>
						<div className="text-md mb-4 text-white sm:text-lg lg:text-xl">
							Username: {username}
						</div>

						{basketExists &&
						basketId &&
						packages.some(pkg => pkg.id === 6288193) ? (
							<button
								onClick={() => initiateCheckout(basketId)}
								className="steam-button button sm:text-md mt-3 rounded px-4 py-2 font-medium text-white lg:text-lg"
							>
								Click here to continue
							</button>
						) : null}
					</div>
				</>
			)
		}
	}
	return null
}

export default CheckoutProcess
