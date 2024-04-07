// Atoms/PriceLabel.jsx
export const PriceLabel = ({ isYearly }: { isYearly: boolean }) => {
        return (
            <p className="card-price mt-2">
                {isYearly ? '$200/year' : '$20/month'}
            </p>
        );
    };

    export default PriceLabel;