// TitleDescription.tsx
import React from 'react';
import Text from '../atoms/Text';

interface TitleDescriptionProps {
  title: string;
  description: string;
}

/**
 * Renders a component with a title and description.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed.
 * @param {string} props.description - The description to be displayed.
 * @returns {JSX.Element} - The rendered component.
 */
const TitleDescription: React.FC<TitleDescriptionProps> = ({ title, description }) => {
  return (
    <div>
      <h2>{title}</h2>
      <Text>{description}</Text>
    </div>
  );
};

export default TitleDescription;
