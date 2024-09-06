
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const ActivityFrequencyGraph: React.FC = () => {
    // Replace this with your logic to fetch activity data for the current month
    const activityData = [
        { day: '1', count: 5 },
        { day: '2', count: 10 },
        { day: '3', count: 7 },
        // Add more data for other days of the month
    ];

    return (
        <div>
            <h2>Activity Frequency Graph</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={activityData}
                    dataKey="count"
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {activityData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
};

export default ActivityFrequencyGraph;

