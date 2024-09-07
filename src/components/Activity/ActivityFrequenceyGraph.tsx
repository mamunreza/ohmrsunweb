
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { getActivitiesByDate } from '../../services/activityService';
import { DayActivity } from '../../types/DayActivity';

const ActivityFrequencyGraph: React.FC = () => {
    const [state, setState] = useState({
        dayActivities: [] as DayActivity[]
    });
    const updateState = (updates: Partial<typeof state>) => {
        setState(prevState => ({ ...prevState, ...updates }));
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const activities = await getActivitiesByDate(10);
            updateState({ dayActivities: activities });
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Activity Frequency Graph</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={state.dayActivities}
                    dataKey="activityCount"
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {state.dayActivities.map((_, index: number) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
};

export default ActivityFrequencyGraph;

