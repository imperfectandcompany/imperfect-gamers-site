import { useFetcher, useLoaderData } from '@remix-run/react'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CloseInterceptReason } from '~/components/organism/ModalWrapper/ModalWrapper'
import type { LoaderData } from '~/routes/_index'
import type { TebexCheckoutConfig } from '~/utils/tebex.interface'
import { useCreateBasket, useAddPackageToBasket } from './BasketManager'

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

	useEffect(() => {
		setBasketExists(!!basketId)
	}, [basketId])

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
			}

			Tebex.checkout.init(config)

			// Listen for Tebex checkout events and set modal close intercept reasons accordingly
			Tebex.checkout.on(Tebex.events.OPEN, () => {
				console.log('[Checkout Process] Tebex Checkout Opened')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.ActivePopup)
				}
			})

			Tebex.checkout.on(Tebex.events.CLOSE, () => {
				console.log('[Checkout Process] Tebex Checkout Closed')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
			})

			Tebex.checkout.on('payment:complete', () => {
				console.log('[Checkout Process] Payment Complete')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
				setSuccessfulPayment(true)
			})

			Tebex.checkout.on('payment:error', () => {
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
			UseTebexCheckout(basketId, 'dark')
		},
		[UseTebexCheckout],
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

		console.log('[Checkout Process] Step 1: Checking basket existence...')
		if (!localBasketId) {
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

		console.log('[Checkout Process] Step 2: Adding package to basket...')
		if (localBasketId && !packages.some(pkg => pkg.id === 6288193)) {
			const result = await addPackageToBasket(localBasketId)
			console.log(result)
			if (result) {
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
	])

	useEffect(() => {
		if (!isAuthenticated && prevIsAuthenticated.current) {
			storeRequestTriggeredRef.current = false
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

	if (!basketId) {
		return <div>Loading or creating your basket...</div>
	}

	if (fetcher.state === 'loading') {
		return <div>Processing...</div>
	}

	if ((fetcher.data as { error: string })?.error) {
		return <div>Error: {(fetcher.data as { error: string }).error}</div>
	}

	if (!packages.some(pkg => pkg.id === 6288193)) {
		return <div>Loading or adding premium package to basket...</div>
	}

	if (isSteamLinked) {
		if (successfulPayment) {
			return (
				<>
					<div>Payment Successful!</div>
					<div>
						Our background process will deliver perks to your account in-game!
					</div>
					<div>
						If you are already online, please wait for the next map-change or
						rejoin.
					</div>
					<div>
						Questions? Reach our Discord: https://imperfectgamers.org/discord/
					</div>
				</>
			)
		} else if (failedPayment) {
			return (
				<>
					<div>Payment Failed!</div>
					<div>
						Reach out to staff on discord: https://imperfectgamers.org/discord/
					</div>
				</>
			)
		} else {
			return (
				<>
					<div>Steam Linked with ID: {steamId}</div>
					<div>Onboarded as: {username}</div>
				</>
			)
		}
	}
	return null
}

export default CheckoutProcess
