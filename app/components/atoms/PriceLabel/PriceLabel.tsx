// Atoms/PriceLabel/PriceLabel.tsx
import price from './PriceLabel.module.css';

export const PriceLabel = ({ isYearly }: { isYearly: boolean }) => {
        return (
            <p className={`${price.label} mt-2 ${isYearly ? `${price.label_change}` : ''}`}>
                {isYearly ? '$200/year' : '$20/month'}
            </p>
        );
};