import type React from 'react'
import { useEffect, useState } from 'react'
import Testimonial from '../../organism/Testimonial'

type Review = {
	name: string
	date: string
	imageSrc: string
	content: string
}

const reviews: Review[] = [
	{
		name: 'phazjeff',
		date: '06/08/2024 12:07 AM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/phazejeff.png',
		content: 'can vips be allowed to join the server when its full',
	},
	{
		name: 'Kirk',
		date: '05/29/2024 9:03 PM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/kirk.png',
		content: 'when is the VIP dropping? I need the custom models',
	},
	{
		name: 'Quintin',
		date: '05/29/2024 6:19 PM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/default_discord_picture.png', // No specific image provided
		content: 'can you even buy vip rn',
	},
	{
		name: 'Krayy',
		date: '05/26/2024 11:14 PM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/Krayy.png',
		content: `hey raz you wanna be a babe and extend the skill surf o;
				i dont have vip lmao
				idek tbh
				How much is it like $10
				I should just go for mod though fr it's the only server i surf on`,
	},
	{
		name: 'arctic adventurer',
		date: '05/23/2024 11:57 PM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/default_discord_picture.png', // No specific image provided
		content: `when is vip getting released for yalls cs2 server? cuz i know its only thru paypal and admin rn
				dis why yall getting my vip shmoney when shop setup`,
	},
	{
		name: 'Pinball',
		date: '06/17/2024 12:40 AM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/Pinball.jpeg',
		content: 'T1-2 was full',
	},
	{
		name: 'Wildcard',
		date: '06/12/2024 8:10 PM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/Wildcard.jpeg',
		content: "i can't get into easy surf cuz its full",
	},
	{
		name: 'DubzXI',
		date: '05/28/2024 12:50 AM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/DubzXI.gif',
		content: 'The server has been full forever I swear',
	},
	{
		name: 'Krayy',
		date: '05/26/2024 9:56 PM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/Krayy.png',
		content: 'Server full 😢',
	},
	{
		name: 'kiro',
		date: '05/26/2024 7:44 PM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/kiro.png',
		content: 'server is full',
	},
	{
		name: 'kiro',
		date: '05/25/2024 10:58 PM',
		imageSrc:
			'https://cdn.imperfectgamers.org/inc/assets/img/profile_pictures/discord/feedback/kiro.png',
		content: "and now can't get back in cause it's full",
	},
	// Add more reviews here based on the images
]
// Function to randomize the order of testimonials
const shuffleArray = (array: Review[]) => {
	return array.sort(() => Math.random() - 0.5)
}

/**
 * Renders a section displaying testimonials from members.
 * @component
 */
const StoreTestimonials: React.FC = () => {
	const [displayedReviews, setDisplayedReviews] = useState<Review[]>([])
	const [visibleCount, setVisibleCount] = useState(3)

	useEffect(() => {
		// Randomize the reviews order when the component mounts
		const shuffledReviews = shuffleArray([...reviews])
		setDisplayedReviews(shuffledReviews)
	}, [])

	const handleViewMore = () => {
		setVisibleCount(prevCount => prevCount + 3)
	}

	const handleCollapse = () => {
		setVisibleCount(3)
	}
	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="mb-8 text-center text-3xl font-bold">
					You shared. We listened.
				</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{displayedReviews.slice(0, visibleCount).map((review, index) => (
						<Testimonial
							key={index}
							name={review.name}
							date={review.date}
							imageSrc={review.imageSrc}
						>
							{review.content}
						</Testimonial>
					))}
				</div>
				<div className="mt-8 flex justify-center">
					{visibleCount < reviews.length ? (
						<button
							className="button rounded bg-gradient-to-r from-red-600 to-red-900 px-4 py-2 text-white transition duration-200 hover:bg-red-700"
							onClick={handleViewMore}
						>
							View More
						</button>
					) : null}
					{visibleCount > 3 ? (
						<button
							className="button ml-4 rounded bg-gradient-to-r from-gray-500 to-gray-700 px-4 py-2 text-white transition duration-200 hover:bg-gray-700"
							onClick={handleCollapse}
						>
							Collapse
						</button>
					) : null}
				</div>
			</div>
		</section>
	)
}

export default StoreTestimonials
