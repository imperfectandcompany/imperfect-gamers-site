// components/organism/AuthForms/AuthForms.tsx

import { useFetcher, useLoaderData } from '@remix-run/react'
import type React from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import AuthorizeForm from '~/components/molecules/AuthorizeForm'
import LoginForm from '~/components/molecules/LoginForm'
import UsernameForm from '~/components/molecules/UsernameForm'
import type { LoaderData } from '~/routes/store'
import { useFetcherWithPromise } from '~/utils/general'
import type { TebexCheckoutConfig } from '~/utils/tebex.interface'
import { CloseInterceptReason } from '../ModalWrapper/ModalWrapper'
import SignUpForm from '../SignUpForm/SignUpForm'
import UserCard from '~/components/molecules/UserCard/UserCard'
import WelcomeScreen from '../WelcomeScreen'

interface AuthFormProps {
	isOpen?: boolean
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
	setPopupWindow?: (window: Window | null) => void
	setTitle: (title: string) => void
}

const AuthForms: React.FC<AuthFormProps> = ({
	isOpen,
	setCloseInterceptReason,
	setTitle,
	setPopupWindow,
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
				setTitle('Checkout Opened')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.ActivePopup)
				}
			})

			Tebex.checkout.on(Tebex.events.CLOSE, () => {
				console.log('Tebex Checkout Closed')
				setTitle('Checkout Closed')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
			})

			Tebex.checkout.on(Tebex.events.PAYMENT_COMPLETE, () => {
				console.log('Payment Complete')
				setTitle('Payment Complete')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
			})

			Tebex.checkout.on(Tebex.events.PAYMENT_ERROR, () => {
				console.log('Payment Error')
				setTitle('Payment Error')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
			})

			Tebex.checkout.launch()
		},
		[setCloseInterceptReason],
	)

	const createBasket = async () => {
		console.log('Creating basket...')
		setTitle('Creating Basket')
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
		setTitle('Adding Package to Basket')
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

	// After user is logged in (authenticated) and onboarded (verified)
	const UserStatus = () => {
		// Step 2: Does user have a basket (required)
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

		// Step 4: Show final screen (ready)
		if (isSteamLinked) {
			return (
				<>
					<div>Steam Linked with ID: {steamId}</div>
					<div>Onboarded as: {username}</div>
				</>
			)
		}

		return (
			<AuthorizeForm
				onSuccess={handleSteamLinkSuccess}
				setCloseInterceptReason={setCloseInterceptReason}
			/>
		)
	}

	const [isInitial, setIsInitial] = useState(true)

	const handleNewUser = () => {
		setIsInitial(false)
		setIsLoginForm(!isLoginForm)
		setTitle('Sign Up')

	}
	const handleExistingUser = () => {
		setIsInitial(false)
		setIsLoginForm(isLoginForm)
		setTitle('Log In')
	}

	return (
		<>
			<div className="flex flex-col space-y-6">
				{isAuthenticated ? (
					!username ? (
						<UsernameForm setCloseInterceptReason={setCloseInterceptReason} />
					) : !isSteamLinked ? (
						<AuthorizeForm
							onSuccess={handleSteamLinkSuccess}
							setCloseInterceptReason={setCloseInterceptReason}
							setPopupWindow={setPopupWindow} // Pass setPopupWindow to AuthorizeForm
						/>
					) : (
						<UserStatus />
					)
				) : isInitial ? (
					<WelcomeScreen
						onNewUser={handleNewUser}
						onExistingUser={handleExistingUser}
					/>
				) : isLoginForm ? (
					<LoginForm setCloseInterceptReason={setCloseInterceptReason} />
				) : (
					<SignUpForm setCloseInterceptReason={setCloseInterceptReason} />
				)}
			</div>
			<div className="mx-auto mt-4 flex flex-col text-sm text-white">
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
									handleNewUser()
								}}
								className="ml-2 underline"
							>
								Sign up
							</button>
						</>
					) : (
						<>
					<p className="mt-4 text-xs text-gray-500">
					By signing up, you agree to the{' '}
					<a href="#" className="text-red-500">
						Privacy Policy
					</a>
					,{' '}
					<a href="#" className="text-red-500">
						Terms of Service
					</a>
					, and{' '}
					<a href="#" className="text-red-500">
						Imprint
					</a>
					.
				</p>

							<div className=" ju w-full  max-w-md text-sm">
								{/* <div>
									<p className="text-stone-400">
										Have an account?{' '}
										<a href="#" className="form-primary-link underline">
											Log in
										</a>
									</p>
								</div>
								<div className="mt-8 text-xs text-stone-400">
									By signing up, you agree to our{' '}
									<a
										href="https://imperfectgamers.org/terms-of-service"
										target="_blank"
										className="form-secondary-links underline"
									>
										Terms of Service
									</a>{' '}
									and{' '}
									<a
										href="https://imperfectgamers.org/privacy-policy"
										target="_blank"
										className="form-secondary-links underline"
									>
										Privacy policy
									</a>
								</div> */}
								{/* <div className="mt-4 flex items-center justify-between text-sm">
									<p className="text-gray-500">
										Already have an account?{' '}
										<a
											onClick={() => {
												handleExistingUser()
											}}
											className="text-red-500"
										>
											Sign in
										</a>
									</p>
									<p className="text-gray-500">
										<a href="#" className="text-red-500">
											Forgot password
										</a>
									</p>
								</div> */}
							</div>
						</>
					)}
				</div>
				{!isAuthenticated ? (
<></>
				) : null}
			</div>
		</>
	)
}

export default AuthForms
