import {
	type MetaFunction,
	type LinksFunction,
	json,
	type LoaderFunction,
	ActionFunction,
	createCookie,
} from '@remix-run/node'
import { getSession, storeCookie } from '~/auth/storage.server' // Make sure this matches your file structure
import { StoreHeader } from '~/components/templates/store'
import '~/styles/store.css'
import { AddPackageToBasket, createTebexBasket } from '~/utils/tebex.server'
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'
import { namedAction } from 'remix-utils/named-action'
import { z } from 'zod'
import { BasketPackage } from '~/utils/tebex.interface'

export type LoaderData = {
	isAuthenticated: boolean
	userToken: string | null
	isSteamLinked: boolean
	steamId: number | null
	uid: number | null
	email: string | null
	username: string | null
	isOnboarded: boolean
	basketId: string | null // Assuming basketId is a string, null if not present
	packages: BasketPackage[] | []
	checkoutUrl: string | null
}

export const meta: MetaFunction = () => {
	return [
		{ name: 'title', content: 'Membership Club - Imperfect Gamers' },
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
	const data = await getData(cookieHeader)

	return json(data) // Include basketId in the response
}

/**
 * Renders the Store component.
 *
 * @returns The rendered Store component.
 */
export default function Store() {
	return (
		<>
			<StoreHeader />

			{/* Hidden while we focus on everything else 

			<div className="flex flex-wrap justify-between">
				<StoreStatistics />
				<StoreTiers />
				<FeaturedSection />
				<StoreTestimonials />
				<StoreFAQ />
				<StorePartnership />
				<StoreEvents />
				<StoreContact />
				<StoreFooter />
			</div>
			
			*/}
		</>
	)
}
