// components/organism/UnauthenticatedView.tsx
import Button from '~/components/atoms/Button/Button'
import Heading from '~/components/atoms/Heading/Heading'
import Paragraph from '../atoms/Paragraph/Paragraph'

/**
 * Renders the view for unauthenticated users.
 * This component displays a message prompting the user to log in and provides a login button.
 */
const UnauthenticatedView = () => {
	return (
		<div className="flex flex-col items-center justify-center text-white">
			<div className="my-6 text-center">
				<Heading>You must be logged in</Heading>
				<Button type="submit" onClick={() => (window.location.href = '/login')}>
					Login
				</Button>
			</div>
			<div className="w-full max-w-2xl px-4 sm:px-6 lg:px-8">
				<div className="mb-6">
					<div className="border-t border-red-700 py-4 text-center">
						<Paragraph>
							Please login using your Imperfect Gamers account with your steam
							integrated so we can identify you in game.
						</Paragraph>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UnauthenticatedView
