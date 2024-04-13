import React from 'react';

interface Feature {
    tooltip?: string;
    name: string;
    included: boolean;
}

interface MembershipTierProps {
    planType: string;
    planName: string;
    features: Feature[];
    trialInfo?: string;
    additionalInfo?: string;
}

/**
 * Renders a tooltip component that displays additional content when hovered over.
 *
 * @param children - The content to be rendered inside the tooltip.
 * @param content - The text content to be displayed in the tooltip.
 * @returns The tooltip component.
 */
function Tooltip({ children, content }: { children: React.ReactNode, content: string }) {
    const [show, setShow] = React.useState(false);

    return (
        <div className="relative flex items-center gap-1.5" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {show && (
                <div className="absolute bottom-full mb-2 px-3 py-1 bg-black text-white text-xs rounded shadow-lg z-10">
                    {content}
                </div>
            )}
        </div>
    );
}


/**
 * Renders a membership tier component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.planType - The type of membership plan.
 * @param {string} props.planName - The name of the membership plan.
 * @param {Array<object>} props.features - The list of features for the membership plan.
 * @param {string} props.trialInfo - The trial information for the membership plan.
 * @param {string} props.additionalInfo - Additional information for the membership plan.
 * @returns {JSX.Element} The rendered membership tier component.
 */
const MembershipTier: React.FC<MembershipTierProps> = ({ planType, planName, features, trialInfo, additionalInfo }) => (
    <div className="w-full max-w-md py-10 px-8 bg-black bg-opacity-50 rounded-md border border-gray-700/50 flex flex-col">
        {trialInfo && (
            <div className="mb-3">
                <span className="text-xs p-1.5 bg-red-200 bg-opacity-20 text-red-400 rounded">{trialInfo}</span>
            </div>
        )}
        <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${planType === 'Basic' ? 'from-gray-200 via-gray-200 to-gray-300' : 'from-gray-200 via-red-200 to-red-300'}`}>
            {planName}
        </h3>
        <div className="flex-1 mt-6 flex flex-col justify-between">
            <div className="space-y-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 group cursor-pointer transition duration-150 ease-in-out">
                        <i className={`fas ${feature.included ? 'fa-check' : 'fa-times'} ${planType === 'Basic' ? 'text-gray-400' : 'text-red-400'} transition filter group-hover:brightness-150 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]`}></i>
                        {feature.tooltip ? (
                            <Tooltip content={feature.tooltip}>
                                <span className={`text-white/50 ${!feature.included && 'line-through'} group-hover:text-${planType === 'Basic' ? 'gray-400' : 'red-400'}`}>{feature.name}</span>
                            </Tooltip>
                        ) : (
                            <span className={`text-white ${!feature.included && 'line-through'} group-hover:text-${planType === 'Basic' ? 'gray-400' : 'red-400'}`}>{feature.name}</span>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-10 text-xs text-gray-500">
                {additionalInfo}
            </div>
        </div>
    </div>
);

export default MembershipTier;
