import axios from 'axios';
import { getToken } from './authService';
import { Activity } from '../types/Activity';

const API_URL = `${import.meta.env.VITE_OMS_API_URL}/activities`;

export const getActivities = async () => {
    const token = getToken();
    if (token) {
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                },
                params: {
                    page: 1,
                    pageLimit: 100,
                }
            });
            return response.data.activities;
        } catch (error) {
            console.error('An error occurred:', error);
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            }
        }
    }
}

export const createActivity = async (activity: Partial<Activity>) => {
    const token = getToken();
    if (token) {
        try {
            const response = await axios.post(API_URL, activity, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('An error occurred:', error);
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            }
        }
    }
}

export const updateActivity = async (id: string, activity: Activity) => {
    const response = await axios.put(`${API_URL}/${id}`, activity, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
}

export const deleteActivity = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
}
