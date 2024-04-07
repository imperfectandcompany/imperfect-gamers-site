// TestimonialsSection.tsx
import React from 'react';
import Testimonial from '../organism/Testimonial';

const StoreTestimonials: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Members Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="John Doe"
            role="Skill Surfer"
            imageSrc="https://placehold.co/100x100"
          >
            "Joining the club through premium has been a game-changer. The exclusive servers and community events have made my gaming experience so much better!"
          </Testimonial>
          <Testimonial
            name="Joe Mama"
            role="Freestyle Listener"
            imageSrc="https://placehold.co/100x100"
          >
            "The premium membership perks are incredible. I love the custom HUD and the priority support. It's worth every penny!"
          </Testimonial>
          <Testimonial
            name="Granny Apple"
            role="Rapper"
            imageSrc="https://placehold.co/100x100"
          >
            "I've been a member for over a year now, and the community has been incredibly welcoming. The slot reservation feature is a lifesaver during peak hours."
          </Testimonial>
        </div>
      </div>
    </section>
  );
};

export default StoreTestimonials;