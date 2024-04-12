// FeaturedPartnership.tsx
import React from 'react';

interface FeaturedPartnershipProps {
  logoSrc: string;
  logoAlt: string;
  title: string;
  description: React.ReactNode;
  link: string;
  linkText: string;
}

const FeaturedPartnership: React.FC<FeaturedPartnershipProps> = ({ logoSrc, logoAlt, title, description, link, linkText }) => {
  return (
    <section>
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
          <img src={logoSrc} alt={logoAlt} className="h-32 lg:h-32 xl:h-48" />
        </div>
        <div className="lg:w-1/2 text-center lg:text-right">
          <h3 className="text-3xl font-bold mb-4">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">
            {description}
            <a className="text-red-600" href={link}>
              {linkText}
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPartnership;