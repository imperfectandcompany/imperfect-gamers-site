// ~/app/components/molecules/AuthorizeForm.tsx
import { useRevalidator } from '@remix-run/react'
import { useEffect, useState } from 'react'
import Button from '~/components/atoms/Button/Button'
// import { generateSteamLoginURL } from '~/utils/steamAuth'
import { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'

// Add setCloseInterceptReason to the props interface
interface AuthorizeFormProps {
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
	setPopupWindow?: (window: Window | null) => void
}

/**
 * Represents a form component for authorizing a Steam account.
 */
const AuthorizeForm: React.FC<AuthorizeFormProps> = ({
	setCloseInterceptReason,
	setPopupWindow,
}) => {
	const [showFallback, setShowFallback] = useState(false)
	const [fallbackUrl, setFallbackUrl] = useState('')
	const [steamPopupOpened, setSteamPopupOpened] = useState(false)
	const [steamPopup, setSteamPopup] = useState<Window | null>(null)
	const revalidator = useRevalidator()

	const callback = () => revalidator.revalidate()

	useEffect(() => {
		// Set CloseInterceptReason to None initially when the component mounts
		if (setCloseInterceptReason) {
			setCloseInterceptReason(CloseInterceptReason.None)
		}

		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === 'steam-auth-success') {
				console.log('User has successfully integrated their steam.')
				/* 
				"This hook allows you to revalidate the data for any reason. React Router automatically 
				revalidates the data after actions are called, but you may want to revalidate for other reasons 
				like when focus returns to the window."
				https://reactrouter.com/en/main/hooks/use-revalidator
				*/
				callback()
			}
		}

		window.addEventListener('message', handleMessage)

		// Cleanup the event listener when the component unmounts
		return () => {
			window.removeEventListener('message', handleMessage)
		}
	}, []) // Empty dependency array ensures this effect runs only once on mount

	// Function to fetch URL and open the popup
	const initiateSteamLinking = async () => {
		// Set the close intercept reason to RequestInProgress before starting the request
		if (setCloseInterceptReason) {
			setCloseInterceptReason(CloseInterceptReason.RequestInProgress)
		}
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
					if (setPopupWindow) {
						setPopupWindow(null) // Set the popup window in ModalWrapper's state
					}
					// TODO - REDIRECT ALTERNATIVE - ISSUE NOT YET TRACKED
					setFallbackUrl(data.url)
					if (setCloseInterceptReason) {
						setCloseInterceptReason(CloseInterceptReason.None)
					}
				} else {
					setSteamPopup(popup)
					if (setPopupWindow) {
						setPopupWindow(popup) // Set the popup window in ModalWrapper's state
					}
					setSteamPopupOpened(true)
					if (setCloseInterceptReason) {
						setCloseInterceptReason(CloseInterceptReason.ActivePopup)
					}
				}
			} else {
				alert('Failed to initiate Steam linking. Please try again.')
				if (setCloseInterceptReason) {
					setCloseInterceptReason(CloseInterceptReason.None)
				}
			}
		} catch (error) {
			console.error('Failed to fetch Steam linking URL', error)
			setShowFallback(true)
			setSteamPopupOpened(false)
			if (setPopupWindow) {
				setPopupWindow(null) // Set the popup window in ModalWrapper's state
			}
			// TODO - REDIRECT ALTERNATIVE - ISSUE NOT YET TRACKED
			// const returnURL = '' // Proper URL should be configured
			// setFallbackUrl(await generateSteamLoginURL(returnURL))
			// if (setCloseInterceptReason) {
			// 	setCloseInterceptReason(CloseInterceptReason.RequestInProgress)
			// }
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
					if (setPopupWindow) {
						setPopupWindow(null) // Set the popup window in ModalWrapper's state
					}
					setShowFallback(false) // Optionally show fallback or reset any state as needed
					if (setCloseInterceptReason) {
						setCloseInterceptReason(CloseInterceptReason.None)
					}
				}
			}, 500)
		}

		return () => {
			if (interval) {
				clearInterval(interval as NodeJS.Timeout)
			}
		}
	}, [steamPopupOpened, steamPopup, setCloseInterceptReason, setPopupWindow])

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

			{!steamPopupOpened ? (
				<Button onClick={initiateSteamLinking}>Link Steam Account</Button>
			) : (
				<p>
					Please link your Steam account in the popup window. If the popup
					didn&apos;t open, click the link below.
				</p>
			)}
		</div>
	)
}

export default AuthorizeForm
