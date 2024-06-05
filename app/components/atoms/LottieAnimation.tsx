import { Player } from '@lottiefiles/react-lottie-player'
import type React from 'react'

interface LottieAnimationProps {
	animationUrl: string
	style?: React.CSSProperties
	loop: boolean // new prop
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
	animationUrl,
	style,
	loop,
}) => (
	<Player
		autoplay
		loop={loop}
		className="size-28 md:size-48"
		src={animationUrl}
		rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
		style={{ ...style }} // Use the provided style and set width and height to 100%
		background="transparent"
		keepLastFrame={true}
	/>
)

export default LottieAnimation
