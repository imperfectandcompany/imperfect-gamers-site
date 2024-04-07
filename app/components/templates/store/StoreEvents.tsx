import React from 'react';
import EventItem from '~/components/molecule/EventItem';

const StoreEvents: React.FC = () => {
  return (
    <section className="py-12 bg-black bg-opacity-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white/90">
          <span className="inline-block p-2 bg-black bg-opacity-50 rounded-full transform transition duration-500 hover:scale-110">
            Exclusive Events
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EventItem
            title="Premium Surfing and Rap Battle Tournaments"
            description="Join our monthly Premium-only surfing and rap battle tournaments with big prizes and bragging rights."
            link="#"
          />
          <EventItem
            title="Members-Only Livestream"
            description="Get exclusive access to our members-only livestreams with special guests and Q&A sessions."
            link="#"
          />
        </div>
      </div>
    </section>
  );
};

export default StoreEvents;