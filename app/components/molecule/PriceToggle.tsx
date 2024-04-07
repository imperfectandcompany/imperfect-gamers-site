import { ToggleSwitch } from "../atoms/ToggleSwitch";

// Molecules/PriceToggle.jsx
export const PriceToggle = ({ isYearly, onToggle }: { isYearly: boolean, onToggle: () => void }) => {
        return (
            <div className="price-toggle">
                <span className="price-label">Monthly</span>
                <ToggleSwitch isYearly={isYearly} onToggle={onToggle} />
                <span className="price-label">Annually</span>
            </div>
        );
    };