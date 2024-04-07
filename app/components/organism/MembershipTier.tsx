import React from 'react';
import FeaturedItem from '../molecule/FeaturedItem';


interface Feature {
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
                                <span className={`text-white ${!feature.included && 'line-through'} group-hover:text-${planType === 'Basic' ? 'gray-400' : 'red-400'}`}>{feature.name}</span>
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
