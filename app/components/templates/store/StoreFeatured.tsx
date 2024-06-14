// StoreFeatured.tsx
import type React from 'react'
import FeaturedItem from '~/components/molecules/FeaturedItem'

// Data passed as a prop to FeaturedSection
const StoreFeatured: React.FC = () => (
	<>
		<FeaturedItem
			discount="20% OFF FOR INITIAL LAUNCH"
			title="Special Perks you'd really love"
			description="With the highest consideration of a matrix between an enhanced surfing and musical experience."
			imageUrl="https://imperfectgamers.org/assets/store/heart.png"
			imageAlt="Heartbeat animation icon"
		/>
	</>
)

export default StoreFeatured
