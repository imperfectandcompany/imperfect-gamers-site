import {
	type MetaFunction,
	type LinksFunction,
	json,
	type LoaderFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import type { ExternalScriptsHandle } from 'remix-utils/external-scripts'
import { getSession, storeCookie } from '~/auth/storage.server'
import CookieConsent from '~/components/pending/CookieConsent'
import { getFlashMessage } from '~/components/pending/flash-session.server'
import ModalPositionContext from '~/components/pending/ModalPositionContext'
import {
	StoreContact,
	StoreEvents,
	StoreFAQ,
	StoreFooter,
	StoreHeader,
	StorePartnership,
	StoreTestimonials,
	StoreTiers,
} from '~/components/templates/store'
import StoreFeatured from '~/components/templates/store/StoreFeatured'
import StoreNavbar from '~/components/templates/StoreNavbar'
import '~/styles/store.css'
import type { BasketPackage } from '~/utils/tebex.interface'

export type LoaderData = {
	isAuthenticated: boolean
	userToken: string | null
	isSteamLinked: boolean
	steamId: string | null
	uid: number | null
	email: string | null
	username: string | null
	isOnboarded: boolean
	isPremium: boolean // Include premium status in the loader data
	basketId: string | null
	packages: BasketPackage[] | []
	checkoutUrl: string | null
	flashError?: { message: string; status: string; type: string }
	flashSuccess?: { message: string; status: string; type: string }
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'Store - Imperfect Gamers Club' },
		{ name: 'title', content: 'Premium Membership - Imperfect Gamers Club' },
		{
			name: 'description',
			content:
				'Join the Pro VIP Store and gain access to exclusive membership tiers with special benefits.',
		},
	]
}

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
		},
		{
			rel: 'stylesheet',
			href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
		},
	]
}

export let handle: ExternalScriptsHandle = {
	scripts: [
		{
			src: '/1.0.0.js', // Updated to point to Tebex
			crossOrigin: 'anonymous',
			preload: true,
		},
		// {
		// 	src: 'https://cdn.imperfectgamers.org/inc/assets/npm/widget/crate.js',
		// 	crossOrigin: 'anonymous',
		// 	preload: true,
		// },
		// {
		// 	src: "https://www.clarity.ms/tag/mcqzfowzo2",
		//   }
	],
}

// Function to load the basket ID from the cookie
async function loadBasketId(
	cookieHeader: string | null,
): Promise<string | null> {
	if (!cookieHeader) {
		return null // Early return if no cookie header is present
	}

	try {
		let storeCookies = (await storeCookie.parse(cookieHeader)) || {}
		// Ensure it does not return NaN if conversion fails
		const basketId = storeCookies.basketId
			? String(storeCookies.basketId)
			: null
		return basketId
	} catch (error) {
		console.error('Error parsing store cookie:', error)
		return null // Return null if parsing fails
	}
}

// Function to load the packages from the cookie
async function loadPackages(
	cookieHeader: string | null,
): Promise<BasketPackage[] | null> {
	if (!cookieHeader) {
		return null // Early return if no cookie header is present
	}

	try {
		let storeCookies = (await storeCookie.parse(cookieHeader)) || {}
		const packages = storeCookies.packages ? storeCookies.packages : []
		return packages
	} catch (error) {
		console.error('Error parsing store cookie:', error)
		return null // Return null if parsing fails
	}
}

// Function to load the basket ID from the cookie
async function loadCheckoutUrl(
	cookieHeader: string | null,
): Promise<string | null> {
	if (!cookieHeader) {
		return null // Early return if no cookie header is present
	}

	try {
		let storeCookies = (await storeCookie.parse(cookieHeader)) || {}
		const checkoutUrl = storeCookies.checkoutUrl
			? String(storeCookies.checkoutUrl)
			: null
		return checkoutUrl
	} catch (error) {
		console.error('Error parsing store cookie:', error)
		return null // Return null if parsing fails
	}
}

// Function to get user data from session
async function getData(cookieHeader: string | null): Promise<LoaderData> {
	const session = await getSession(cookieHeader)
	const basketId = await loadBasketId(cookieHeader)
	const checkoutUrl = await loadCheckoutUrl(cookieHeader)
	const packages = await loadPackages(cookieHeader)

	return {
		isAuthenticated: session.has('userToken'),
		userToken: session.get('userToken') ?? null,
		uid: session.get('uid') ?? null,
		email: session.get('email') ?? null,
		isSteamLinked: session.has('steamId'),
		steamId: session.get('steamId') ?? null,
		isOnboarded: session.has('username'),
		username: session.get('username') ?? null,
		isPremium: session.get('isPremium') ?? false, // Fetch and return the premium status
		basketId: basketId ?? null,
		packages: packages ?? [],
		checkoutUrl: checkoutUrl ?? null,
	}
}

/**
 * Retrieves the necessary data for the store route.
 * @param request - The incoming request object.
 * @returns An object containing information about the user's authentication status, user token, Steam linking status, Steam ID, and onboarding status.
 */
export const loader: LoaderFunction = async ({ request }) => {
	const cookieHeader = request.headers.get('Cookie')
	try {
		const data = await getData(cookieHeader)
		const flashError = await getFlashMessage(request)
		const flashSuccess = await getFlashMessage(request)

		return json({
			...data,
			flashError,
			flashSuccess,
		}) // Include basketId in the response
	} catch (error) {
		throw new Response('Data Not Found', { status: 404 })
	}
}

/**
 * Renders the Store component.
 *
 * @returns The rendered Store component.
 */
export default function Index() {
	const { flashError } = useLoaderData<LoaderData>()

	// Define the function to adjust modal position
	const adjustModalPosition = () => {
		const cookieBanner = document.querySelector('.cookie-popup') as HTMLElement
		const modal = document.getElementById('modal') as HTMLElement
		if (cookieBanner && modal) {
			if (cookieBanner.offsetHeight > 0 && window.innerWidth <= 768) {
				// Add some space above the cookie banner, for example, 20px less than the banner's height
				const adjustment = cookieBanner.offsetHeight - 160 // Reduce 20px or adjust this value as needed
				modal.style.transform = `translateY(-${adjustment}px)`
			} else {
				// Reset the modal position when the banner is not visible
				modal.style.transform = 'translateY(0)'
			}
		} else {
			modal.style.transform = 'translateY(0)'
		}
	}

	const modalRef = useRef(null)

	useEffect(() => {
		const observer = new MutationObserver(() => {
			adjustModalPosition()
		})

		if (modalRef.current) {
			observer.observe(modalRef.current, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true,
			})
		}

		return () => {
			observer.disconnect()
		}
	}, [adjustModalPosition])

	// Use effect to bind event listeners
	useEffect(() => {
		// Adjust position on window resize
		const handleResize = () => {
			adjustModalPosition()
		}
		window.addEventListener('resize', handleResize)

		// Cleanup function to remove event listener
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<>
			<StoreNavbar />
			<ModalPositionContext.Provider value={{ adjustModalPosition }}>
				{flashError &&
				(flashError.type === 'steam_authorization_error' ||
					flashError.type === 'tebex_checkout_cancel') ? (
					<div className="error-bar w-full">
						<strong>Error:</strong> {flashError.message} (Status:{' '}
						{flashError.status})
					</div>
				) : null}
				<div>
					<CookieConsent />
				</div>
				<div
					ref={modalRef}
					className="flex flex-col space-y-24 px-4 text-white sm:px-8 md:mx-72 md:space-y-12 md:px-12"
				>
					<StoreHeader />
					<StoreFeatured />
					<StoreTiers />
					<StoreTestimonials />
					<StoreFAQ />
					<StoreEvents />
					<StorePartnership />
					<StoreContact />
				</div>
				<StoreFooter />
			</ModalPositionContext.Provider>
		</>
	)
}
