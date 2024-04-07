import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, children }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => setIsActive(!isActive);

  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
      <div className="faq-question" onClick={toggleIsActive}>
        {question}
      </div>
      {isActive && <div className="faq-answer">{children}</div>}
    </div>
  );
};

export default FAQItem;