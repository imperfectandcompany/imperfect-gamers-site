import {
	type MetaFunction,
	type LinksFunction,
	json,
	type LoaderFunction,
	ActionFunction,
	TypedResponse,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getSession, store } from '~/auth/storage.server' // Make sure this matches your file structure
import { StoreHeader } from '~/components/templates/store'
import '~/styles/store.css'
import { createTebexBasket } from '~/utils/tebex.server'
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'

export type LoaderData = {
	isAuthenticated: boolean
	userToken: string | null
	isSteamLinked: boolean
	steamId: number | null
	uid: number | null
	email: string | null
	username: string | null
	isOnboarded: boolean
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

async function getData({ request }: { request: Request }): Promise<LoaderData> {
	const session = await getSession(request.headers.get('Cookie'))

	const data: LoaderData = {
		isAuthenticated: session.has('userToken'),
		userToken: session.get('userToken') ?? null,
		uid: JSON.parse(JSON.stringify(session.get('uid'))) ?? null,
		email: session.get('email') ?? null,
		isSteamLinked: session.has('steamId'),
		steamId: JSON.parse(JSON.stringify(session.get('steamId'))) ?? null,
		isOnboarded: session.has('username'),
		username: session.get('username') ?? null,
	}

	return data
}

/**
 * Retrieves the necessary data for the store route.
 * @param request - The incoming request object.
 * @returns An object containing information about the user's authentication status, user token, Steam linking status, Steam ID, and onboarding status.
 */
export const loader: LoaderFunction = async ({ request }) => {
	const data = await getData({ request })
	return data
}

export let action: ActionFunction = async ({ request }) => {
	const cookieHeader = request.headers.get('Cookie')

	const session = await getSession(cookieHeader)
	const userId = session.get('uid')
	const data = await getData({ request })

	// Ensure user is authenticated
	if (!userId) {
		return json({ error: 'User must be authenticated' }, { status: 401 })
	}
	// TODO update docs to explain how we use remix-utils library to get client IP address (along is is-ip)
	// NOTE On local development the function is most likely to return null. This is because the browser doesn't send any of the above headers
	let ipAddress = process.env.NODE_ENV === "development" ? "1.3.3.7" : getClientIPAddress(request.headers);

	// Automatically create a basket if the user is logged in
	if (data && data.uid && data.username && data.steamId && ipAddress) {
		try {
			const basketResponse = await createTebexBasket(
				data.uid,
				data.username,
				data.steamId,
				ipAddress,
			)
			if (basketResponse) {
				// Store basket details in the session or where appropriate
				//const storeCookies = (await store.parse(cookieHeader)) || {}
				//	storeCookies.basketId = basketResponse.data.basketId
				return null
				// Handle success scenario, e.g., redirect to checkout
			} else {
				// Handle error scenario
				return json({ error: "TODO WRITE ERROR" }, { status: 400 })
			}
		} catch (error: unknown) {
			// Note that we use `unknown` here
			// We check if error is an instance of Error
			if (error instanceof Error) {
				return json({ error: error.message }, { status: 500 })
			} else {
				// If it's not an Error instance, you can return a generic error message
				return json({ error: 'An unexpected error occurred' }, { status: 500 })
			}
		}
	} else {
		return json({ error: 'Missing required data' }, { status: 400 })
	}
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
