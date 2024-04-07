import React, { useState } from 'react';

interface MembershipCardProps {
    // Define props here if needed, for example:
    // monthlyPrice: string;
    // yearlyPrice: string;
}

const MembershipCard: React.FC<MembershipCardProps> = (props) => {
    const [isYearly, setIsYearly] = useState(false);
    const uniqueFilterId = `gooey-${Math.random()}`; // Unique ID for the filter

    // Function to toggle between monthly and yearly pricing
    const togglePricing = () => setIsYearly(!isYearly);

    return (
        <>

            <div className="membership-card mx-auto hover:cursor-pointer">
                {/* Card content goes here. Use props and state as needed. */}
                <div className="tooltip-content">Click to view membership rewards</div>
                <div className="flex flex-col items-start justify-between h-full">
                    <img className="logo-image"
                        src="https://cdn.imperfectgamers.org/inc/assets/logo/isometric-mark-text.png"
                        alt="Membership Logo" />
                    <div>
                        <h1 className="text-2xl font-bold">
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
                        {/* TODO add same effect when you toggle back */}
                        <p className={`card-price mt-2 ${isYearly ? 'card-price-change' : ''}`}>
                            {isYearly ? '$200/year' : '$20/month'}
                        </p>
                    </div>
                </div>
                <div className="spinback-effect"></div>
            </div>
            <div className="price-toggle">
                <span className="price-label">Monthly</span>
                <label className="switch">
                    <input type="checkbox" onChange={togglePricing} />
                    <span className="slider round"></span>
                </label>
                <span className="price-label">Annually</span>
            </div>

            <div className="flex justify-center fade-down">
                <button className="button outline-none">
                    <span>Join Now</span>
                </button>
            </div>
        </>
    );
};

export default MembershipCard;
