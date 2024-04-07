// IconText.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Text from '../atoms/Text';

interface IconTextProps {
  icon: IconDefinition;
  text: string;
}

const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
  return (
    <div>
      <FontAwesomeIcon icon={icon} />
      <Text>{text}</Text>
    </div>
  );
};

export default IconText;
