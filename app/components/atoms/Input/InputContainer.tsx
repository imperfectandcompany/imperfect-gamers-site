// ~/app/components/atoms/input/InputContainer.tsx
import type React from 'react'
import { useField } from 'remix-validated-form'
import InputBase from './InputBase'

type InputContainerProps = {
	name: string
	type: string
} & React.InputHTMLAttributes<HTMLInputElement>

const InputContainer: React.FC<InputContainerProps> = ({
	name,
	type,
	...props
}) => {
	const { error, getInputProps } = useField(name)
	const inputProps = getInputProps({ id: name, ...props })

	return (
		<>
			<InputBase {...inputProps} type={type} />
			{error ? <div className="text-red-600">{error}</div> : null}
		</>
	)
}

export default InputContainer
