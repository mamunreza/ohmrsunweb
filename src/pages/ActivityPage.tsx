// pages/TodoPage.tsx
import React from 'react';
import ActivityComponent from '../components/Activity/ActivityComponent';
import ActivityFrequencyGraph from '../components/Activity/ActivityFrequenceyGraph';

const ActivityPage: React.FC = () => {
  return (
    <div>
      <ActivityComponent />
      <ActivityFrequencyGraph />
    </div>
  );
};

export default ActivityPage;
