// StoreFeatured.tsx
import React from 'react';
import FeaturedSection from '../organism/FeaturedSection';
import FeaturedItem from '../molecule/FeaturedItem';

// Data definition
const featuredData = [
  {
    imageSrc: "https://example.com/featured-image.jpg",
    notice: "20%",
    title: "MEMBERSHIP IN GLOBAL RECORDS",
    description: "With the highest consideration of a matrix between an enhanced surfing and musical experience."
  }
];

// Data passed as a prop to FeaturedSection
const StoreFeatured: React.FC = () => (
  <>
                   <FeaturedItem
                        discount="20% OFF ON FIRST MONTH"
                        title="Special Perks you'd really love"
                        description="With the highest consideration of a matrix between an enhanced surfing and musical experience."
                        imageUrl="https://imperfectgamers.org/assets/store/heart.png"
                        imageAlt="Heartbeat animation icon"
                    />
  </>
);

export default StoreFeatured;
