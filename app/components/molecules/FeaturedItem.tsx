import React from 'react';
import Text from '../atoms/Text';

interface FeaturedItemProps {
    discount: string;
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
}

/**
 * Represents a featured item component.
 * @param discount - The discount value.
 * @param title - The title of the item.
 * @param description - The description of the item.
 * @param imageUrl - The URL of the item's image.
 * @param imageAlt - The alt text for the item's image.
 */
const FeaturedItem: React.FC<FeaturedItemProps> = ({ discount, title, description, imageUrl, imageAlt }) => (
    <div className="flex justify-end">
        <div className="flex justify-end">
            <div className="flex-col text-white">
                <div>
                    <p className="text-red-400 text-2xl mb-2 text-right">
                        {discount}
                    </p>
                </div>
                <div className="flex sm:items-center">
                    <div className="mr-8 mb-4">
                        <img src={imageUrl} className="animate-heartbeat heart" alt={imageAlt} style={{ animation: '0.5s ease 0s 1 normal forwards running hoverOutEffect, 2s ease 0.5s infinite normal none running heartbeat' }} />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold mb-4 text-right">
                            {title}
                        </h2>
                        <p className="text-right text-gray-400">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default FeaturedItem;
