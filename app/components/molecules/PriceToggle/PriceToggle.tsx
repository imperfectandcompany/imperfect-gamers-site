// Molecules/PriceToggle.tsx

import { ToggleSwitch } from '../../atoms/ToggleSwitch/ToggleSwitch'
import price from './PriceToggle.module.css'

/**
 * Renders a price toggle component.
 *
 * @param {boolean} isYearly - Indicates whether the toggle is set to yearly or monthly.
 * @param {() => void} onToggle - Callback function to handle toggle changes.
 * @returns {JSX.Element} - The rendered price toggle component.
 */
export const PriceToggle = ({
	isYearly,
	onToggle,
}: {
	isYearly: boolean
	onToggle: () => void
}) => {
	return (
		<div className={`${price.toggle} select-none`}>
			<span
				className={`${price.toggle__label} ${!isYearly ? price['toggle__label--active'] : ''}`}
			>
				Monthly
			</span>
			<ToggleSwitch isYearly={isYearly} onToggle={onToggle} />
			<span
				className={`${price.toggle__label} ${isYearly ? price['toggle__label--active'] : ''}`}
			>
				Annually
			</span>
		</div>
	)
}
