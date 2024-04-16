import {
	type MetaFunction,
	type LinksFunction,
	json,
	type LoaderFunction,
	ActionFunction,
} from '@remix-run/node'
import { getSession } from '~/auth/storage.server' // Make sure this matches your file structure
import { StoreHeader } from '~/components/templates/store'
import '~/styles/store.css'
import { createTebexBasket } from '~/utils/tebex.server'

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

/**
 * Retrieves the necessary data for the store route.
 * @param request - The incoming request object.
 * @returns An object containing information about the user's authentication status, user token, Steam linking status, Steam ID, and onboarding status.
 */
export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get('Cookie'))
	return json({
		isAuthenticated: session.has('userToken'),
		userToken: session.get('userToken') ?? null,
		uid: session.get('uid') ?? null,
		email: session.get('email') ?? null,
		isSteamLinked: session.has('steamId'),
		steamId: session.get('steamId') ?? null,
		isOnboarded: session.has('username'),
		username: session.get('username') ?? null,
	})
}

export let action: ActionFunction = async ({ request }) => {
	const cookieHeader = request.headers.get('Cookie')

	const session = await getSession(cookieHeader)
	const userId = session.get('uid')
	const packageId = '1'

	// Ensure user is authenticated
	if (!userId) {
		return json({ error: 'User must be authenticated' }, { status: 401 })
	}

  // Automatically create a basket if the user is logged in
  if (userId && packageId) {
    try {
      const basketResponse = await createTebexBasket(userId, packageId);

      if (basketResponse.success && basketResponse.data) {
        // Handle success scenario, e.g., redirect to checkout
      } else {
        // Handle error scenario
        return json({ error: basketResponse.error }, { status: 400 });
      }
    } catch (error: unknown) { // Note that we use `unknown` here
      // We check if error is an instance of Error
      if (error instanceof Error) {
        return json({ error: error.message }, { status: 500 });
      } else {
        // If it's not an Error instance, you can return a generic error message
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
      }
    }
  }
};

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
