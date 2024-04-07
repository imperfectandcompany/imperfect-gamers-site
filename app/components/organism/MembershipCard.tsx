import React, { useState } from 'react';
import '~/styles/MembershipCard.css';
import PriceLabel from '../atoms/PriceLabel';
import { PriceToggle } from '../molecule/PriceToggle';

interface MembershipCardProps {
    // Define props here if needed, for example:
    // monthlyPrice: string;
    // yearlyPrice: string;
}

const MembershipCard: React.FC<MembershipCardProps> = (props) => {
    const [isYearly, setIsYearly] = useState(false);
    const uniqueFilterId = `gooey-${Math.random()}`; // Unique ID for the filter

    // Function to toggle between monthly and yearly pricing
    const handleToggle = () => setIsYearly(!isYearly);

    return (
        <>
            <div className="membership-card mx-auto hover:cursor-pointer">
                {/* Card content goes here. Use props and state as needed. */}
                <div className="tooltip-content">Click to view membership rewards</div>
                <div className="flex flex-col items-start justify-between h-full">
                    {/* TODO move logo file to local instead of using cdn */}
                    {/* TODO place logo inside of spinback efect within card and set current placement for "USER NAME" */}
                    <img className="logo-image"
                        src="https://cdn.imperfectgamers.org/inc/assets/logo/isometric-mark-text.png"
                        alt="Membership Logo" />
                    <div>
                        <h1 className="text-2xl font-bold">
                            {/* TODO Add smokey effect on PREMIUM text */}
                            <svg viewBox="0 0 100 10" className="membership-tier">
                                <filter id={uniqueFilterId} x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="
                                1 0 0 0 0
                                0 1 0 0 0
                                0 0 1 0 0
                                0 0 0 18 -7" result="gooey" />
                                    <feBlend in="SourceGraphic" in2="gooey" />
                                </filter>
                                <g mask={`url(#${uniqueFilterId})`}>
                                    <rect id="showMask" height="100" width="100" fill="#919895" opacity="0" />
                                    {/* Align with $20/month */}
                                    <text x="50" y="6" fill="rgba(255,255,255,0.5)" textAnchor="middle"
                                        dominantBaseline="middle" fontSize="10" fontFamily="monospace">
                                        PREMIUM
                                    </text>
                                </g>
                            </svg>
                        </h1>
                        <PriceLabel isYearly={isYearly} />
                    </div>
                </div>
                <div className="spinback-effect"></div>
            </div>
            <PriceToggle isYearly={isYearly} onToggle={handleToggle} />
        </>
    );
};

export default MembershipCard;
