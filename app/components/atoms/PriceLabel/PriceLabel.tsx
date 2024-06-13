// Atoms/PriceLabel/PriceLabel.tsx
import { useEffect, useState } from 'react'
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
	const [animationClass, setAnimationClass] = useState('')
	const [priceText, setPriceText] = useState(
		isYearly ? '$200/year - Coming soon!' : '$12/month',
	)

	useEffect(() => {
		setAnimationClass(price.label_change); // Trigger the animation
		const textTimer = setTimeout(() => {
			// Update the text in the middle of the animation
			setPriceText(isYearly ? '$200/year - Coming soon!' : '$12/month');
		}, 300); // Half the duration of your CSS animation
		const animationTimer = setTimeout(() => {
			setAnimationClass(''); // Reset animation class after it completes
		}, 600);
		return () => {
			clearTimeout(textTimer);
			clearTimeout(animationTimer);
		};
	}, [isYearly]);

	return <p className={`${price.label} mt-2 ${animationClass}`}>{priceText}</p>
}
