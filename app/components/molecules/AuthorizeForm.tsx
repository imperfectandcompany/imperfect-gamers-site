// ~/app/components/molecules/AuthorizeForm.tsx
import { useEffect, useState } from 'react'
import Button from '~/components/atoms/Button/Button'
import { generateSteamLoginURL } from '~/utils/steamAuth'

// Add props interface to include an onSuccess callback
interface AuthorizeFormProps {
	onSuccess: () => void;
}

/**
 * Represents a form component for authorizing a Steam account.
 */
const AuthorizeForm: React.FC<AuthorizeFormProps> = ({ onSuccess }) => {
	const [showFallback, setShowFallback] = useState(false)
	const [fallbackUrl, setFallbackUrl] = useState('')
	const [steamPopupOpened, setSteamPopupOpened] = useState(false)
	const [steamPopup, setSteamPopup] = useState<Window | null>(null)

	const handleSteamLinkSuccess = () => {
		onSuccess(); // Notify the parent component
	  };
	  if (typeof window !== 'undefined') {
		window.addEventListener('message', (event) => {
			if (event.data.type === 'steam-auth-success') {
				handleSteamLinkSuccess();
			}
		});
	}

	// Function to fetch URL and open the popup
	const initiateSteamLinking = async () => {
		try {
			const response = await fetch('/authorize/steam')
			const data = await response.json()
			if (data.url) {
				const popup = window.open(
					data.url,
					'steamPopup',
					'width=600,height=700',
				)
				if (!popup) {
					setShowFallback(true)
					setSteamPopupOpened(false)
					setFallbackUrl(data.url)
				} else {
					setSteamPopup(popup)
					setSteamPopupOpened(true)
				}
			} else {
				alert('Failed to initiate Steam linking. Please try again.')
			}
		} catch (error) {
			console.error('Failed to fetch Steam linking URL', error)
			setShowFallback(true)
			setSteamPopupOpened(false)
			const returnURL = '' // Proper URL should be configured
			setFallbackUrl(await generateSteamLoginURL(returnURL))
		}
	}


	// Monitor the popup state
	useEffect(() => {
		let interval: NodeJS.Timeout
		if (steamPopupOpened && steamPopup) {
			interval = setInterval(() => {
				if (steamPopup.closed) {
					clearInterval(interval)
					setSteamPopup(null)
					setSteamPopupOpened(false)
					setShowFallback(false) // Optionally show fallback or reset any state as needed
				}
			}, 500)
		}

		return () => {
			if (interval) {
				clearInterval(interval as NodeJS.Timeout)
			}
		}
	}, [steamPopupOpened, steamPopup])

	return (
		<div>
			{showFallback && (
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
						if you're having trouble linking your Steam account.
					</p>
				</div>
			)}

			{!steamPopupOpened ? (
				<Button onClick={initiateSteamLinking}>Link Steam Account</Button>
			) : (
				<p>
					Please link your Steam account in the popup window. If the popup
					didn't open, click the link below.
				</p>
			)}
		</div>
	)
}

export default AuthorizeForm
