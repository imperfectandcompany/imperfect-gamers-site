import { useState } from 'react'
import FeaturedPartnership from '../../organism/FeaturedPartnership'

/**
 * Renders the featured partnership section.
 * @returns JSX.Element representing the featured partnership section.
 */
const FeaturedPartnershipSection: React.FC = () => {
	const [showBlog] = useState(false)

	return (
		<FeaturedPartnership
			logoSrc="https://imperfectgamers.org/assets/store/tebex_logo.svg"
			logoAlt="Tebex logo"
			title="We are trusted"
			description={
				<>
					We are proud partners of Tebex! Together, we provide a seamless
					membership experience. We were the first to pilot their initial launch
					in the new CS2 space, utilizing their headless API and new checkout
					experience.
					{showBlog ? 'You can read more about it here: linkGoesHere' : null}
				</>
			}
			link="#"
		/>
	)
}

export default FeaturedPartnershipSection
