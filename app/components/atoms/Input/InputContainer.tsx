// ~/app/components/atoms/input/InputContainer.tsx
import type React from 'react'
import { useState } from 'react'
import { useField } from 'remix-validated-form'
import InputBase from './InputBase'

type InputContainerProps = {
  name: string
  type: string
} & React.InputHTMLAttributes<HTMLInputElement>

const InputContainer: React.FC<InputContainerProps> = ({ name, type, ...props }) => {
  const [isTouched, setIsTouched] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const { error, getInputProps } = useField(name)
  const inputProps = getInputProps({ id: name, ...props })

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true)
    setHasValue(e.target.value !== '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== '')
  }

  return (
    <>
      <InputBase
        {...inputProps}
        type={type}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {error ? <div className="text-red-600">{error}</div> : null}
    </>
  )
}

export default InputContainer