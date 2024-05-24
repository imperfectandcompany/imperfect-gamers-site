import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputField from '~/components/molecules/InputField/InputField'

describe('InputField', () => {
	const handleChange = jest.fn()
	const handleFocus = jest.fn()
	const handleBlur = jest.fn()

	beforeEach(() => {
		handleChange.mockClear()
		handleFocus.mockClear()
		handleBlur.mockClear()
	})

	test('renders input field with correct props', () => {
		render(
			<InputField
				name="test"
				type="text"
				placeholder="Enter text"
				value=""
				error={false}
				isFocused={false}
				isTyping={false}
				handleValueChange={handleChange}
				handleFocus={handleFocus}
				handleBlur={handleBlur}
			/>,
		)

		const inputElement = screen.getByPlaceholderText('Enter text')
		expect(inputElement).toBeInTheDocument()
		expect(inputElement).toHaveAttribute('type', 'text')
		expect(inputElement).toHaveValue('')
		expect(inputElement).not.toHaveClass('border-red-500')
		expect(inputElement).not.toHaveClass('border-green-500')
	})

	test('calls handleValueChange when input value changes', async () => {
		render(
			<InputField
				name="test"
				type="text"
				placeholder="Enter text"
				value=""
				error={false}
				isFocused={false}
				isTyping={false}
				handleValueChange={handleChange}
				handleFocus={handleFocus}
				handleBlur={handleBlur}
			/>,
		)

		const inputElement = screen.getByPlaceholderText('Enter text')
		await userEvent.type(inputElement, 'Hello')

		expect(handleChange).toHaveBeenCalledTimes(5)
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
		expect(inputElement).toHaveValue('Hello')
	})

	test('calls handleFocus when input is focused', () => {
		render(
			<InputField
				name="test"
				type="text"
				placeholder="Enter text"
				value=""
				error={false}
				isFocused={false}
				isTyping={false}
				handleValueChange={handleChange}
				handleFocus={handleFocus}
				handleBlur={handleBlur}
			/>,
		)

		const inputElement = screen.getByPlaceholderText('Enter text')
		fireEvent.focus(inputElement)

		expect(handleFocus).toHaveBeenCalledTimes(1)
	})

	test('calls handleBlur when input is blurred', () => {
		render(
			<InputField
				name="test"
				type="text"
				placeholder="Enter text"
				value=""
				error={false}
				isFocused={false}
				isTyping={false}
				handleValueChange={handleChange}
				handleFocus={handleFocus}
				handleBlur={handleBlur}
			/>,
		)

		const inputElement = screen.getByPlaceholderText('Enter text')
		fireEvent.blur(inputElement)

		expect(handleBlur).toHaveBeenCalledTimes(1)
	})
})
