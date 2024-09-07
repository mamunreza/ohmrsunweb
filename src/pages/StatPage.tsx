// pages/TodoPage.tsx
import React from 'react';
import '../components/Todo/styles.css'; // Import the styles
import ActivityFrequencyGraph from '../components/Activity/ActivityFrequenceyGraph';

const StatPage: React.FC = () => {
  return (
    <div>
      <ActivityFrequencyGraph />
    </div>
  );
};

export default StatPage;
