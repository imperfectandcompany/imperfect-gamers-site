import React from 'react'

const StoreNavbar: React.FC = () => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [redirecting, setRedirecting] = React.useState(false)
	const [countdown, setCountdown] = React.useState(3)
	let redirectTimeout = React.useRef<number | null>(null)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const handleRedirect = (url: string) => {
		if (!redirecting) {
			setRedirecting(true)
			setCountdown(3)
			redirectTimeout.current = window.setInterval(() => {
				setCountdown(prevCount => {
					if (prevCount <= 1) {
						if (redirectTimeout.current !== null) {
							clearInterval(redirectTimeout.current)
						}
						window.location.href = url
						return 0
					}
					return prevCount - 1
				})
			}, 1000)
		}
	}

	const cancelRedirect = () => {
		if (redirectTimeout.current !== null) {
			clearInterval(redirectTimeout.current)
		}
		setRedirecting(false)
		setIsOpen(false)
	}
	return (
		<nav>
			<div
				className="menu-toggle"
				onClick={redirecting ? cancelRedirect : toggleMenu}
				onKeyUp={event => {
					if (event.key === 'Enter') {
						redirecting ? cancelRedirect() : toggleMenu()
					}
				}}
				role="button"
				tabIndex={0}
			>
				{redirecting ? (
					<span className="cancel-text">Cancel</span>
				) : (
					<i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
				)}
			</div>
			{redirecting ? (
				<div className="nav__list active redirecting">
					<div className="redirect-message flex w-full items-center justify-between">
						<span>Redirecting in {countdown} seconds...</span>
						<button
							className="b invisible flex rounded px-4 py-1 text-white md:visible"
							onClick={cancelRedirect}
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<ul className={`nav__list select-none ${isOpen ? 'active' : ''}`}>
					<button
						className="list__icon"
						onClick={() => handleRedirect('https://imperfectgamers.org/')}
						onKeyUp={event => {
							if (event.key === 'Enter')
								handleRedirect('https://imperfectgamers.org/')
						}}
						tabIndex={0}
					>
						<i className="fa fa-home"></i>
					</button>
					<button
						className="list__item stats-item"
						onClick={() => handleRedirect('https://imperfectgamers.org/stats')}
						onKeyUp={event => {
							if (event.key === 'Enter')
								handleRedirect('https://imperfectgamers.org/stats')
						}}
						tabIndex={0}
					>
						STATS
					</button>
					<button
						className="list__item"
						onClick={() =>
							handleRedirect('https://imperfectgamers.org/infractions')
						}
						onKeyUp={event => {
							if (event.key === 'Enter')
								handleRedirect('https://imperfectgamers.org/infractions')
						}}
						tabIndex={0}
					>
						INFRACTIONS
					</button>
					<div className="list__item active !cursor-default">STORE</div>
					<button
						className="list__item"
						onClick={() =>
							handleRedirect('https://support.imperfectgamers.org')
						}
						onKeyUp={event => {
							if (event.key === 'Enter')
								handleRedirect('https://support.imperfectgamers.org')
						}}
						tabIndex={0}
					>
						SUPPORT
					</button>
				</ul>
			)}
		</nav>
	)
}

export default StoreNavbar
