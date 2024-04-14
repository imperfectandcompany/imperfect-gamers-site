// Atoms/ToggleSwitch.tsx
import toggle from './ToggleSwitch.module.css';

/**
 * A toggle switch component.
 *
 * @param {boolean} isYearly - Indicates whether the switch is set to yearly or not.
 * @param {Function} onToggle - Callback function to be called when the switch is toggled.
 * @returns {JSX.Element} - The toggle switch component.
 */
export const ToggleSwitch = ({
	isYearly,
	onToggle,
}: {
	isYearly: boolean;
	onToggle: () => void;
}): JSX.Element => {
	return (
		<label className={toggle.switch}>
			<input
				className={`${toggle.switch__input}`}
				type="checkbox"
				checked={isYearly}
				onChange={onToggle}
			/>
			<span
				className={`${toggle.switch__slider} ${toggle.switch__slider_round}`}
			></span>
		</label>
	);
};
