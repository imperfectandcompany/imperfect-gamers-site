// components/templates/store/StoreHeader.tsx
import { useLoaderData } from '@remix-run/react'
import Button from '~/components/atoms/Button/Button'
import AuthForms from '~/components/organism/AuthForms/AuthForms'
import { MembershipCard } from '~/components/organism/MembershipCard/MembershipCard'
import ModalWrapper from '~/components/organism/ModalWrapper/ModalWrapper'
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


const header =(<>
				<ol className="flex w-full items-center text-center text-sm font-medium text-red-500 sm:text-base dark:text-red-400">
					<li className="after:border-1 flex items-center text-red-600 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 dark:text-red-500 dark:after:border-gray-700">
						<span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500">
							<svg
								className="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Account{' '}
							<span className="hidden sm:ms-2 sm:inline-flex">Info</span>
						</span>
					</li>
					<li className="after:border-1 flex items-center text-gray-500 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 after:content-[''] sm:after:inline-block md:w-full xl:after:mx-10 dark:after:border-gray-700">
						<span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500">
							<span className="me-2">2</span>
							Personal{' '}
							<span className="hidden sm:ms-2 sm:inline-flex">Info</span>
						</span>
					</li>
					<li className="flex items-center text-gray-500">
						<span className="me-2">3</span>
						Order
					</li>
				</ol>
</>)
export default function StoreHeader() {
	const { isAuthenticated, isSteamLinked, username } =
		useLoaderData<LoaderData>()

	const title =
		isAuthenticated && username && isSteamLinked
			? `Join The Club, ${username}`
			: 'Unauthorized Action'
	return (
		<div>
			<h1 className="title">Imperfect Gamers Club</h1>
			<p className="subtitle">
				Join now through the exclusive access member pass
				
			</p>
			<MembershipCard />
			<div className="mt-8 flex justify-center">
				{/** header={header} TODO after priorities **/}
				<ModalWrapper title={title} content={<AuthForms />}>
					<Button>Join Now</Button>
				</ModalWrapper>
			</div>
			{!isAuthenticated ? (
				<p className="mt-4 text-center text-sm text-white">
					Please log in or sign up to join the club.
				</p>
			) : null}
		</div>
	)
}
