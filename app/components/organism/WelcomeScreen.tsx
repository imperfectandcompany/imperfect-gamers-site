import type React from 'react'
import { useEffect } from 'react'
import ImperfectGamersLogo from '../atoms/ImperfectGamersLogo'
import UserCard from '../molecules/UserCard/UserCard'
import { CloseInterceptReason } from '../organism/ModalWrapper/ModalWrapper'

interface WelcomeScreenProps {
	onNewUser: () => void
	onExistingUser: () => void
	setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

const WelcomeScreen: React.FC<
	WelcomeScreenProps & { isAuthenticated: boolean }
> = ({
	onNewUser,
	onExistingUser,
	isAuthenticated,
	setCloseInterceptReason,
}) => {
	useEffect(() => {
		// Ensures that modal can be closed without restrictions when on this screen.
		// https://github.com/imperfectandcompany/Imperfect-Gamers-Site-Store/issues/76#issuecomment-2143657679
		if (setCloseInterceptReason) {
			setCloseInterceptReason(CloseInterceptReason.None)
		}
	}, [setCloseInterceptReason])

	return (
		<div className="mt-8 flex flex-col items-center justify-center bg-black px-4 pb-8">
			<div className="w-full max-w-4xl">
				<h1 className="mb-8 select-none text-center text-4xl font-bold text-white">
					Who&apos;s joining?
				</h1>
				<div className="flex flex-row items-center justify-center space-x-4 md:space-x-4 md:space-y-0">
					<div>
						<UserCard
							onClick={onNewUser}
							title="First Timer"
							subtitle="New here"
							description="Unranked"
							animationUrl="https://lottie.host/5c1a10ad-b448-4a7c-b7c8-84a65f085881/lJ60raf46T.json"
							hoverAnimationUrl="https://lottie.host/f4cdfc7c-f9a3-40ae-ab75-f7b3dd57f678/N0XLmIQErG.json"
							styleType="primary"
						/>
					</div>
					<div>
						<UserCard
							onClick={onExistingUser}
							title="Old Timer"
							subtitle="Been here"
							description="Veteran"
							hoverAnimationUrl="https://lottie.host/879e211e-1f3a-4015-8815-79d5cd1af0d2/RaWWjJVbB4.json"
							animationUrl="https://lottie.host/fd083183-9af6-4295-a9f1-acdd2d321ee7/lJD5sQ893r.json"
						/>
					</div>
				</div>
			</div>
			{!isAuthenticated ? (
				<>
					<p className="animate mt-8 flex select-none flex-col items-center text-center text-sm text-stone-400">
						<ImperfectGamersLogo />
					</p>
				</>
			) : null}
		</div>
	)
}

export default WelcomeScreen
