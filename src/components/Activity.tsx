import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Activity {
    id: string; // UUID
    title: string;
    description: string;
  }
  
  const Activity: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
  
    useEffect(() => {
      const fetchActivityData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await axios.get(`${import.meta.env.VITE_OMS_API_URL}/activities`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response.data);
            const activitiesWithUUID = response.data.activities.map((activity: { title: string, description: string }) => ({
              id: uuidv4(), // Generate UUID for each activity
              title: activity.title,
              description: activity.description
            }));
            setActivities(activitiesWithUUID);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        }
      };
  
      fetchActivityData();
    }, []);
  
    return (
      <div>
        {/* <h1>Activity List</h1> */}
        <ul>
          {activities.map(activity => (
            <li key={activity.id}>
              {activity.title} {activity.description ? "✓" : "✗"}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Activity;
  