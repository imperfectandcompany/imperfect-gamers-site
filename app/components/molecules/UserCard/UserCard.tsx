import { useState } from 'react'
import LottieAnimation from '~/components/atoms/LottieAnimation'

interface UserCardProps {
	onClick: () => void
	title?: string
	subtitle: string
	description: string
	animationUrl: string
	hoverAnimationUrl: string
	styleType?: 'primary' | 'secondary'
}

const UserCard: React.FC<UserCardProps> = ({
	onClick,
	title,
	subtitle,
	description,
	animationUrl,
	hoverAnimationUrl,
	styleType = 'secondary'
}) => {
	const [isHovered, setIsHovered] = useState(false)
	const titleWords = title ? title.split(' ') : ('')
	const formattedTitle =
		titleWords.length > 1 ? (
			<>
				{titleWords[0]}
				<br />
				{Array.isArray(titleWords) ? titleWords.slice(1).join(' ') : titleWords}
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

	const subtitleColor = styleType === 'primary' ? 'text-yellow-500' : 'text-red-500'
	const borderColor = styleType === 'primary' ? 'hover:border-yellow-500' : 'hover:border-rose-500'

	return (
		<div
		className={`relative cursor-pointer border-2 border-l-red-400 border-r-orange-500 border-t-red-500 border-b-orange-600 transition duration-300 ease-in-out hover:-translate-y-1 ${borderColor}`}
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

					{(isHovered && styleType=='primary' || styleType=='secondary') && title ? (
						<h2 className="font-bold text-white md:text-xl transition ease-in-out duration-300 lg:text-4xl">{formattedTitle}</h2>
					) : null}
					<p className={`font-semibold ${subtitleColor} md:text-lg lg:text-xl`}>
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
