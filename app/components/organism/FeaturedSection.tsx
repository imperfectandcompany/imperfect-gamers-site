import type React from 'react'
import FeaturedItem from '../molecules/FeaturedItem'

type Featured = {
	imageSrc: string
	title: string
	description: string
	notice?: string
	className?: string
}

type FeaturedSectionProps = {
	featured: Featured[]
	className?: string
}

/**
 * Renders a featured section component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.featured - The array of featured items to render.
 * @param {string} props.className - The additional CSS class name for the component.
 * @returns {JSX.Element} The rendered component.
 */
const FeaturedSection: React.FC<FeaturedSectionProps> = ({
	featured,
	className,
}) => (
	<div className={`featured-section ${className || ''}`.trim()}>
		{featured ? (
			featured.map((featuredSingle, index) => (
				<FeaturedItem
					key={index}
					{...featuredSingle}
					className={`mb-4 mr-8 ${featuredSingle.className || ''}`.trim()}
				/>
			))
		) : (
			<p>No featured items available.</p>
		)}
	</div>
)

export default FeaturedSection
