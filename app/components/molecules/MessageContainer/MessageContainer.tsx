import { messageContainerStyles } from '~/components/atoms/styles/MessageContainerStyles'
import { progressRingStyles } from '~/components/atoms/styles/ProgressRingStyles'

interface MessageContainerProps {
	message: string
}

const MessageContainer: React.FC<MessageContainerProps> = ({ message }) => {
	return (
		<div className={messageContainerStyles.container}>
			<span>{message}</span>
			<div className={progressRingStyles.container}>
				<svg className={progressRingStyles.ring}>
					<circle
						className={progressRingStyles.baseCircle}
						cx="8"
						cy="8"
						r="7"
						strokeWidth="2"
						fill="none"
					/>
					<circle
						className={progressRingStyles.progressCircle}
						cx="8"
						cy="8"
						r="7"
						strokeWidth="2"
						fill="none"
						strokeDasharray="44"
						strokeDashoffset="44"
					/>
				</svg>
			</div>
		</div>
	)
}

export default MessageContainer
