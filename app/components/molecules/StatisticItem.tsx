// StatisticItem.tsx
import React from 'react';
import IconElement from '../atoms/IconElement';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface StatisticItemProps {
  iconName?: IconDefinition;
  svgSrc?: string;
  metric?: string;
  description: string;
  className?: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({
  iconName,
  svgSrc,
  metric,
  description,
  className,
}) => (
  <div className={`statistic-item ${className}`}>
    {iconName && <IconElement iconName={iconName} />} { /* Only renders if iconName is provided */ }
    {svgSrc && <img src={svgSrc} alt="icon" className="icon-class" />} { /* // Adjust as needed */ }
    {metric && <p className="text-4xl font-bold">{metric}</p>}
    <p>{description}</p>
  </div>
);



export default StatisticItem;
