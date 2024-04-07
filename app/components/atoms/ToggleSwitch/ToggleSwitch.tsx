// Atoms/ToggleSwitch.tsx
import toggle from './ToggleSwitch.module.css';

export const ToggleSwitch = ({ isYearly, onToggle }: { isYearly: boolean, onToggle: () => void }) => {
        return (
            <label className={toggle.switch}>
                <input className={`${toggle['switch__input']}`} type="checkbox" checked={isYearly} onChange={onToggle} />
                <span className={`${toggle['switch__slider']} ${toggle['switch__slider_round']}`}></span>
            </label>
        );
    };