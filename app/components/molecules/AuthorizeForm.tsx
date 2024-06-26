import { useRevalidator } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { wait } from 'remix-utils/timers'
import { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'
import MessageContainer from '../pending/MessageContainer'
import { useDispatch, useDispatchState } from '../pending/ProcessProvider'

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

	const [showAlternative, setShowAlternative] = useState(false)
	const [visible, setVisible] = useState(false)

	const timerRef = useRef<NodeJS.Timeout | null>(null)
	const transitionRef = useRef<HTMLDivElement | null>(null)

	const dispatch = useDispatch()
	const state = useDispatchState()

	const currentDispatch = state.find(dispatch => dispatch.inProgress)
	const errorMessage = currentDispatch?.message

	useEffect(() => {
		if (visible) {
			timerRef.current = setTimeout(() => {
				setShowAlternative(true)
			}, 1500)
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
			setShowAlternative(false)
		}
	}, [visible])

	const handleCancel = (event?: React.MouseEvent) => {
		if (event) {
			event.stopPropagation() // Prevents the event from propagating further
		}
		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}
		setShowAlternative(false)
		setVisible(false)
		if (transitionRef.current) {
			transitionRef.current.addEventListener(
				'transitionend',
				() => {
					// Perform actions after the transition ends
					setSteamPopup(null)
					setSteamPopupOpened(false)
					setPopupWindow?.(null)
					setShowFallback(false)
					setCloseInterceptReason?.(CloseInterceptReason.None)
				},
				{ once: true },
			)
		}
	}

	const resetForm = () => {
		setVisible(false)
		setSteamPopup(null)
		setSteamPopupOpened(false)
		setPopupWindow?.(null)
		setShowFallback(false)
		setCloseInterceptReason?.(CloseInterceptReason.None)
	}

	useEffect(() => {
		if (setCloseInterceptReason) {
			setCloseInterceptReason(CloseInterceptReason.None)
		}

		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === 'steam-auth-success') {
				console.log(
					'[AuthorizeForm.tsx] User has successfully integrated their steam.',
				)
				console.log('[AuthorizeForm.tsx] Steam Authentication Flow: Popup')
				callback()
			} else if (event.data.type === 'steam-auth-error') {
				console.error(
					'[AuthorizeForm.tsx] Error during Steam authentication:',
					event.data.message,
				)
				console.log('[AuthorizeForm.tsx] Steam Authentication Flow: Popup')
				// Handle error and reset form
				dispatch.send(event.data.message)
				resetForm()
				// TODO: implement toast in future during ui/ux enhancement related tasks
				// alert(`Steam authentication error: ${event.data.message}`)
			} else {
				if (event.data.type) {
					console.log('[AuthorizeForm.tsx] Event was unknown:', event.data.type) // To see exactly which unknown event was received
				}
			}
		}

		// This might be skipped and not needed. Confirmed that event "steamAuthSuccess" was caught in CheckProcess.tsx.
		const handleEvent = (event: Event) => {
			console.log('[AuthorizeForm.tsx] Received event:', event.type) // To see exactly which event was received
			if (event.type === 'steamAuthSuccess') {
				console.log(
					'[AuthorizeForm.tsx] User has successfully integrated their Steam account.',
				)
				console.log('[AuthorizeForm.tsx] Steam Authentication Flow: Redirect')
				callback()
			} else if (event.type === 'steamAuthError') {
				console.error(
					'[AuthorizeForm.tsx] Error during Steam authentication from redirect.',
				)
				console.log('[AuthorizeForm.tsx] Steam Authentication Flow: Redirect')
				// console.error('[AuthorizeForm.tsx] Error during Steam authentication:', event.data.message)
				// TODO: implement toast in future during ui/ux enhancement related tasks
				// TODO: Update redirect flash to include error message from callback
				// alert(`Steam authentication error: ${event.data.message}`)
				dispatch.send('Error during Steam authentication from redirect.')
				resetForm()
			} else {
				console.log('[AuthorizeForm.tsx] Event was unknown:', event.type) // To see exactly which unknown event was received
			}
		}

		window.addEventListener('message', handleMessage)
		window.addEventListener('event', handleEvent)

		return () => {
			window.removeEventListener('message', handleMessage)
			window.removeEventListener('event', handleEvent)
		}
	}, [])

	const initiateSteamLinking = async () => {
		setVisible(true)
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
				setFallbackUrl(data.fallback)
				if (!popup) {
					console.error(
						'Popup failed to open, likely blocked by popup blocker.',
					)
					setShowFallback(true)
					setSteamPopupOpened(false)
					setPopupWindow?.(null)
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
			handleCancel()
			setSteamPopupOpened(false)
			setPopupWindow?.(null)
		}
	}

	useEffect(() => {
		let interval: NodeJS.Timeout
		if (steamPopupOpened && steamPopup) {
			interval = setInterval(async () => {
				if (steamPopup.closed) {
					handleCancel()
					await wait(750)
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

	const handleFallbackClick = (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLButtonElement>,
	) => {
		e.preventDefault()
		// Close the popup if it's open
		if (steamPopup && !steamPopup.closed) {
			steamPopup.close()
			setSteamPopup(null)
			setSteamPopupOpened(false)
			setPopupWindow?.(null)
			setShowFallback(false)
			setCloseInterceptReason?.(CloseInterceptReason.None)
		}

		// Redirect the parent window to steam openid url after potential popup cleanup.
		window.location.href = fallbackUrl
	}

	return (
		<div>
			{errorMessage && !steamPopupOpened && !visible ? (
				<MessageContainer message={errorMessage} />
			) : null}
			{!steamPopupOpened && !visible ? (
				<div className="cta-container">
					<div className="cta-text">Link your Steam account to continue?</div>
					<button
						className="steam-button button transition hover:border-none"
						onClick={initiateSteamLinking}
						style={{ visibility: visible ? 'hidden' : 'visible' }}
					>
						Link Steam Account
					</button>
				</div>
			) : (
				<div
					className="loader"
					style={{
						animation: visible ? 'fadeIn 1s forwards' : 'fadeOut 1s forwards',
					}}
				>
					<div className="spinner"></div>
					<p id="loaderText">
						Please link your Steam account in the popup window.
					</p>
					<p
						className="bg-stone-900/95 p-2"
						id="alternativeText"
						style={{
							opacity: showAlternative ? 1 : 0,
							transform: `translateY(${showAlternative ? '0px' : '20px'})`,
						}}
					>
						{showFallback ? (
							<>
								We believe your browser may have blocked the popup. No worries,
								you can{' '}
								<button
									onClick={e => handleFallbackClick(e)}
									onKeyDown={e => handleFallbackClick(e)}
									rel="noopener noreferrer"
									className="text-red-500 no-underline hover:cursor-pointer hover:underline focus:cursor-default"
								>
									click Here
								</button>{' '}
								to sign in manually.
							</>
						) : (
							<>
								Still having trouble? It&apos;s possible your browser blocked
								the popup. No worries, you can{' '}
								<button
									onClick={e => handleFallbackClick(e)}
									onKeyDown={e => handleFallbackClick(e)}
									rel="noopener noreferrer"
									className="text-red-500 no-underline hover:cursor-pointer hover:underline focus:cursor-default"
								>
									click Here
								</button>{' '}
								to sign in manually.
							</>
						)}
					</p>
				</div>
			)}
		</div>
	)
}

export default AuthorizeForm
