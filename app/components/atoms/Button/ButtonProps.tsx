// components/atoms/Button/ButtonProps.tsx
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { type ReactNode } from 'react'

/**
 * Represents the props for the Button component.
 */
export type ButtonProps = {
	/**
	 * The variant of the button.
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary' | 'danger'

	/**
	 * Specifies whether the button is disabled.
	 */
	disabled?: boolean

	/**
	 * The type of the button.
	 * @default 'button'
	 */
	type?: 'button' | 'submit' | 'reset'

	/**
	 * The icon to be displayed on the button.
	 */
	icon?: IconDefinition

	/**
	 * The content to be displayed inside the button.
	 */
	children: ReactNode

	/**
	 * The function to be called when the button is clicked.
	 */
	onClick?: () => void

	/**
	 * The CSS class name for the button.
	 */
	className?: string
}
