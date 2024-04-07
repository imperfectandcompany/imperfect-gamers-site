// Testimonial.tsx
import React from 'react';

interface TestimonialProps {
  name: string;
  role: string;
  imageSrc: string;
  children: React.ReactNode;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, imageSrc, children }) => {
  return (
    <div className="bg-gradient-to-br from-black/50 to-red-900/20 p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
      <div className="flex items-center mb-4">
        <img src={imageSrc} alt={`Portrait of ${name}`} className="w-16 h-16 rounded-full mr-4 border-2 border-red-500" />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
      <blockquote className="text-gray-400">{children}</blockquote>
    </div>
  );
};

export default Testimonial;