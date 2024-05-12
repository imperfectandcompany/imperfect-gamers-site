// Inside the CheckoutProcess, we have the following components:

// CheckoutProcess.tsx: This component handles the overall checkout process, including creating the basket, adding packages, and initiating the Tebex checkout.
// BasketManager.tsx: This component handles the logic for creating and managing the basket.
// PackageManager.tsx: This component handles the logic for adding and removing packages from the basket.
// TebexCheckout.tsx: This component handles the integration with Tebex and initiate the checkout process.

// The CheckoutProcess component combines the BasketManager, PackageManager, and TebexCheckout components to provide the complete checkout flow. It manages the state of the basket ID and packages, and passes them down to the respective components.
// The setCloseInterceptReason prop is passed down to the TebexCheckout component to handle the modal close intercept reason based on the Tebex checkout events.

// components/molecules/CheckoutProcess/CheckoutProcess.tsx
import React, { useEffect, useState } from 'react'
import { useFetcher, useLoaderData } from '@remix-run/react'
import type { LoaderData } from '~/routes/store'
import BasketManager from './BasketManager'
import PackageManager from './PackageManager'
import TebexCheckout from './TebexCheckout'
import { CloseInterceptReason } from '~/components/organism/ModalWrapper/ModalWrapper'

interface CheckoutProcessProps {
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

const CheckoutProcess: React.FC<CheckoutProcessProps> = ({
	setCloseInterceptReason,
}) => {
	const { basketId, packages, username, steamId } = useLoaderData<LoaderData>()
	const [currentBasketId, setCurrentBasketId] = useState(basketId)
	const [currentPackages, setCurrentPackages] = useState(packages)
	const fetcher = useFetcher()

	const renderCheckoutProcess = () => {
		// Step 1: Does user have a basket (required)
		if (!basketId) {
			return <div>Loading or creating your basket...</div>
		}

		// Check if fetching data or processing a request
		if (fetcher.state === 'loading') {
			return <div>Processing...</div>
		}

		// Check if fetching data or processing a request
		if ((fetcher.data as { error: string })?.error) {
			return <div>Error: {(fetcher.data as { error: string }).error}</div>
		}

		// Step 3: Does user have premium package in basket (final process)
		if (!packages.some(pkg => pkg.id === 6154841)) {
			return <div>Loading or adding premium package to basket...</div>
		}

		// Step 4: Show final screen (during checkout)
			return (
				<>
					<div>Steam Linked with ID: {steamId}</div>
					<div>Onboarded as: {username}</div>
				</>
			)
	}

	useEffect(() => {
		setCurrentBasketId(basketId)
		setCurrentPackages(packages)
	}, [basketId, packages])

	return (
		<>
        {renderCheckoutProcess()}
			<BasketManager
				basketId={currentBasketId}
				setBasketId={setCurrentBasketId}
			/>
			<PackageManager
				basketId={currentBasketId}
				packages={currentPackages}
				setPackages={setCurrentPackages}
			/>
			<TebexCheckout
				basketId={currentBasketId}
				packages={currentPackages}
				setCloseInterceptReason={setCloseInterceptReason}
			/>
		</>
	)
}

export default CheckoutProcess
