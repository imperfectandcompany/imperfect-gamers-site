import { useState } from 'react'
import Button from '~/components/atoms/Button/Button'
import { generateSteamLoginURL } from '~/utils/steamAuth'

/**
 * Represents a form component for authorizing a Steam account.
 */
const AuthorizeForm: React.FC = () => {
	const [showFallback, setShowFallback] = useState(false)
	const [fallbackUrl, setFallbackUrl] = useState('')
	const [steamPopupOpened, setSteamPopupOpened] = useState(false)

	/**
	 * Initiates the process of linking the Steam account.
	 * Instead of opening the popup immediately, it fetches the URL first.
	 * If the URL is available, it opens a popup window for Steam linking.
	 * If the popup window fails to open, it sets the fallback URL.
	 * If the URL is not available, it displays an error message.
	 * If there is an error while fetching the URL, it sets the fallback URL using the client-side function generateSteamLoginURL.
	 */
	const initiateSteamLinking = async () => {
		// Instead of opening the popup immediately, fetch the URL first
		try {
			const response = await fetch('/authorize/steam') // Adjusted endpoint
			const data = await response.json()

			if (data.url) {
				const steamPopup = window.open(
					data.url,
					'steamPopup',
					'width=600,height=700',
				)
				if (!steamPopup) {
					setShowFallback(true)
				setSteamPopupOpened(false)
					setFallbackUrl(data.url) // Set the fallback URL
				}
				setSteamPopupOpened(true)
			} else {
				alert('Failed to initiate Steam linking. Please try again.')
			}
		} catch (error) {
			console.error('Failed to fetch Steam linking URL', error)
			setShowFallback(true)
			setSteamPopupOpened(false)
			const returnURL = '' // Declare the variable returnURL
			setFallbackUrl(await generateSteamLoginURL(returnURL)) // Implement this function to get the Steam login URL on the client side if needed (TODO)
		}
	}

	return (
		<div>
			{showFallback ? (
				<div id="fallback">
					<p>
						Click{' '}
						<a
							href={fallbackUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-red-700 transition hover:text-red-500 hover:underline"
						>
							here
						</a>{' '}
						if you&apos;re having trouble linking your Steam account.
					</p>
				</div>
			) : null}

			{steamPopupOpened ? ( /* TODO list to when window is closed to set popup open to closed. */
				<p>
					Please link your Steam account in the popup window. If the popup
					didn&apos;t open, click the link below.
				</p>
			) : <Button onClick={initiateSteamLinking}>Link Steam Account</Button>}
		</div>
	)
}

export default AuthorizeForm
