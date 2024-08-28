import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Utility/Loader/Loader';
import Tooltip from '../Utility/Toottip/Tooltip';

interface Activity {
  id: string; // UUID
  title: string;
  description: string;
  activityDate: Date;
}

interface ActivityProps {
  cardTitle: string;  // Define the prop type for cardTitle
  page: number,
  pageLimit: number,
  timeStatus: string
}

const Activity: React.FC<ActivityProps> = ({ cardTitle, page, pageLimit, timeStatus }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
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
            },
            params: {
              Page: page,
              PageLimit: pageLimit,
              TimeStatus: timeStatus
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
  }, [page, pageLimit, timeStatus]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='home-card'>
      <div className='card-title'>{cardTitle}</div>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            {/* {activity.title} {activity.description ? "✓" : "✗"} */}
            {activity.title}
          </li>
        ))}
      </ul>
            <Tooltip text="This is a tooltip!">
                <button>Hover over me</button>
            </Tooltip>
    </div>
  );
};

export default Activity;
