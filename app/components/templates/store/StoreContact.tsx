// ContactSection.tsx

import type React from 'react'
import { useState } from 'react'
import ContactForm from '~/components/organism/ContactForm'
import Button from '../../atoms/Button/Button'

const StoreContact: React.FC = () => {
	const [showContactForm, setShowContactForm] = useState(false)

	const handleContactClick = () => {
		setShowContactForm(true)
	}

	const handleSignInClick = () => {
		window.location.href = '/login'
	}

	return (
		<section className="mb-12">
			<div className="flex justify-center md:justify-end">
				{!showContactForm ? (
					<div className="contact-section contact-section-transition">
						<h2>Contact Us or Sign In</h2>
						<p>
							For exclusive access to premium membership inquiries, please sign
							in to create a ticket or contact us for assistance from email.
						</p>
						<Button
							onClick={() => {
								handleSignInClick()
							}}
						>
							Sign In
						</Button>
						<Button
							onClick={() => {
								handleContactClick()
							}}
						>
							Contact Us
						</Button>
					</div>
				) : null}
			</div>
			{showContactForm ? <ContactForm onSignIn={handleSignInClick} /> : null}
		</section>
	)
}

export default StoreContact
