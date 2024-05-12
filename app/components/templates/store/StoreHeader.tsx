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
	return (
		<div>
			<h1 className="title">Imperfect Gamers Club</h1>
			<p className="subtitle">
				Join now through the exclusive access member pass
			</p>
			<MembershipCard />
			<div className="mt-8 flex justify-center">
					<AuthForms />
			</div>
		</div>
	)
}
