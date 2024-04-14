// IconElement.tsx

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';

type IconElementProps = {
	iconName?: IconDefinition;
	className?: string;
};

/**
 * Renders an icon element using the FontAwesomeIcon component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.iconName - The name of the icon to be rendered.
 * @param {string} props.className - The CSS class name for the icon element.
 * @returns {React.ReactElement | null} The rendered icon element or null if no iconName is provided.
 */
const IconElement: React.FC<IconElementProps> = ({iconName, className}) => {
	return iconName ? (
		<FontAwesomeIcon icon={iconName} className={className} />
	) : null;
};

export default IconElement;
