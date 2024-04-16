// components/organism/AuthForms/AuthForms.tsx

import { useFetcher, useLoaderData } from '@remix-run/react'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useRevalidator } from 'react-router-dom'
import AuthorizeForm from '~/components/molecules/AuthorizeForm'
import LoginForm from '~/components/molecules/LoginForm'
import SignUpForm from '~/components/molecules/SignUpForm'

type LoaderData = {
	isAuthenticated: boolean
	userToken: string | undefined
	isSteamLinked: boolean
	steamId: string | undefined
	uid: number | string
	email: string | undefined
	username: string | undefined
	isOnboarded: boolean
}


// TODO update docs for this
interface AuthFormProps {
    isOpen: boolean;
    // other props...
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
	const [isLoginForm, setIsLoginForm] = useState(true)
	const { revalidate } = useRevalidator()
	const basketCreatedRef = useRef(false);


	const switchForm = () => {
		setIsLoginForm(!isLoginForm)
	}

	const { isAuthenticated, isSteamLinked, steamId, isOnboarded, uid, username } =
		useLoaderData<LoaderData>()
		
	const fetcher = useFetcher()

	/**
	 * Handles the logout action by submitting a POST request to the "/logout" endpoint.
	 */
	const handleLogout = () => {
		fetcher.submit({}, { method: 'post', action: '/logout' })
	}

	const [isAuthorized, setIsAuthorized] = useState(false);
	const storeRequestTriggeredRef = useRef(false);
	const prevIsAuthenticated = useRef(isAuthenticated);

	useEffect(() => {
		const authorizationStatus = isAuthenticated && isOnboarded && isSteamLinked;
		setIsAuthorized(authorizationStatus);
		console.log('Authorization status updated:', authorizationStatus);

		// Reset store request trigger if logged out
		if (!isAuthenticated && prevIsAuthenticated.current) {
			storeRequestTriggeredRef.current = false;
			console.log('User logged out, reset store request trigger.');
		}
		prevIsAuthenticated.current = isAuthenticated;
	}, [isAuthenticated, isOnboarded, isSteamLinked]);

	useEffect(() => {
		if (isOpen && isAuthorized && !storeRequestTriggeredRef.current) {
			console.log('Triggering store request...');
			// Trigger store request if all conditions are met and it has not been done before
			fetcher.submit({}, { method: 'post', action: '/store' });
			storeRequestTriggeredRef.current = true;
		} else if (!isOpen) {
			// Clean up if modal is closed
			storeRequestTriggeredRef.current = false;
			console.log('Modal closed, cleaning up store request trigger.');
		}
	}, [isOpen, isAuthorized]);
	
	return (
		<>
			<div className="flex flex-col space-y-6">
				{isAuthenticated ? (
					<>
						{isSteamLinked ? (
							<div>Steam Linked with ID: {steamId}</div>
						) : (
							<AuthorizeForm />
						)}
						{username ? (
							<div>Onboarded as: {username}</div>
						) : (
							'User not onboarded'
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
							You are currently signed{' in as ' + username || '.'}.
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
