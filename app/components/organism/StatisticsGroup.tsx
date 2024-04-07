// StatisticsGroup.tsx
import React from 'react';
import StatisticItem from '../molecule/StatisticItem';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Statistic {
    iconName?: IconDefinition; // Keep as is
    svgSrc?: string; // Optional source for an SVG icon
    description: string; // Changed from 'text' to 'description'
    metric?: string; // Optional metric
  }

interface StatisticsGroupProps {
  statistics: Statistic[];
  className?: string;
}

const StatisticsGroup: React.FC<StatisticsGroupProps> = ({ statistics, className }) => (
  <div className={`flex flex-wrap justify-between ${className}`}>
    {statistics.map((stat, index) => (
      <StatisticItem key={index} {...stat} className="mr-8 mb-4" />
    ))}
  </div>
);

export default StatisticsGroup;
