import type React from 'react'

interface MessageContainerProps {
	message: string
}

const MessageContainer: React.FC<MessageContainerProps> = ({ message }) => {
	return (
		<div className="message-container mb-4" role="alert">
			<div className="error-message-fade">{message}</div>
			<div className="progress-container">
				<svg className="progress-ring" viewBox="0 0 100 100">
					<circle
						className="base-circle"
						strokeWidth="10"
						cx="50"
						cy="50"
						r="40"
						fill="transparent"
					></circle>
					<circle
						className="progress-circle"
						strokeWidth="10"
						strokeLinecap="round"
						cx="50"
						cy="50"
						r="40"
						fill="transparent"
						strokeDasharray="251.2"
						strokeDashoffset="251.2"
						style={{ transition: 'strokeDashoffset 5s linear' }}
					></circle>
				</svg>
			</div>
		</div>
	)
}

export default MessageContainer
