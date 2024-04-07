// IconElement.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconElementProps {
  iconName?: IconDefinition;
  className?: string;
}

const IconElement: React.FC<IconElementProps> = ({ iconName, className }) => {
  return iconName ? (
    <FontAwesomeIcon icon={iconName} className={className} />
  ) : null;
};


export default IconElement;
