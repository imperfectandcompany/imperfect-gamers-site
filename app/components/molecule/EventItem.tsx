// Event.tsx
import React from 'react';

interface EventItemProps {
  title: string;
  description: string;
  link: string;
}

const EventItem: React.FC<EventItemProps> = ({ title, description, link }) => {
  return (
    <div className="bg-gradient-to-br from-white/40 to-black/30 p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <a href={link} className="text-rose-600 hover:text-rose-400">Learn More</a>
    </div>
  );
};

export default EventItem;