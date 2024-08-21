import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Utility/Loader/Loader';

interface ActivityDetail {
  id: string; // UUID
  title: string;
  description: string;
}

// interface ActivityDetailProps {
//   cardTitle: string; 
// }

const ActivityDetail: React.FC = () => {
  const [activities, setActivities] = useState<ActivityDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActivityData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_OMS_API_URL}/activities`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          console.log(response.data);
          const activitiesWithUUID = response.data.activities.map((activity:
            {
              id: string,
              title: string,
              description: string
            }) => ({
              id: activity.id,
              title: activity.title,
              description: activity.description
            }));
          setActivities(activitiesWithUUID);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchActivityData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='home-card'>
      <div className='card-title'>Detail</div>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            {/* {activity.title} {activity.description ? "✓" : "✗"} */}
            {activity.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityDetail;
