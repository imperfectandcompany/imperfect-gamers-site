// components/organism/MembershipCard.tsx

import React, { useState } from 'react';
import { PriceToggle } from '../../molecule/PriceToggle/PriceToggle';
import styles from './MembershipCard.module.css';
import { PriceLabel } from '~/components/atoms/PriceLabel/PriceLabel';

interface MembershipCardProps {
    // Define props here if needed, for example:
    // monthlyPrice: string;
    // yearlyPrice: string;
}

export const MembershipCard: React.FC<MembershipCardProps> = (props) => {
    const [isYearly, setIsYearly] = useState(false);
    const uniqueFilterId = `gooey-${Math.random()}`; // Unique ID for the filter

    // Function to toggle between monthly and yearly pricing
    const handleToggle = () => setIsYearly(!isYearly);

    return (
        <>
            <div className={`${styles['membership-card']} mx-auto hover:cursor-pointer`}>
                <div className={styles['membership-card__tooltip']}>Click to view membership rewards</div>
                <div className="flex flex-col items-start justify-between h-full">
                    <img className={styles['membership-card__logo']}
                        src="https://cdn.imperfectgamers.org/inc/assets/logo/isometric-mark-text.png"
                        alt="Membership Logo" />
                    <div>
                        <h1 className="text-2xl font-bold">
                            <svg viewBox="0 0 100 10" className={styles['membership-card__tier']}>
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
                <div className={styles['membership-card__spinback-effect']}></div>
            </div>
            <PriceToggle isYearly={isYearly} onToggle={handleToggle} />
        </>
    );
};