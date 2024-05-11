// components/templates/store/StoreHeader.tsx
import { useLoaderData } from '@remix-run/react'
import { useEffect, useMemo, useState } from 'react'
import Button from '~/components/atoms/Button/Button'
import AuthForms from '~/components/organism/AuthForms/AuthForms'
import { MembershipCard } from '~/components/organism/MembershipCard/MembershipCard'
import ModalWrapper from '~/components/organism/ModalWrapper/ModalWrapper'
import { ProcessProvider } from '~/components/pending/ProcessProvider'
import Register from '~/components/pending/Register'

import type { LoaderData } from '~/routes/store'

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
	const { isAuthenticated, isSteamLinked, username } =
		useLoaderData<LoaderData>()
		const [title, setTitle] = useState<string>('Imperfect Gamers');
		const defaultTitle = useMemo(
			() => isAuthenticated && username && isSteamLinked
			  ? `Join The Club, ${username}`
			  : 'Imperfect Gamers',
			[isAuthenticated, username, isSteamLinked],
		  );
		
		  // Update the title when the defaultTitle changes
		  useEffect(() => {
			setTitle(defaultTitle);
		  }, [defaultTitle]);
	return (
		<div>
			<div className="">
				<h1 className="title">Imperfect Gamers Club</h1>
				<p className="subtitle">
					Join now through the exclusive access member pass
				</p>
				<MembershipCard />
				<div className="mt-8 flex justify-center">
					<ProcessProvider>
						<ModalWrapper title={title} content={<AuthForms setTitle={setTitle} />}>
							<Button>Join Now</Button>
						</ModalWrapper>
					</ProcessProvider>
				</div>

				{!isAuthenticated ? (
					<p className="mt-4 text-center text-sm text-white">
						Please log in or sign up to join the club.
					</p>
				) : null}
				<ProcessProvider>
					<Register />
				</ProcessProvider>

				{/* <div className="flex min-h-screen items-center justify-center">
					<div className="w-96 rounded-lg border border-stone-800 bg-black p-8">
						<h1 className="mb-6 text-2xl text-white">Sign Up</h1>
						<div className="mb-4"></div>
						<SignUpForm />
					</div>
				</div> */}
			</div>
		</div>
	)
}
