// TestimonialsSection.tsx
import type React from 'react'
import Testimonial from '../../organism/Testimonial'

/**
 * Renders a section displaying testimonials from members.
 * @component
 */
const StoreTestimonials: React.FC = () => {
	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="mb-8 text-center text-3xl font-bold">
					What Our Members Say
				</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{/* Testimonial 1 */}
					<Testimonial
						name="John Doe"
						role="Skill Surfer"
						imageSrc="https://placehold.co/100x100"
					>
						&quot;Joining the club through premium has been a game-changer. The
						exclusive servers and community events have made my gaming
						experience so much better!&quot;
					</Testimonial>
					{/* Testimonial 2 */}
					<Testimonial
						name="Joe Mama"
						role="Freestyle Listener"
						imageSrc="https://placehold.co/100x100"
					>
						&quot;The premium membership perks are incredible. I love the custom
						HUD and the priority support. It&apos;s worth every penny!&quot;
					</Testimonial>
					{/* Testimonial 3 */}
					<Testimonial
						name="Granny Apple"
						role="Rapper"
						imageSrc="https://placehold.co/100x100"
					>
						&quot;I&apos;ve been a member for over a year now, and the community
						has been incredibly welcoming. The slot reservation feature is a
						lifesaver during peak hours.&quot;
					</Testimonial>
				</div>
			</div>
		</section>
	)
}

export default StoreTestimonials
