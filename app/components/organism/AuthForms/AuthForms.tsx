// components/organism/AuthForms/AuthForms.tsx

import { useFetchers, useLoaderData } from '@remix-run/react'
import type React from 'react'
import { useEffect, useState, useCallback, useMemo } from 'react'
import Button from '~/components/atoms/Button/Button'
import ImperfectAndCompanyLogo from '~/components/atoms/ImperfectAndCompanyLogo'
import AuthorizeForm from '~/components/molecules/AuthorizeForm'
import CheckoutProcess from '~/components/molecules/CheckoutProcess/CheckoutProcess'
import { LoginForm } from '~/components/molecules/LoginForm'
import UsernameForm from '~/components/molecules/UsernameForm'
import ProcessProvider from '~/components/pending/ProcessProvider'
import type { LoaderData } from '~/routes/store'
import { useFetcherWithPromiseAutoReset } from '~/utils/general'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import SignUpForm from '../SignUpForm/SignUpForm'
import WelcomeScreen from '../WelcomeScreen'

// Define an enum for the page titles
enum PageTitle {
	Welcome = 'Imperfect Gamers Club',
	Login = 'Log In',
	Signup = 'Sign Up',
	LoggedIn = 'Join The Club',
	SetUsername = 'Username - 1/2',
	LinkSteam = 'Steam - 2/2',
}

const AuthForms: React.FC = () => {
	const { isAuthenticated, isSteamLinked, username } =
		useLoaderData<LoaderData>()
	const [isLoginForm, setIsLoginForm] = useState(true)
	const { submit } = useFetcherWithPromiseAutoReset({
		key: 'logout-submission',
	})
	const fetchers = useFetchers()

	const relevantFetchers = fetchers.filter(fetcher => {
		return [
			`/auth/check/username`,
			`/auth/finalize/username`,
			`/auth/check/steam`,
			`/auth/steam`,
			`/register`,
			`/login`,
			`/logout`,
			`/store/add`,
			`/store/create`,
		].some(path => fetcher.formAction?.startsWith(path))
	})

	// Get an array of all in-flight fetchers and their states
	const inFlightFetchers = relevantFetchers.map(fetcher => ({
		formData: fetcher.formData,
		state: fetcher.state,
	}))

	// Check if any fetcher is loading or submitting
	const isInProgress = useMemo(() => {
		return inFlightFetchers.some(fetcher =>
			['loading', 'submitting'].includes(fetcher.state),
		)
	}, [inFlightFetchers])

	const handleLogout = useCallback(async () => {
		// Logout logic
		try {
			await submit({}, { method: 'post', action: '/logout' })
			setIsInitial(false)
			setIsLoginForm(true)
			setTitle(PageTitle.Login) // Update the title immediately
			setPageHistory([PageTitle.Welcome, PageTitle.Login])
		} catch (error) {
			// Handle the error
			console.error('An error occurred:', error)
		}
	}, [])

	const [isInitial, setIsInitial] = useState(true)

	const [title, setTitle] = useState(PageTitle.Welcome)
	const [pageHistory, setPageHistory] = useState<PageTitle[]>([
		PageTitle.Welcome,
	])

	const initialLoggedInPageTitle = useMemo(() => {
		//if user is not authenticated
		if (isAuthenticated) {
			// if user doesn't have a username
			if (!username) {
				return PageTitle.SetUsername
			}
			// if user doesn't have a steam linked
			if (!isSteamLinked) {
				return PageTitle.LinkSteam
			}
			// if user isn't logged in
			return PageTitle.LoggedIn
		} else {
			return title
		}
	}, [
		isAuthenticated,
		username,
		isSteamLinked,
		PageTitle.SetUsername,
		PageTitle.LinkSteam,
		PageTitle.LoggedIn,
		title,
	])

	useEffect(() => {
		setTitle(initialLoggedInPageTitle)
	}, [initialLoggedInPageTitle])

	const handleNewUser = useCallback(() => {
		setIsInitial(isInitial => (isInitial ? false : isInitial))
		setIsLoginForm(false)
		setTitle(PageTitle.Signup)
	}, [])

	const handleExistingUser = useCallback(() => {
		setIsInitial(isInitial => (isInitial ? false : isInitial))
		setIsLoginForm(true)
		setTitle(PageTitle.Login)
		setPageHistory(prevHistory => [...prevHistory, PageTitle.Login])
	}, [])

	const handleBack = () => {
		if (pageHistory.length > 1) {
			const newPageHistory = pageHistory.slice(0, -1)
			setPageHistory(newPageHistory)
			const prevPage = newPageHistory[newPageHistory.length - 1]
			setTitle(prevPage)

			switch (prevPage) {
				case PageTitle.Welcome:
					setIsLoginForm(true)
					setIsInitial(true)
					break
				case PageTitle.Login:
					setIsLoginForm(true)
					setIsInitial(false)
					break
				case PageTitle.Signup:
					setIsLoginForm(false)
					setIsInitial(false)
					break
			}
		}
	}

	useEffect(() => {
		if (pageHistory[pageHistory.length - 1] !== title) {
			setPageHistory(prevHistory => [...prevHistory, title])
		}
	}, [title])

	return (
		<>
			<ProcessProvider>
				<ModalWrapper
					title={title}
					onBack={
						!isInProgress
							? !isAuthenticated && !isInitial
								? handleBack
								: isAuthenticated
									? handleLogout
									: undefined
							: undefined
					}
					backButtonTitle={
						!isAuthenticated && !isInitial
							? 'Back'
							: isAuthenticated
								? 'Log Out'
								: undefined
					}
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
							<AuthorizeForm />
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
						/>
					}
					isResponsive={!isAuthenticated ? isInitial : false} // Set true only if showing WelcomeScreen
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
}

const Footer: React.FC<FooterProps> = ({
	isAuthenticated,
	username,
	isLoginForm,
	isInitial,
}) => (
	<div className="mx-auto mt-4 flex flex-col text-sm text-white">
		<div>
			{isAuthenticated && username ? (
				<>You are currently signed in{username ? ' as ' + username : ''}.</>
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
					<p className="mt-4 select-none text-xs text-stone-500">
						By signing up, you agree to the{' '}
						<a
							href="https://imperfectgamers.org/privacy-policy"
							target="_blank"
							className="select-none text-red-500/70"
							rel="noreferrer"
						>
							Privacy Policy
						</a>
						,{' '}
						<a
							href="https://imperfectgamers.org/terms-of-service"
							target="_blank"
							className="select-none text-red-500/70"
							rel="noreferrer"
						>
							Terms of Service
						</a>
						, and{' '}
						<a
							href="https://imperfectgamers.org/imprint"
							target="_blank"
							className="select-none text-red-500/70"
							rel="noreferrer"
						>
							Imprint
						</a>
						.
					</p>{' '}
				</>
			) : isInitial && !isAuthenticated ? (
				<p className="flex select-none justify-center text-xs text-stone-500">
					Powered by&nbsp;
					<a
						href="https://imperfectandcompany.com/"
						target="_blank"
						className="flex select-none items-center text-red-500/70"
						style={{ alignItems: 'center' }}
						rel="noreferrer"
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
