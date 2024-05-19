import { errorMessageStyles } from '~/components/atoms/styles/ErrorMessageStyles'

interface ErrorMessageProps {
	showError: boolean
	message: string
	id: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
	showError,
	message,
	id,
}) => {
	return (
		<div
			id={id}
			className={`${errorMessageStyles.error} ${showError ? errorMessageStyles.show : ''}`}
			aria-live="assertive"
			role="alert"
		>
			{message}
		</div>
	)
}

export default ErrorMessage
