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
		flashSuccess,
		flashError,
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
	const [showClosedCheckoutMessage, setShowClosedCheckoutMessage] =
		useState(false)

	useEffect(() => {
		setBasketExists(!!basketId)
	}, [basketId])

	const callback = () => {
		revalidator.revalidate()
	}

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (
				event.data.type === 'steam-auth-success' ||
				event.data.type === 'tebex-checkout-success' ||
				event.data.type === 'tebex-checkout-cancel'
			) {
				console.log('Received event:', event.data) // Check what is actually received
				if (event.data.type === 'steam-auth-success') {
					console.log('User has successfully integrated their steam.')
				} else if (event.data.type === 'tebex-checkout-success') {
					console.log('User has successfully completed checkout.')
					setSuccessfulPayment(true) // Set the checkout complete flag true
				} else if (event.data.type === 'tebex-checkout-cancel') {
					console.log('User has cancelled the checkout.')
					setShowClosedCheckoutMessage(true)
				}
				callback()
			}
		}

		window.addEventListener('message', handleMessage)

		return () => {
			window.removeEventListener('message', handleMessage)
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
		},
		[setCloseInterceptReason],
	)

	/**
	 * Initiates the checkout process.
	 * @param {string} basketId - The ID of the basket to be checked out.
	 */
	const initiateCheckout = useCallback(
		(basketId: string) => {
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
						setLaunchingCheckout(false) // disable 'is launchiing' state
						// if (checkoutUrl) {
						// 	window.location.href = checkoutUrl // Redirect as a fallback
						// }
					} else {
						console.log('[Checkout Sentry] Checkout open, no need to redirect')
					}
				}, 1000)
				return () => clearTimeout(timeoutId)
			}
		},
		[UseTebexCheckout, launchingCheckout],
	)

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
			!showFallbackMessage
		) {
			// Case where checkout was closed without completing the payment
			return (
				<div className="cta-container mt-4 pb-6 text-center">
					<h3 className="cta-text text-lg text-stone-300">
						Ready to Complete Your Membership?
					</h3>
					<button
						onClick={() => initiateCheckout(basketId)}
						className="steam-button button mt-3 rounded px-4 py-2 font-bold text-stone-50"
					>
						Click here to resume
					</button>
					<p id="alternativeText" className="loader mt-2 text-sm text-gray-400">
						It seems like you closed the checkout window.
					</p>
				</div>
			)
		} else if (showFallbackMessage && checkoutUrl) {
			return (
				<div className="fallbackMessage p-6 ">
					<p className="mb-4 text-lg text-white/95">
						We detected that a popup blocker may have prevented the checkout
						window from opening.
					</p>
					<p className="mb-4  text-lg text-white/95">
						No worries, you can{' '}
						<a
							href={checkoutUrl}
							rel="noopener noreferrer"
							className="text-red-500 underline hover:text-red-700"
						>
							click here
						</a>{' '}
						to proceed to checkout manually.
					</p>
					<p className="mb-4  text-lg text-white/95">
						Alternatively, you can try to start the checkout process manually
						from here:
					</p>
					<button
						onClick={() => initiateCheckout(basketId)}
						className="steam-button button mt-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
					>
						Attempt checkout
					</button>
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
							Onboarded as: {username}
						</div>

						{basketExists &&
							basketId &&
							packages.some(pkg => pkg.id === 6288193) && (
								<button
									onClick={() => initiateCheckout(basketId)}
									className="steam-button button sm:text-md mt-3 rounded px-4 py-2 font-medium text-white lg:text-lg"
								>
									Click here to continue
								</button>
							)}
					</div>
				</>
			)
		}
	}
	return null
}

export default CheckoutProcess
