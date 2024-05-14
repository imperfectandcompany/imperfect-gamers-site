import type React from 'react'
import ImperfectGamersLogo from '../atoms/ImperfectGamersLogo'
import UserCard from '../molecules/UserCard/UserCard'

interface WelcomeScreenProps {
	onNewUser: () => void
	onExistingUser: () => void
}

const WelcomeScreen: React.FC<
	WelcomeScreenProps & { isAuthenticated: boolean }
> = ({ onNewUser, onExistingUser, isAuthenticated }) => {
	return (
		<div className="flex flex-col items-center justify-center bg-black px-4 pb-8">
			<div className="w-full max-w-4xl">
				<h1 className="mb-8 select-none text-center text-4xl font-bold text-white">
					Who's joining?
				</h1>
				<div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
					<UserCard
						onClick={onNewUser}
						title="First Timer"
						subtitle="New here"
						description="Unranked"
						animationUrl="https://lottie.host/f4cdfc7c-f9a3-40ae-ab75-f7b3dd57f678/N0XLmIQErG.json"
					/>
					<UserCard
						onClick={onExistingUser}
						title="Old Timer"
						subtitle="Been here"
						description="Veteran"
						animationUrl="https://lottie.host/879e211e-1f3a-4015-8815-79d5cd1af0d2/RaWWjJVbB4.json"
					/>
				</div>
			</div>
			{!isAuthenticated ? (
				<>
					<p className="animate mt-4 flex select-none flex-col items-center text-center text-sm text-stone-400">
						Please log in or sign up to join the club.
						<ImperfectGamersLogo />
					</p>
				</>
			) : null}
		</div>
	)
}

export default WelcomeScreen
