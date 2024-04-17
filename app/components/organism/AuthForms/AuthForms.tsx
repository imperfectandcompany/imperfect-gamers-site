// components/organism/AuthForms/AuthForms.tsx

import { useFetcher, useLoaderData } from '@remix-run/react'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import AuthorizeForm from '~/components/molecules/AuthorizeForm'
import LoginForm from '~/components/molecules/LoginForm'
import SignUpForm from '~/components/molecules/SignUpForm'
import UsernameForm from '~/components/molecules/UsernameForm'
import type { LoaderData } from '~/routes/store'

// TODO update docs for this
interface AuthFormProps {
	isOpen?: boolean
}

/**
 * Renders the authentication forms based on the user's authentication status.
 *
 * @remarks
 * This component follows the atomic design methodology, where it is categorized as an organism component.
 * It is built using Remix React, a framework for building server-rendered React applications.
 *
 * @example
 * ```tsx
 * import AuthForms from '~/components/organism/AuthForms/AuthForms';
 *
 * const App: React.FC = () => {
 *   return (
 *     <div>
 *       <h1>Welcome to Imperfect Gamers Store</h1>
 *       <AuthForms />
 *     </div>
 *   );
 * };
 * ```
 *
 * @concept Atomic Design Methodology
 * The `AuthForms` component follows the atomic design methodology, which is a way of organizing components based on their complexity and reusability. In atomic design, components are categorized into atoms, molecules, organisms, templates, and pages. The `AuthForms` component is categorized as an organism component, which represents a combination of molecules and atoms to form a more complex UI element.
 *
 * @concept Remix React
 * Remix React is a framework for building server-rendered React applications. It provides a set of tools and conventions to simplify the development of server-rendered React applications. The `AuthForms` component is built using Remix React and leverages its features such as server-side rendering and data loading.
 *
 * @concept Modal
 * The `AuthForms` component is designed to be consumed inside a modal. A modal is a UI component that overlays the main content and is used to display additional information or perform specific actions. By integrating the `AuthForms` component inside a modal, users can interact with the authentication forms without leaving the current context or page.
 */
const AuthForms: React.FC<AuthFormProps> = ({ isOpen }) => {
	const {
		isAuthenticated,
		isSteamLinked,
		steamId,
		isOnboarded,
		username,
		basketId,
		packages,
		checkoutUrl,
	} = useLoaderData<LoaderData>()
	const [isLoginForm, setIsLoginForm] = useState(true)
	const [isAuthorized, setIsAuthorized] = useState(false)
	const storeRequestTriggeredRef = useRef(false)
	const storeSecondRequestTriggeredRef = useRef(false)
	const storeTebexCheckoutmodalTriggeredRef = useRef(false)
	const prevIsAuthenticated = useRef(isAuthenticated)
	const fetcher = useFetcher()
	const switchForm = () => {
		setIsLoginForm(!isLoginForm)
	}

	const [didBasketExist] = useState(basketId ? true : false)

	/**
	 * Handles the logout action by submitting a POST request to the "/logout" endpoint.
	 */
	const handleLogout = () => {
		fetcher.submit({}, { method: 'post', action: '/logout' })
	}



	function useTebexCheckout(checkoutId: string, theme: 'light' | 'dark') {
		if (window.Tebex) {
		const config = {
			ident: checkoutId,
			theme: theme,
		  };
		  window.Tebex.checkout.init(config);
		  window.Tebex.checkout.launch();
		}
	}

	const initiateCheckout = () => {
		if (packages && basketId && isAuthorized) {
			console.log('Checkout launching...')
			useTebexCheckout(basketId, 'dark')
		}
	}

	useEffect(() => {
		if (
			isOpen &&
			basketId &&
			isAuthorized &&
			packages &&
			!storeTebexCheckoutmodalTriggeredRef.current
		) {
			// setup some onload thing later that calls initiate checkout
			if (basketId) {
			console.log('checkout initiated')
				initiateCheckout()
			}
		}
	}, [isOpen, isAuthorized, basketId, packages, initiateCheckout])

	useEffect(() => {
		const authorizationStatus = isAuthenticated && isOnboarded && isSteamLinked
		setIsAuthorized(authorizationStatus)
		console.log('Authorization status updated:', authorizationStatus)

		// Reset store request trigger if logged out
		if (!isAuthenticated && prevIsAuthenticated.current) {
			storeRequestTriggeredRef.current = false
			console.log('User logged out, reset store request trigger.')
		}
		prevIsAuthenticated.current = isAuthenticated
	}, [isAuthenticated, isOnboarded, isSteamLinked])

	useEffect(() => {
		// Trigger store request if all conditions are met and it has not been done before
		if (
			isOpen &&
			isAuthorized &&
			!storeRequestTriggeredRef.current &&
			storeSecondRequestTriggeredRef
		) {
			if (!packages.some(pkg => pkg.id === 6154841)) {
				// Determine the correct action based on whether a basketId exists if package 6154841 is not in the packages array
				const action = didBasketExist ? '/store/add' : '/store/create'
				console.log(`Triggering store request to ${action}...`)
				fetcher.submit(null, { method: 'post', action })
			} else {
				console.log('Package already in basket, skipping store request.')
				initiateCheckout
			}

			storeRequestTriggeredRef.current = true
		} else if (!isOpen) {
			// Clean up if modal is closed
			storeRequestTriggeredRef.current = false
			storeTebexCheckoutmodalTriggeredRef.current = false
			console.log('Modal closed, cleaning up store request trigger.')
		}
	}, [
		isOpen,
		isAuthorized,
		storeRequestTriggeredRef,
		storeSecondRequestTriggeredRef,
		packages,
		didBasketExist,
		fetcher,
	])

	useEffect(() => {
		// Only attempt to add a package to the basket if the basket was created successfully for the first time
		if (
			isOpen &&
			!didBasketExist &&
			basketId &&
			isAuthorized &&
			packages &&
			!storeSecondRequestTriggeredRef.current
		) {
			// Attempt to add package to newly created basket here
			fetcher.submit(null, { method: 'post', action: '/store/add' })
			storeSecondRequestTriggeredRef.current = true
		}
	}, [
		isOpen,
		isAuthorized,
		didBasketExist,
		basketId,
		packages,
		fetcher,
		storeSecondRequestTriggeredRef,
	])

	return (
		<>
			<div className="flex flex-col space-y-6">
				{isAuthenticated ? (
					<>
						{username ? (
							isSteamLinked ? (
								<>
									<div>Steam Linked with ID: {steamId}</div>
									<div>Onboarded as: {username}</div>
								</>
							) : (
								<AuthorizeForm />
							)
						) : (
							<UsernameForm />
						)}
					</>
				) : isLoginForm ? (
					<LoginForm />
				) : (
					<SignUpForm />
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