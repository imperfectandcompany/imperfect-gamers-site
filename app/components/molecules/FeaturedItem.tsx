import type React from 'react'

type FeaturedItemProps = {
	discount: string
	title: string
	description: string
	imageUrl?: string
	imageAlt?: string
}

/**
 * Represents a featured item component.
 * @param discount - The discount value.
 * @param title - The title of the item.
 * @param description - The description of the item.
 * @param imageUrl - The URL of the item's image.
 * @param imageAlt - The alt text for the item's image.
 */
const FeaturedItem: React.FC<FeaturedItemProps> = ({
	discount,
	title,
	description,
	imageUrl,
	imageAlt,
}) => (
	<div className="mt-16 flex justify-end">
		<div className="flex justify-end">
			<div className="flex-col text-white">
				<div>
					<p className="mb-2 text-right text-2xl text-red-400">{discount}</p>
				</div>
				<div className="flex sm:items-center">
					<div className="mb-4 mr-8">
						<img
							src={imageUrl}
							className="animate-heartbeat heart"
							alt={imageAlt}
							style={{
								animation:
									'0.5s ease 0s 1 normal forwards running hoverOutEffect, 2s ease 0.5s infinite normal none running heartbeat',
							}}
						/>
					</div>
					<div>
						<h2 className="mb-4 text-right text-4xl font-bold">{title}</h2>
						<p className="text-right text-gray-400">{description}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default FeaturedItem
