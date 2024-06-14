import type React from 'react'
import EventItem from '~/components/molecules/EventItem'

/**
 * Represents the component for displaying exclusive events in the store.
 */
const StoreEvents: React.FC = () => {
	return (
		<section className="bg-opacity/50 my-12 mb-16 bg-black py-12">
			<div className="container mx-auto px-4">
				<h2 className="mb-8 text-center text-3xl font-bold text-white/90">
					<span className="bg-opacity/50 inline-block rounded-full bg-black p-2 transition duration-500 hover:scale-110">
						Exclusive Events
					</span>
				</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					<EventItem
						title="Premium Surfing and Rap Battle Tournaments"
						description="Join our monthly Premium-only surfing and rap battle tournaments with big prizes and bragging rights."
						link="https://imperfectgamers.org/login"
					/>
					<EventItem
						title="Members-Only Livestream"
						description="Get exclusive access to our members-only livestreams with special guests and Q&A sessions."
						link="https://imperfectgamers.org/login"
					/>
				</div>
			</div>
		</section>
	)
}

export default StoreEvents
