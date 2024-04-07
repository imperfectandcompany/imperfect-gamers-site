import React from 'react';
import FAQSection from '../organism/FAQSection';

const faqs = [
  {
    question: 'What does the Premium membership include?',
    answer: (
      <p>
        You may view above to take a look at the rewards offered for being a premium member on Imperfect Gamers, but if
        you'd like to speak to someone, you can do so on our{' '}
        <a href="https://imperfectgamers.org/discord" target="_blank" rel="noopener noreferrer">
          <span className="text-red-400 hover:underline font-medium">Discord</span>
        </a>
        .
      </p>
    ),
  },
  {
    question: 'How can I cancel my membership?',
    answer: <p>You can cancel your membership at any time through your account settings or by contacting customer support.</p>,
  },
  // ... other FAQ items
];

const StoreFAQ: React.FC = () => {
  return <FAQSection faqs={faqs} />;
};

export default StoreFAQ;