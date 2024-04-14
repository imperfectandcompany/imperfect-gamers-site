// components/organism/AuthForms/AuthForms.tsx

import {useFetcher, useLoaderData} from '@remix-run/react';
import React, {useEffect, useState} from 'react';
import {useRevalidator} from 'react-router-dom';
import Button from '~/components/atoms/Button/Button';
import AuthorizeForm from '~/components/molecules/AuthorizeForm';
import LoginForm from '~/components/molecules/LoginForm';
import SignUpForm from '~/components/molecules/SignUpForm';

type LoaderData = {
	isAuthenticated: boolean;
	userToken: string | undefined;
	isSteamLinked: boolean;
	steamId: string | undefined;
	username: string | undefined;
};

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
 *       <h1>Welcome to My App</h1>
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
const AuthForms: React.FC = () => {
	const [isLoginForm, setIsLoginForm] = useState(true);
	const {revalidate} = useRevalidator();

	const switchForm = () => {
		setIsLoginForm(!isLoginForm);
	};

	const {isAuthenticated, userToken, isSteamLinked, steamId, username} =
    useLoaderData<LoaderData>();
	const fetcher = useFetcher();

	/**
   * Handles the logout action by submitting a POST request to the "/logout" endpoint.
   */
	const handleLogout = () => {
		fetcher.submit({}, {method: 'post', action: '/logout'});
	};

	useEffect(() => {
		const handleMessage = (event: {
			origin: string;
			data: {type: string};
		}) => {
			if (event.origin !== window.location.origin) return;

			if (event.data?.type === 'steam-auth-success') {
				// Fetch the updated session data
				revalidate(); // This re-triggers the loader
			}
		};

		window.addEventListener('message', handleMessage);
		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [revalidate]);

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
			<div className="flex flex-col text-center mt-4 text-sm text-white mx-auto">
				<div>
					{isAuthenticated ? (
						<>
              You are currently signed{' in as ' + username || '.'}.
							<button onClick={handleLogout} className="underline">
                Log out
							</button>
						</>
					) : isLoginForm ? (
						<>
              Don't have an account?{' '}
							<button
								onClick={() => {
									switchForm();
								}}
								className="underline ml-2"
							>
                Sign up
							</button>
						</>
					) : (
						<>
              Already have an account?
							<button
								onClick={() => {
									switchForm();
								}}
								className="underline ml-2"
							>
                Sign in
							</button>
						</>
					)}
				</div>
				{!isAuthenticated && <div className="underline">Forgot password</div>}
			</div>
		</>
	);
};

export default AuthForms;
