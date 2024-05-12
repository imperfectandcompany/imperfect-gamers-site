// components/organism/AuthForms/AuthForms.tsx

import { useFetcher, useLoaderData } from '@remix-run/react'
import type React from 'react'
import { useEffect, useState, useCallback, useMemo } from 'react'
import AuthorizeForm from '~/components/molecules/AuthorizeForm'
import LoginForm from '~/components/molecules/LoginForm'
import UsernameForm from '~/components/molecules/UsernameForm'
import type { LoaderData } from '~/routes/store'
import ModalWrapper, {
} from '../ModalWrapper/ModalWrapper'
import SignUpForm from '../SignUpForm/SignUpForm'
import WelcomeScreen from '../WelcomeScreen'
import ProcessProvider from '~/components/pending/ProcessProvider'
import Button from '~/components/atoms/Button/Button'
import CheckoutProcess from '~/components/molecules/CheckoutProcess/CheckoutProcess'
import ImperfectAndCompanyLogo from '~/components/atoms/ImperfectAndCompanyLogo'

interface AuthFormProps {
	setPopupWindow?: (window: Window | null) => void
}

const AuthForms: React.FC<AuthFormProps> = ({ setPopupWindow }) => {
	const { isAuthenticated, isSteamLinked, username } =
		useLoaderData<LoaderData>()
	const [isLoginForm, setIsLoginForm] = useState(true)
	const fetcher = useFetcher()

	const handleLogout = useCallback(() => {
		fetcher.submit({}, { method: 'post', action: '/logout' })
	}, [])

	const [isInitial, setIsInitial] = useState(true)

	//   useBackAction(() => {
	//     console.log('Back action triggered');
	//     // Define what should happen when back is clicked
	//     // For example, navigate to a previous page, close the modal, etc.
	//   });

	const handleSteamLinkSuccess = useCallback(() => {
		setIsAuthorized(true)
	}, [])

	const [isAuthorized, setIsAuthorized] = useState(false)

// Define an enum for the page titles
enum PageTitle {
	Welcome = 'Imperfect Gamers',
	Login = 'Log In',
	Signup = 'Sign Up',
	Username = 'Join The Club',
  }
  
  const [title, setTitle] = useState(PageTitle.Welcome);
  const [pageHistory, setPageHistory] = useState<PageTitle[]>([PageTitle.Welcome]);
  
  const defaultTitle = useMemo(
	() =>
	  isAuthenticated && username && isSteamLinked
		? `${PageTitle.Username}, ${username}`
		: PageTitle.Welcome,
	[isAuthenticated, username, isSteamLinked],
  );
  
  const stringToPageTitle = (title: string): PageTitle => {
	if (title.startsWith('Join The Club')) {
	  return PageTitle.Username;
	}
  
	switch (title) {
	  case 'Imperfect Gamers':
		return PageTitle.Welcome;
	  case 'Log In':
		return PageTitle.Login;
	  case 'Sign Up':
		return PageTitle.Signup;
	  default:
		throw new Error(`Invalid title: ${title}`);
	}
  };
  
  useEffect(() => {
	setTitle(stringToPageTitle(defaultTitle));
  }, [defaultTitle]);
  
  const handleNewUser = useCallback(() => {
	setIsInitial(isInitial => (isInitial ? false : isInitial));
	setIsLoginForm(false);
	setTitle(PageTitle.Signup);
  }, []);
  
  const handleExistingUser = useCallback(() => {
	setIsInitial(isInitial => (isInitial ? false : isInitial));
	setIsLoginForm(true);
	setTitle(PageTitle.Login);
	setPageHistory(prevHistory => [...prevHistory, PageTitle.Login]);
  }, []);
  
  const handleBack = () => {
	if (pageHistory.length > 1) {
	  const newPageHistory = pageHistory.slice(0, -1);
	  setPageHistory(newPageHistory);
	  const prevPage = newPageHistory[newPageHistory.length - 1];
	  setTitle(stringToPageTitle(prevPage));
  
	  switch (prevPage) {
		case PageTitle.Welcome:
		  setIsLoginForm(true);
		  setIsInitial(true);
		  break;
		case PageTitle.Login:
		  setIsLoginForm(true);
		  setIsInitial(false);
		  break;
		case PageTitle.Signup:
		  setIsLoginForm(false);
		  setIsInitial(false);
		  break;
	  }
	}
  };
  
  useEffect(() => {
	if (pageHistory[pageHistory.length - 1] !== title) {
	  setPageHistory(prevHistory => [...prevHistory, title]);
	}
  }, [title]);

	return (
		<>
			<ProcessProvider>
				<ModalWrapper
					title={title}
					onBack={isAuthenticated || isInitial ? undefined : handleBack}
					content={
						!isAuthenticated ? (
							isInitial ? (
								<WelcomeScreen
									isAuthenticated={isAuthenticated}
									onNewUser={handleNewUser}
									onExistingUser={handleExistingUser}
								/>
							) : isLoginForm ? (
								<LoginForm />
							) : (
								<SignUpForm />
							)
						) : !username ? (
							<UsernameForm />
						) : !isSteamLinked ? (
							<AuthorizeForm
								onSuccess={() => handleSteamLinkSuccess()}
								setPopupWindow={setPopupWindow}
							/>
						) : (
							<CheckoutProcess />
						)
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
					isResponsive={!isAuthenticated && isInitial}  // Set true only if showing WelcomeScreen
				>
					<Button>Join Now</Button>
				</ModalWrapper>
			</ProcessProvider>
		</>
	)
}

// Define FooterProps Interface
interface FooterProps {
	isAuthenticated: boolean
	username?: string
	isLoginForm: boolean
	isInitial: boolean
	handleLogout: () => void
	handleNewUser: () => void
}

const Footer: React.FC<FooterProps> = ({
	isAuthenticated,
	username,
	isLoginForm,
	isInitial,
	handleLogout,
	handleNewUser,
}) => (
	<div className="mx-auto mt-4 flex flex-col text-sm text-white">
		<div>
			{isAuthenticated && username ? (
				<>
					You are currently signed in{username ? ' as ' + username : ''}.
					<button onClick={handleLogout} className="ml-1 underline">
						Log out
					</button>
				</>
			) : !isInitial && !isAuthenticated && isLoginForm ? (
				<>
					{/* commented out until design decision is finalized */}
					{/* Don&apos;t have an account?{' '}
          <button onClick={handleNewUser} className="ml-2 underline">
            Sign up
          </button> */}
				</>
			) : !isInitial && !isAuthenticated ? (
				<>
					<p className="mt-4 select-none text-xs text-gray-500">
						By signing up, you agree to the{' '}
						<a
							href="https://imperfectgamers.org/privacy-policy"
							target="_blank"
							className="select-none text-red-500"
						>
							Privacy Policy
						</a>
						,{' '}
						<a
							href="https://imperfectgamers.org/terms-of-service"
							target="_blank"
							className="select-none text-red-500"
						>
							Terms of Service
						</a>
						, and{' '}
						<a
							href="https://imperfectgamers.org/imprint"
							target="_blank"
							className="select-none text-red-500"
						>
							Imprint
						</a>
						.
					</p>{' '}
				</>
			) : isInitial && !isAuthenticated ? (
				<p className="flex select-none items-center text-xs text-gray-500">
					Powered by&nbsp;
					<a
						href="https://imperfectandcompany.com/"
						target="_blank"
						className="flex select-none items-center text-red-500"
						style={{ alignItems: 'center' }}
					>
						Imperfect and Company LLC
						<ImperfectAndCompanyLogo />
					</a>
				</p>
			) : null}
		</div>
	</div>
)

export default AuthForms
