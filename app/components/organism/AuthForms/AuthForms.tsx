// components/organism/AuthForms/AuthForms.tsx

import { useFetcher, useLoaderData } from '@remix-run/react'
import type React from 'react'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import AuthorizeForm from '~/components/molecules/AuthorizeForm'
import LoginForm from '~/components/molecules/LoginForm'
import UsernameForm from '~/components/molecules/UsernameForm'
import type { LoaderData } from '~/routes/store'
import { useFetcherWithPromise } from '~/utils/general'
import type { TebexCheckoutConfig } from '~/utils/tebex.interface'
import ModalWrapper, {
	CloseInterceptReason,
} from '../ModalWrapper/ModalWrapper'
import SignUpForm from '../SignUpForm/SignUpForm'
import WelcomeScreen from '../WelcomeScreen'
import ProcessProvider from '~/components/pending/ProcessProvider'
import Button from '~/components/atoms/Button/Button'
import CheckoutProcess from '~/components/molecules/CheckoutProcess/CheckoutProcess'

interface AuthFormProps {
	setPopupWindow?: (window: Window | null) => void
}

const AuthForms: React.FC<AuthFormProps> = ({
	setPopupWindow,
}) => {
	const {
		isAuthenticated,
		isSteamLinked,
		username,
	} = useLoaderData<LoaderData>()
	const [isLoginForm, setIsLoginForm] = useState(true)
	const fetcher = useFetcher()


	const handleLogout  = useCallback(() => {
		fetcher.submit({}, { method: 'post', action: '/logout' })
	}, []);

	const [isInitial, setIsInitial] = useState(true)

	const handleNewUser = useCallback(() => {
		setIsInitial(isInitial => isInitial ? false : isInitial);
		setIsLoginForm(false);
		setTitle('Sign Up');
	  }, []);
	  
	//   useBackAction(() => {
	//     console.log('Back action triggered');
	//     // Define what should happen when back is clicked
	//     // For example, navigate to a previous page, close the modal, etc.
	//   });

	const handleSteamLinkSuccess = useCallback(() => {
		setIsAuthorized(true)
	}, [])
	
	const [isAuthorized, setIsAuthorized] = useState(false)
	

	const handleExistingUser = useCallback(() => {
		setIsInitial(isInitial => isInitial ? false : isInitial);
		setIsLoginForm(true);
		setTitle('Log In');
	  }, []);

	  const [title, setTitle] = useState('Imperfect Gamers');

	  const defaultTitle = useMemo(() => isAuthenticated && username && isSteamLinked ? `Join The Club, ${username}` : 'Imperfect Gamers', [isAuthenticated, username, isSteamLinked]);

	  useEffect(() => {
		setTitle(defaultTitle);
	  }, [defaultTitle]);


	return (
		<>
			<ProcessProvider>
				<ModalWrapper
					title={title}
					content={
						!isAuthenticated
						? isInitial
						  ? <WelcomeScreen isAuthenticated={isAuthenticated} onNewUser={handleNewUser} onExistingUser={handleExistingUser} />
						  : isLoginForm
							? <LoginForm />
							: <SignUpForm />
						: !username
						  ? <UsernameForm />
						  : !isSteamLinked
							? <AuthorizeForm onSuccess={() => handleSteamLinkSuccess()}  setPopupWindow={setPopupWindow} />
							: <CheckoutProcess />
					}
					footer={
						<Footer
							isAuthenticated={isAuthenticated}
							username={username || undefined}
							isInitial={isInitial}
							isLoginForm={isLoginForm}
							handleLogout={handleLogout}
							handleNewUser={handleNewUser}
						/>	
					}
				>
					<Button>Join Now</Button>
				</ModalWrapper>
			</ProcessProvider>
		</>
	)
}

// Define FooterProps Interface
interface FooterProps {
	isAuthenticated: boolean;
	username?: string;
	isLoginForm: boolean;
	isInitial: boolean;
	handleLogout: () => void;
	handleNewUser: () => void;
  }

const Footer: React.FC<FooterProps> = ({ isAuthenticated, username, isLoginForm, isInitial, handleLogout, handleNewUser }) => (
  <div className="mx-auto mt-4 flex flex-col text-sm text-white">
		<div>
			{isAuthenticated && username ? (
				<>
					You are currently signed in{username ? ' as ' + username : ''}.
					<button onClick={handleLogout} className="ml-1 underline">
						Log out
					</button>
				</>
			) : isLoginForm && !isInitial ? (
				<>
					Don&apos;t have an account?{' '}
					<button onClick={handleNewUser} className="ml-2 underline">
						Sign up
					</button>
				</>
			) : (
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
			)}
		</div>
		{!isAuthenticated ? <></> : null}
	</div>
)

export default AuthForms
