// ~/app/components/atoms/input/InputBase.tsx
import type React from 'react'

type InputBaseProps = {
	type: string
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

const InputBase: React.FC<InputBaseProps> = ({
	type,
	onBlur,
	onChange,
	...props
}) => {
	return <input {...props} type={type} onBlur={onBlur} onChange={onChange} />
}

export default InputBase
