// FeaturedPartnership.tsx
import type React from 'react'

type FeaturedPartnershipProps = {
	logoSrc: string
	logoAlt: string
	title: string
	description: React.ReactNode
	link: string
	linkText: string
}

/**
 * Represents a featured partnership component.
 * @component
 * @param {string} logoSrc - The source URL of the logo image.
 * @param {string} logoAlt - The alternative text for the logo image.
 * @param {string} title - The title of the partnership.
 * @param {string} description - The description of the partnership.
 * @param {string} link - The URL of the partnership link.
 * @param {string} linkText - The text for the partnership link.
 */
const FeaturedPartnership: React.FC<FeaturedPartnershipProps> = ({
	logoSrc,
	logoAlt,
	title,
	description,
	link,
	linkText,
}) => {
	return (
		<section>
			<div className="flex flex-col items-center justify-between lg:flex-row">
				<div className="mb-8 flex justify-center lg:mb-0 lg:w-1/2 lg:justify-start">
					<img src={logoSrc} alt={logoAlt} className="h-32 lg:h-32 xl:h-48" />
				</div>
				<div className="text-center lg:w-1/2 lg:text-right">
					<h3 className="mb-4 text-3xl font-bold">{title}</h3>
					<p className="text-sm text-gray-400">
						{description}
						<a className="text-red-600" href={link}>
							{linkText}
						</a>
						.
					</p>
				</div>
			</div>
		</section>
	)
}

export default FeaturedPartnership
