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
		window.location.href = 'https://imperfectgamers.org/discord'
	}

	const [showContactUs] = useState(false)

	return (
		<section className="my-12">
			<div className="flex justify-center md:justify-end">
				{!showContactForm ? (
					<div className="contact-section contact-section-transition">
    <h2>Get Premium Support on Discord</h2>
    <p>
        Our ticket creation system is currently in progress. In the meantime, for exclusive access to premium support, please join our Discord server.
    </p>
    <Button
        onClick={() => {
            handleSignInClick()
        }}
    >
        Join Discord
    </Button>
						{showContactUs ? (
							<Button
								onClick={() => {
									handleContactClick()
								}}
							>
								Contact Us
							</Button>
						) : null}
					</div>
				) : null}
			</div>
			{showContactForm ? <ContactForm onSignIn={handleSignInClick} /> : null}
		</section>
	)
}

export default StoreContact
