import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ActivityFormData {
  title: string;
  description: string;
  activityDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

const CreateActivityForm: React.FC = () => {
  const [formData, setFormData] = useState<ActivityFormData>({
    title: '',
    description: '',
    activityDate: '',
    status: 'Pending',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert activityDate to UTC before submitting
    const utcActivityDate = new Date(formData.activityDate);
    const formDataWithUTC = {
      ...formData,
      activityDate: utcActivityDate.toISOString(), // Convert to UTC string format
    };

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_OMS_API_URL}/activities`, formDataWithUTC, {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          },
        });

        console.log('Activity created successfully:', response.data);
        navigate('/'); 
      } catch (error) {
        console.error('An error occurred:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.data);
        }
      }
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="activityDate">Activity Date:</label>
        <input
          type="datetime-local"
          id="activityDate"
          value={formData.activityDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit">Create Activity</button>
    </form>
  );
};

export default CreateActivityForm;
