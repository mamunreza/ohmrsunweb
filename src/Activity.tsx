import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Activity {
  id: string; // UUID
  title: string;
  description: string;
}

const Activity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7114/activities');
        console.log(response.data);
        const activitiesWithUUID = response.data.activities.map((activity: { title: string, description: string }) => ({
          id: uuidv4(), // Generate UUID for each activity
          title: activity.title,
          description: activity.description
        }));
        setActivities(activitiesWithUUID);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Activity List</h1>
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
