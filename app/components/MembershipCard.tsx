import React, { useState } from 'react';

// If you have a separate CSS file for styles, import it here
import './MembershipCard.css'; 

interface MembershipCardProps {
  // Define props here if needed, for example:
  // monthlyPrice: string;
  // yearlyPrice: string;
}

const MembershipCard: React.FC<MembershipCardProps> = (props) => {
  const [isYearly, setIsYearly] = useState(false);

  // Function to toggle between monthly and yearly pricing
  const togglePricing = () => setIsYearly(!isYearly);

  return (
    <div className="membership-card">
      {/* Card content goes here. Use props and state as needed. */}
      <div className="tooltip-content">Click to view membership rewards</div>
      {/* ... */}
      <div className="price-toggle">
        <span className="price-label">Monthly</span>
        <label className="switch">
          <input type="checkbox" onChange={togglePricing} />
          <span className="slider round"></span>
        </label>
        <span className="price-label">Annually</span>
      </div>
      {/* Display pricing based on isYearly state */}
      <p className="card-price">{isYearly ? '$200/year' : '$20/month'}</p>
      {/* ... */}
    </div>
  );
};

export default MembershipCard;
