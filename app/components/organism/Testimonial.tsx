import React from 'react';

type TestimonialProps = {
  name: string;
  date: string;
  imageSrc: string;
  children: React.ReactNode;
};

/**
 * Testimonial component displays a testimonial with a name, date, image, and content.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the person giving the testimonial.
 * @param {string} props.date - The date when the testimonial was given.
 * @param {string} props.imageSrc - The source URL of the image representing the person giving the testimonial.
 * @param {ReactNode} props.children - The content of the testimonial.
 * @returns {ReactElement} The rendered Testimonial component.
 */
const Testimonial: React.FC<TestimonialProps> = ({ name, date, imageSrc, children }) => {
  return (
    <div className="rounded-lg bg-gradient-to-br from-black/50 to-red-900/20 p-6 shadow-xl transition duration-500 hover:scale-105">
      <div className="mb-4 flex items-center">
        <img
          src={imageSrc}
          alt={`Portrait of ${name}`}
          className="mr-4 size-16 rounded-full border-2 border-red-500"
        />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>
      <blockquote className="text-gray-400">{children}</blockquote>
    </div>
  );
};

export default Testimonial;
