// components/molecules/CheckoutProcess/CheckoutProcess.tsx

import { useFetcher, useLoaderData } from '@remix-run/react'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CloseInterceptReason } from '~/components/organism/ModalWrapper/ModalWrapper'
import type { LoaderData } from '~/routes/store'
import { useFetcherWithPromise } from '~/utils/general'
import type { TebexCheckoutConfig } from '~/utils/tebex.interface'
import { useAddPackageToBasket, useCreateBasket } from './BasketManager'

interface CheckoutProcessProps {
	isOpen?: boolean
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

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
	const { submit } = useFetcherWithPromise()
	const fetcher = useFetcher()
	const isAuthorized = isOnboarded && isAuthenticated && isSteamLinked

	const [successfulPayment, setSuccessfulPayment] = useState(false)
	const [failedPayment, setFailedPayment] = useState(false)


	// 1.0 Effect to Check Basket Existence

	useEffect(() => {
		setBasketExists(!!basketId)
	}, [basketId])

	// 2.0 Tebex Checkout Hook Setup

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
				console.log('Tebex Checkout Opened')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.ActivePopup)
				}
			})

			Tebex.checkout.on(Tebex.events.CLOSE, () => {
				console.log('Tebex Checkout Closed')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
			})

			Tebex.checkout.on('payment:complete', () => {
				console.log('Payment Complete')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
				setSuccessfulPayment(true)
			})

			Tebex.checkout.on('payment:error', () => {
				console.log('Payment Error')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
				setFailedPayment(true)
			})

			Tebex.checkout.launch()
		},
		[setCloseInterceptReason],
	)

	// 7.0 Initiate Checkout Function

	const initiateCheckout = (basketId: string) => {
		console.log('Initiating checkout...')
		UseTebexCheckout(basketId, 'dark')
	}

	// 3.0 Handle Store Interactions Hook Setup

	const handleStoreInteractions = useCallback(async () => {
		if (!isAuthorized || !isOpen) return

		let localBasketId = basketId
		let localPackages = packages

		// Process 3.1: Create the basket if it doesn't exist
		if (!localBasketId) {
			const result = await createBasket()
			if (result) {
				localBasketId = result // Update the package with the response
				setBasketExists(true)
			}
		} else {
			console.log('User already has basket...')
		}
		// Process 3.2: Add a package if it's not already in the basket
		if (localBasketId && !packages.some(pkg => pkg.id === 6154841)) {
			const result = await addPackageToBasket(localBasketId)
			if (result) {
				localPackages = result // Update the package with the response
			}
		} else {
			console.log('User already has package added to basket...')
		}

		// Process 3.3: Initiate checkout
		if (localBasketId && localPackages.some(pkg => pkg.id === 6154841)) {
			initiateCheckout(localBasketId)
		} else {
			console.log(
				'User had basket and added package to basket, but somehow added package not matching our expected id...',
			)
		}
	}, [
		basketId,
		packages,
		isAuthorized,
		isOpen,
		UseTebexCheckout,
		submit,
		useAddPackageToBasket,
		useCreateBasket,
		initiateCheckout,
	])

	// 4.0 Effect to Handle Authentication and Store Interaction Triggers

	useEffect(() => {
		if (!isAuthenticated && prevIsAuthenticated.current) {
			storeRequestTriggeredRef.current = false
			setBasketExists(false) // Reset on logout
			return // Exit if user is not authenticated
		}

		prevIsAuthenticated.current = isAuthenticated

		// Trigger interactions only when necessary and prevent multiple triggers
		if (isOpen && isAuthorized && !storeRequestTriggeredRef.current) {
			handleStoreInteractions()
			storeRequestTriggeredRef.current = true // Prevent re-triggering until conditions change
		}

		// Reset trigger when modal closes or user logs out
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

	// 5.0 Create Basket Function

	const createBasket = async () => {
		console.log('Creating basket...')
		try {
			const response = await submit(null, {
				method: 'post',
				action: '/store/create',
			})
			return response.basketId
		} catch (error) {
			console.error('Failed to create basket:', error)
			throw error
		}
	}

	// 6.0 Add Package to Basket Function

	const addPackageToBasket = async (basketId: string) => {
		console.log('Adding package to basket...')
		try {
			const response = await submit(
				{ basketId },
				{ method: 'post', action: '/store/add' },
			)
			return response.packages
		} catch (error) {
			console.error('Failed to add package:', error)
			throw error
		}
	}

	// 8.0 Render states.

	// Process 8.1:  Does user have a basket (required)
	if (!basketId) {
		return <div>Loading or creating your basket...</div>
	}

	// Process 8.2: Check if fetching data or processing a request
	if (fetcher.state === 'loading') {
		return <div>Processing...</div>
	}

	// Process 8.3: Check if fetching data or processing a request
	if ((fetcher.data as { error: string })?.error) {
		return <div>Error: {(fetcher.data as { error: string }).error}</div>
	}

	// Process 8.4: Does user have premium package in basket (final process)
	if (!packages.some(pkg => pkg.id === 6154841)) {
		return <div>Loading or adding premium package to basket...</div>
	}

	// Process 8.5: Show final screen (ready)
	if (isSteamLinked) {
		if (successfulPayment) {
			return (
				<>
					<div>Payment Successful!</div>
					<div>Our background process will deliver perks to your account in-game!</div>
					<div>If you're already online, please wait for the next map-change or rejoin.</div>
					<div>Questions? Reach our Discord: https://imperfectgamers.org/discord/</div>
				</>
			)
		} else if (failedPayment) {
			return (
				<>
					<div>Payment Failed!</div>
					<div>Reach out to staff on discord: https://imperfectgamers.org/discord/</div>
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
}

export default CheckoutProcess
