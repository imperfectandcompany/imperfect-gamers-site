// StatisticsGroup.tsx
import React from 'react';
import StatisticItem from '../molecules/StatisticItem';
import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';

type Statistic = {
	iconName?: IconDefinition; // Keep as is
	svgSrc?: string; // Optional source for an SVG icon
	description: string; // Changed from 'text' to 'description'
	metric?: string; // Optional metric
};

type StatisticsGroupProps = {
	statistics: Statistic[];
	className?: string;
};

/**
 * Renders a group of statistics.
 *
 * @component
 * @param {StatisticsGroupProps} props - The component props.
 * @param {Statistic[]} props.statistics - The array of statistics to render.
 * @param {string} props.className - The additional CSS class name for the component.
 * @returns {JSX.Element} The rendered StatisticsGroup component.
 */
const StatisticsGroup: React.FC<StatisticsGroupProps> = ({
	statistics,
	className,
}) => (
	<div className={`flex flex-wrap justify-between ${className}`}>
		{statistics.map((stat, index) => (
			<StatisticItem key={index} {...stat} className="mr-8 mb-4" />
		))}
	</div>
);

export default StatisticsGroup;
