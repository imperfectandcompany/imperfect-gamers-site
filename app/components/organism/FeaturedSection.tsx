import React from 'react';
import FeaturedItem from '../molecules/FeaturedItem';

interface Featured {
    imageSrc: string;
    title: string;
    description: string;
    notice?: string;
    className?: string;
}

interface FeaturedSectionProps {
    featured: Featured[];
    className?: string;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ featured, className }) => (
    <div className={`featured-section ${className || ''}`.trim()}>
        {featured ? featured.map((featuredSingle, index) => (
            <FeaturedItem key={index} {...featuredSingle} className={`mr-8 mb-4 ${featuredSingle.className || ''}`.trim()} />
        )) : <p>No featured items available.</p>}
    </div>
);

export default FeaturedSection;
