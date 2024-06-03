// Atoms/PriceLabel/PriceLabel.tsx
import price from './PriceLabel.module.css'

/**
 * Renders a price label component.
 * @param {boolean} isYearly - Indicates whether the price is yearly or monthly.
 * @returns {JSX.Element} The rendered price label component.
 */
/**
 * Renders a price label component.
 * @param {boolean} isYearly - Indicates whether the price is yearly or monthly.
 * @returns {JSX.Element} The rendered price label component.
 */
export const PriceLabel = ({ isYearly }: { isYearly: boolean }) => {
	return (
		<p
			className={`${price.label} mt-2 ${isYearly ? `${price.label_change}` : ''}`}
		>
			{isYearly ? '$200/year - Coming soon!' : '$20/month'}
		</p>
	)
}
