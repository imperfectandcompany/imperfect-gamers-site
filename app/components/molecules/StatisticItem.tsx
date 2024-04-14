// StatisticItem.tsx
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type React from 'react'
import IconElement from '../atoms/IconElement'

type StatisticItemProps = {
	iconName?: IconDefinition
	svgSrc?: string
	metric?: string
	description: string
	className?: string
}

/**
 * A component that represents a statistic item.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.iconName - The name of the icon.
 * @param {string} props.svgSrc - The source of the SVG icon.
 * @param {string} props.metric - The metric value.
 * @param {string} props.description - The description of the statistic.
 * @param {string} props.className - The additional class name for the component.
 * @returns {JSX.Element} The rendered StatisticItem component.
 */
const StatisticItem: React.FC<StatisticItemProps> = ({
	iconName,
	svgSrc,
	metric,
	description,
	className,
}) => (
	<div className={`statistic-item ${className}`}>
		{iconName ? <IconElement iconName={iconName} /> : null}{' '}
		{/* Only renders if iconName is provided */}
		{svgSrc ? (
			<img src={svgSrc} alt="icon" className="icon-class" />
		) : null}{' '}
		{/* // Adjust as needed */}
		{metric ? <p className="text-4xl font-bold">{metric}</p> : null}
		<p>{description}</p>
	</div>
)

export default StatisticItem
