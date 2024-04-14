// IconText.tsx
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type React from 'react'
import Text from '../atoms/Text'

type IconTextProps = {
	icon: IconDefinition
	text: string
}

/**
 * A component that displays an icon and accompanying text.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string} props.text - The text to display.
 * @returns {JSX.Element} The rendered IconText component.
 */
const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
	return (
		<div>
			<FontAwesomeIcon icon={icon} />
			<Text>{text}</Text>
		</div>
	)
}

export default IconText
