// app/components/molecules/CheckoutProcess/CheckoutProcess.tsx

// Inside the CheckoutProcess, we have the following components:

// CheckoutProcess.tsx: This component handles the overall checkout process, including creating the basket, adding packages, and initiating the Tebex checkout.
// BasketManager.tsx: This component handles the logic for creating and managing the basket.
// PackageManager.tsx: This component handles the logic for checking packages from the basket.
// TebexCheckout.tsx: This component handles the integration with Tebex and initiate the checkout process.

// The CheckoutProcess component combines the BasketManager, PackageManager, and TebexCheckout components to provide the complete checkout flow. It manages the state of the basket ID and packages, and passes them down to the respective components.
// The setCloseInterceptReason prop is passed down to the TebexCheckout component to handle the modal close intercept reason based on the Tebex checkout events.

import { useFetcher, useLoaderData } from '@remix-run/react'
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react'
import type { CloseInterceptReason } from '~/components/organism/ModalWrapper/ModalWrapper'
import type { LoaderData } from '~/routes/store'
import { addPackageToBasket, createBasket } from './BasketManager'
import { hasSpecificPackage } from './PackageManager'
import TebexCheckout from './TebexCheckout'

const PREMIUM_PACKAGE_ID = 6154841

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
	const [isAuthorized, setIsAuthorized] = useState(false)
	const prevIsAuthenticated = useRef(isAuthenticated)
	const storeRequestTriggeredRef = useRef(false)
	const prevIsOpen = useRef(isOpen)
	const { initiateCheckout } = TebexCheckout({ setCloseInterceptReason })
	const fetcher = useFetcher()

	useEffect(() => {
		setBasketExists(!!basketId)
	}, [basketId])

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
		}

		// Process 3.2: Add a package if it's not already in the basket
		if (localBasketId && !hasSpecificPackage(packages, PREMIUM_PACKAGE_ID)) {
			const result = await addPackageToBasket(localBasketId)
			if (result) {
				localPackages = result // Update the package with the response
			}
		}

		// Process 3.3: Initiate checkout
		if (
			localBasketId &&
			hasSpecificPackage(localPackages, PREMIUM_PACKAGE_ID)
		) {
			initiateCheckout(localBasketId)
		}
	}, [basketId, packages, isAuthorized, isOpen, initiateCheckout])

	useEffect(() => {
		const authorizationStatus = isAuthenticated && isOnboarded && isSteamLinked
		setIsAuthorized(authorizationStatus)

		if (!isAuthenticated && prevIsAuthenticated.current) {
			storeRequestTriggeredRef.current = false
			setIsAuthorized(false)
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
		isAuthorized,
		isAuthenticated,
		handleStoreInteractions,
		basketExists,
	])

	// Render states...

	return (
		<>
			{/* Process 8.1: Does user have a basket (required) */}
			{!basketId ? <div>Loading or creating your basket...</div> : null}

			{
				/* Process 8.2: Check if fetching data or processing a request */
				fetcher.state === 'loading' ? <div>Processing...</div> : null
			}

			{
				/* Process 8.3: Check if fetching data or processing a request */
				(fetcher.data as { error: string })?.error ? <div>Error: {(fetcher.data as { error: string }).error}</div> : null
			}

			{
				/* Process 8.4: Does user have premium package in basket (final process) */
				!hasSpecificPackage(packages, PREMIUM_PACKAGE_ID) ? <div>Loading or adding premium package to basket...</div> : null
			}

			{
				/* Process 8.5: Show final screen (ready) */
				isSteamLinked ? <>
						<div>Steam Linked with ID: {steamId}</div>
						<div>Onboarded as: {username}</div>
					</> : null
			}
		</>
	)
}
export default CheckoutProcess
