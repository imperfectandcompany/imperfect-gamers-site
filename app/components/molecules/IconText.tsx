// IconText.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Text from '../atoms/Text';

interface IconTextProps {
  icon: IconDefinition;
  text: string;
}

/**
 * A component that displays an icon and accompanying text.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string} props.text - The text to display.
 * @returns {JSX.Element} The rendered IconText component.
 */
const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
  return (
    <div>
      <FontAwesomeIcon icon={icon} />
      <Text>{text}</Text>
    </div>
  );
};

export default IconText;
