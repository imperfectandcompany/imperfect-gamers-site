// components/organism/AuthForms/AuthForms.tsx

import { useFetcher, useLoaderData } from '@remix-run/react'
import type React from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import AuthorizeForm from '~/components/molecules/AuthorizeForm'
import LoginForm from '~/components/molecules/LoginForm'
import SignUpForm from '~/components/molecules/SignUpForm'
import UsernameForm from '~/components/molecules/UsernameForm'
import type { LoaderData } from '~/routes/store'
import { useFetcherWithPromise } from '~/utils/general'
import type { TebexCheckoutConfig } from '~/utils/tebex.interface'
import { CloseInterceptReason } from '../ModalWrapper/ModalWrapper'

interface AuthFormProps {
	isOpen?: boolean
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

const AuthForms: React.FC<AuthFormProps> = ({ isOpen, setCloseInterceptReason }) => {
	const {
		isAuthenticated,
		isSteamLinked,
		steamId,
		isOnboarded,
		username,
		basketId,
		packages = [],
	} = useLoaderData<LoaderData>()
	const [isLoginForm, setIsLoginForm] = useState(true)
	const [isAuthorized, setIsAuthorized] = useState(false)
	const storeRequestTriggeredRef = useRef(false)
	const { submit } = useFetcherWithPromise()
	const prevIsAuthenticated = useRef(isAuthenticated)
	const fetcher = useFetcher()
	const prevIsOpen = useRef(isOpen)

	const [basketExists, setBasketExists] = useState(!!basketId)

	useEffect(() => {
		setBasketExists(!!basketId)
	}, [basketId])

	const handleLogout = () => {
		fetcher.submit({}, { method: 'post', action: '/logout' })
	}

	const switchForm = () => {
		setIsLoginForm(!isLoginForm)
	}

	const UseTebexCheckout = useCallback(
		(checkoutId: string, theme: 'light' | 'dark') => {
			const { Tebex } = window
			if (!Tebex) return

			const config: TebexCheckoutConfig = {
				ident: checkoutId,
				theme: theme,
			}

			Tebex.checkout.init(config)
			Tebex.checkout.launch()

			Tebex.checkout.on(Tebex.events.PAYMENT_COMPLETE, event => {
				// Handle payment completion here
			})

			Tebex.checkout.on(Tebex.events.PAYMENT_ERROR, event => {
				// Handle payment error here
			})

			Tebex.checkout.on(Tebex.events.CLOSE, event => {
				// Handle modal close here
				console.log('Tebex Event Handler Close')
			})

			Tebex.checkout.on(Tebex.events.OPEN, event => {
				// Handle modal open here
				console.log('Tebex Event Handler Open')
			})
		},
		[],
	)

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

	const initiateCheckout = (basketId: string) => {
		console.log('Initiating checkout...')
		UseTebexCheckout(basketId, 'dark')
	}

	const handleStoreInteractions = useCallback(async () => {
		if (!isAuthorized || !isOpen) return

		let localBasketId = basketId
		let localPackages = packages

		// Step 1: Create the basket if it doesn't exist
		if (!localBasketId) {
			const result = await createBasket()
			if (result) {
				localBasketId = result // Update the package with the response
				setBasketExists(true)
			}
		}

		// Step 2: Add a package if it's not already in the basket
		if (localBasketId && !packages.some(pkg => pkg.id === 6154841)) {
			const result = await addPackageToBasket(localBasketId)
			if (result) {
				localPackages = result // Update the package with the response
			}
		}

		// Step 3: Initiate checkout
		if (localBasketId && localPackages.some(pkg => pkg.id === 6154841)) {
			initiateCheckout(localBasketId)
		}
	}, [basketId, packages, isAuthorized, isOpen, UseTebexCheckout, submit])

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

	const handleSteamLinkSuccess = useCallback(() => {
		setIsAuthorized(true)
	}, [])

	const UserStatus = () => {
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

		if (!packages.some(pkg => pkg.id === 6154841)) {
			return <div>Loading or adding premium package to basket...</div>
		}

		if (!username) {
			return <UsernameForm />
		}

		if (isSteamLinked) {
			return (
				<>
					<div>Steam Linked with ID: {steamId}</div>
					<div>Onboarded as: {username}</div>
				</>
			)
		}

		return <AuthorizeForm onSuccess={handleSteamLinkSuccess} />
	}

	return (
		<>
			<div className="flex flex-col space-y-6">
				{isAuthenticated ? (
					<UserStatus />
				) : isLoginForm ? (
				<LoginForm setCloseInterceptReason={setCloseInterceptReason} />
				) : (
					<SignUpForm setCloseInterceptReason={setCloseInterceptReason} />
				)}
			</div>
			<div className="mx-auto mt-4 flex flex-col text-center text-sm text-white">
				<div>
					{isAuthenticated ? (
						<>
							You are currently signed in{username ? ' as ' + username : ''}.
							<button onClick={handleLogout} className="ml-1 underline">
								Log out
							</button>
						</>
					) : isLoginForm ? (
						<>
							Don&apos;t have an account?{' '}
							<button
								onClick={() => {
									switchForm()
								}}
								className="ml-2 underline"
							>
								Sign up
							</button>
						</>
					) : (
						<>
							Already have an account?
							<button
								onClick={() => {
									switchForm()
								}}
								className="ml-2 underline"
							>
								Sign in
							</button>
						</>
					)}
				</div>
				{!isAuthenticated ? (
					<div className="underline">Forgot password</div>
				) : null}
			</div>
		</>
	)
}

export default AuthForms
