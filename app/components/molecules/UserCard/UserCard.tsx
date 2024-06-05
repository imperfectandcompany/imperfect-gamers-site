import { useState } from 'react'
import LottieAnimation from '~/components/atoms/LottieAnimation'

interface UserCardProps {
	onClick: () => void
	title: string
	subtitle: string
	description: string
	animationUrl: string
	hoverAnimationUrl: string // new prop
}

const UserCard: React.FC<UserCardProps> = ({
	onClick,
	title,
	subtitle,
	description,
	animationUrl,
	hoverAnimationUrl,
}) => {
	const [isHovered, setIsHovered] = useState(false)
	const titleWords = title.split(' ')
	const formattedTitle =
		titleWords.length > 1 ? (
			<>
				{titleWords[0]}
				<br />
				{titleWords.slice(1).join(' ')}
			</>
		) : (
			title
		)

	const handleMouseEnter = (e: React.MouseEvent) => {
		e.stopPropagation() // Stop event propagation
		setIsHovered(true)
	}

	const handleMouseLeave = (e: React.MouseEvent) => {
		e.stopPropagation() // Stop event propagation
		setIsHovered(false)
	}

	return (
		<div
			className="relative cursor-pointer border-2 border-white transition duration-300 ease-in-out hover:-translate-y-1 hover:border-red-500"
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			role="button"
			tabIndex={0}
			onKeyDown={event => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault()
					onClick()
				}
			}}
		>
			<div>
				<LottieAnimation
					animationUrl={isHovered ? hoverAnimationUrl : animationUrl}
					loop={!isHovered}
				/>
				<div className="absolute inset-x-0 bottom-0 select-none bg-gradient-to-t from-black to-transparent p-4">
					<h2 className="font-bold text-white md:text-xl lg:text-4xl">
						{formattedTitle}
					</h2>
					<p className="font-semibold text-red-500 md:text-lg lg:text-xl">
						{subtitle}
					</p>
					{/* <p className="text-white">{description}</p>
        <p className="text-gray-300">What's good 😎</p> */}
				</div>
			</div>
		</div>
	)
}
export default UserCard
