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

export const updateActivity = async (activity: Partial<Activity>) => {
    const token = getToken();
    if (token) {
        try {
            const response = await axios.patch(`${API_URL}/${activity.id}`, activity, {
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

export const deleteActivity = async (id: string) => {
    const token = getToken();
    if (token) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
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

export const getActivity = async (id: string) => {
    const token = getToken();
    if (token) {
        try {
            const response = await axios.get(`${API_URL}/${id}`, {
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

export const getActivitiesByUser = async (userId: string) => {
    const token = getToken();
    if (token) {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}`, {
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

export const getActivitiesByDate = async (days: number) => {
    const token = getToken();
    if (token) {
        try {
            const response = await axios.get(`${API_URL}/busy-days`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                },
                params: {
                    numberOfDays: days
                }
            });
            return response.data.topDays;
        } catch (error) {
            console.error('An error occurred:', error);
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            }
        }
    }
}


