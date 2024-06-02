import { useRevalidator } from '@remix-run/react'
import { useEffect, useState } from 'react'
import Button from '~/components/atoms/Button/Button'
import { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'

interface AuthorizeFormProps {
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
	setPopupWindow?: (window: Window | null) => void
}

const AuthorizeForm: React.FC<AuthorizeFormProps> = ({
	setCloseInterceptReason,
	setPopupWindow,
}) => {
	const [showFallback, setShowFallback] = useState(false)
	const [fallbackUrl, setFallbackUrl] = useState('')
	const [steamPopupOpened, setSteamPopupOpened] = useState(false)
	const [steamPopup, setSteamPopup] = useState<Window | null>(null)
	const revalidator = useRevalidator()

	const callback = () => {
		revalidator.revalidate()
	}

	useEffect(() => {
		if (setCloseInterceptReason) {
			setCloseInterceptReason(CloseInterceptReason.None)
		}

		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === 'steam-auth-success') {
				console.log('User has successfully integrated their steam.')
				callback()
			} else if (event.data.type === 'steam-auth-error') {
				console.error('Error during Steam authentication:', event.data.message)
				// TODO: implement toast in future during ui/ux enhancement related tasks
				// alert(`Steam authentication error: ${event.data.message}`)
				setSteamPopup(null)
				setSteamPopupOpened(false)
				setCloseInterceptReason?.(CloseInterceptReason.None)
			}
		}

		window.addEventListener('message', handleMessage)

		return () => {
			window.removeEventListener('message', handleMessage)
		}
	}, [])

	const initiateSteamLinking = async () => {
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
					setPopupWindow?.(null)
					setFallbackUrl(data.url)
					setCloseInterceptReason?.(CloseInterceptReason.None)
				} else {
					setSteamPopup(popup)
					setPopupWindow?.(popup)
					setSteamPopupOpened(true)
					setCloseInterceptReason?.(CloseInterceptReason.ActivePopup)
				}
			} else {
				alert('Failed to initiate Steam linking. Please try again.')
				setCloseInterceptReason?.(CloseInterceptReason.None)
			}
		} catch (error) {
			console.error('Failed to fetch Steam linking URL', error)
			setShowFallback(true)
			setSteamPopupOpened(false)
			setPopupWindow?.(null)
		}
	}

	useEffect(() => {
		let interval: NodeJS.Timeout
		if (steamPopupOpened && steamPopup) {
			interval = setInterval(() => {
				if (steamPopup.closed) {
					clearInterval(interval)
					setSteamPopup(null)
					setSteamPopupOpened(false)
					setPopupWindow?.(null)
					setShowFallback(false)
					setCloseInterceptReason?.(CloseInterceptReason.None)
				}
			}, 500)
		}
		return () => {
			if (interval) {
				clearInterval(interval)
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
