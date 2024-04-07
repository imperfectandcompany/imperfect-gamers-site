// Atoms/ToggleSwitch.tsx
export const ToggleSwitch = ({ isYearly, onToggle }: { isYearly: boolean, onToggle: () => void }) => {
        return (
            <label className="switch">
                <input type="checkbox" checked={isYearly} onChange={onToggle} />
                <span className="slider round"></span>
            </label>
        );
    };