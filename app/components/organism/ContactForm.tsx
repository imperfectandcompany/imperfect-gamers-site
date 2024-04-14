import type React from 'react'
import { useState } from 'react'

/**
 * Props for the ContactForm component.
 */
type ContactFormProps = {
	/**
	 * A callback function to handle the sign-in action.
	 * This function will be called when the user clicks the "Sign In" button.
	 * It should handle the logic for signing in the user.
	 *
	 * @param username - The username entered by the user.
	 * @param password - The password entered by the user.
	 */
	onSignIn: () => void
}

/**
 * ContactForm component for displaying a contact form.
 *
 * @component
 * @example
 * ```tsx
 * import ContactForm from './ContactForm';
 *
 * const App = () => {
 *   const handleSignIn = () => {
 *     // handle sign in logic
 *   };
 *
 *   return (
 *     <div>
 *       <h1>Welcome to Imperfect Gamers</h1>
 *       <ContactForm onSignIn={handleSignIn} />
 *     </div>
 *   );
 * };
 * ```
 */
const ContactForm: React.FC<ContactFormProps> = ({ onSignIn }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		// Handle form submission logic here
	}

	return (
		<div className="bg-opacity/50 bg-black py-12">
			<div className="container mx-auto px-4">
				<h2 className="font-playfair-display luxury-title mb-8 text-center text-3xl font-bold">
					Contact Us
				</h2>
				<div className="mx-auto max-w-xl">
					<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
						{/* Name input */}
						<div className="group">
							<label htmlFor="name" className="luxury-label text-sm">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Your Name"
								className="luxury-input w-full rounded border border-white/30 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out focus:outline-none"
								value={name}
								onChange={e => {
									setName(e.target.value)
								}}
								required
							/>
						</div>
						{/* Email input */}
						<div className="group">
							<label htmlFor="email" className="luxury-label text-sm">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Your Email"
								className="luxury-input w-full rounded border border-white/30 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out focus:outline-none"
								value={email}
								onChange={e => {
									setEmail(e.target.value)
								}}
								required
							/>
						</div>
						{/* Message textarea */}
						<div className="group">
							<label htmlFor="message" className="luxury-label text-sm">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								rows={4}
								placeholder="Your Message"
								className="luxury-input w-full rounded border border-white/30 bg-white/5 p-2 text-white transition-all duration-300 ease-in-out focus:outline-none"
								value={message}
								onChange={e => {
									setMessage(e.target.value)
								}}
								required
							/>
						</div>
						{/* Submit button */}
						<div className="text-center">
							<button
								type="submit"
								className="button focus:ring-opacity/50 rounded px-6 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2"
							>
								Send Message
							</button>
						</div>
					</form>
					<div className="mt-8 text-center">
						<p className="text-gray-400">Alternatively, you can</p>
						<button
							onClick={onSignIn}
							className="focus:ring-opacity/50 mt-2 rounded bg-white/5 px-6 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2"
						>
							Sign In &amp; Create a Ticket
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactForm
