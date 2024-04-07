// Molecules/PriceToggle.tsx

import { ToggleSwitch } from '../../atoms/ToggleSwitch/ToggleSwitch';
import price from './PriceToggle.module.css';

export const PriceToggle = ({ isYearly, onToggle }: { isYearly: boolean, onToggle: () => void }) => {
        return (
            <div className={price.toggle}>
                <span className={price.toggle__label}>Monthly</span>
                <ToggleSwitch isYearly={isYearly} onToggle={onToggle} />
                <span className={price.toggle__label}>Annually</span>
            </div>
        );
    };