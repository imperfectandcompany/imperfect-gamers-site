// App.tsx
import React from 'react';
import StatisticsGroup from '../organism/StatisticsGroup';

import { faUser, faCalendarAlt, faEye, faUsers } from '@fortawesome/free-solid-svg-icons';

const statisticsData = [
    { iconName: faUser, metric: "20%", description: "MEMBERSHIP IN GLOBAL RECORDS" },
    { iconName: faCalendarAlt, metric: "100", description: "NEW MEMBERS IN THE PAST WEEK" },
    { iconName: faEye, metric: "13.5K", description: "VISITORS IN THE LAST MONTH" },
    { iconName: faUsers, metric: "100K", description: "USERS OVER IN THE PAST MONTH" },
  ];
  

  

const StoreStatistics: React.FC = () => (
    <>
        <StatisticsGroup statistics={statisticsData} />
    </>
);

export default StoreStatistics;