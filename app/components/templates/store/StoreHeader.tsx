// components/templates/store/StoreHeader.tsx
import { useLoaderData } from '@remix-run/react'
import AuthForms from '~/components/organism/AuthForms/AuthForms'
import { MembershipCard } from '~/components/organism/MembershipCard/MembershipCard'
import type { LoaderData } from '~/routes/_index'

/**
 * Renders the header component for the store page.
 *
 * This component displays the header section of the store page. It includes the title,
 * subtitle, membership card, and a modal wrapper for authentication forms. The content
 * of the header may vary depending on the user's authentication status and Steam
 * account linkage.
 *
 * @returns The rendered StoreHeader component.
 */

export default function StoreHeader() {
	const { isPremium, isAuthenticated, isSteamLinked, username } =
		useLoaderData<LoaderData>()

	const isMember = isAuthenticated && username && isSteamLinked && isPremium

	return (
		<>
			<div className="mt-10">
				<h1 className="title">
					<span className="whitegradient">
						<span className="critical">I</span>
						<span className="lato">MPERFECT</span>
					</span>{' '}
					<span className="redgradient">
						<span className="critical">G</span>
						<span className="lato">AMERS</span>
					</span>{' '}
					<span className="whitegradient">
						<span className="critical">C</span>
						<span className="lato">LUB</span>
					</span>
				</h1>

				<div className="gradient-line"></div>
				<p className="tagline">
					{isMember
						? 'Welcome to the club, ' + username + ','
						: 'Join now through the exclusive access member pass,'}
				</p>
				<p className="tagline2">powered by Imperfect and Company LLC.</p>
				<MembershipCard />
				<div className="mt-8 flex justify-center">
					<AuthForms />
				</div>
			</div>
		</>
	)
}
