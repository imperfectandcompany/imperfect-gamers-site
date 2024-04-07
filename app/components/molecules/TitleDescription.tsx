// TitleDescription.tsx
import React from 'react';
import Text from '../atoms/Text';

interface TitleDescriptionProps {
  title: string;
  description: string;
}

const TitleDescription: React.FC<TitleDescriptionProps> = ({ title, description }) => {
  return (
    <div>
      <h2>{title}</h2>
      <Text>{description}</Text>
    </div>
  );
};

export default TitleDescription;
