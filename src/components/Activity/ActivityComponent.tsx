import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ActivityComponent.css';

interface Activity {
    id: string;
    title: string;
    description: string;
    activityDate?: Date;
}
const token = localStorage.getItem('token');
const ActivityComponent: React.FC = () => {
    const [state, setState] = useState({
        activities: [] as Activity[],
        newActivityTitle: '',
        newActivityDescription: '',
        newActivityDate: '',
        newActivityTime: '',
        selectedActivity: null as Activity | null,
        isDetailModalOpen: false,
        isDeleteModalOpen: false,
    });

    const updateState = (updates: Partial<typeof state>) => {
        setState(prevState => ({ ...prevState, ...updates }));
    };

    // Fetch activities from the API when the component mounts
    useEffect(() => {
        const fetchActivities = async () => {

            if (token) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_OMS_API_URL}/activities`, {
                        headers: {
                            "Content-Type": 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            page: 1,
                            pageLimit: 10,
                        }
                    });

                    updateState({ activities: response.data.activities });
                    //console.log(response.data.activities)
                } catch (error) {
                    console.error('An error occurred:', error);
                    if (axios.isAxiosError(error)) {
                        console.error('Error response:', error.response?.data);
                    }
                }
            }
        };
        fetchActivities();
    }, []);

    const addActivity = async () => {
        if (state.newActivityTitle.trim() === '') return;

        const newActivityToAdd: Partial<Activity> = {
            title: state.newActivityTitle,
            description: state.newActivityDescription || '',
            activityDate: state.newActivityDate && state.newActivityTime
                ? new Date(`${state.newActivityDate}T${state.newActivityTime}`)
                : undefined,
        };

        if (token) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_OMS_API_URL}/activities`, newActivityToAdd, {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                updateState({
                    activities: [...state.activities, response.data],
                    newActivityTitle: '',
                    newActivityDescription: '',
                    newActivityDate: '',
                    newActivityTime: '',
                });
            } catch (error) {
                console.error('An error occurred:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Error response:', error.response?.data);
                }
            }
        }
    };

    const openDetailModal = (activity: Activity) => {
        updateState({
            selectedActivity: activity,
            isDetailModalOpen: true,
        });
    };

    const closeDetailModal = () => {
        updateState({
            selectedActivity: null,
            isDetailModalOpen: false,
        });
    };

    const openDeleteModal = (activity: Activity) => {
        updateState({
            selectedActivity: activity,
            isDeleteModalOpen: true,
        });
    };

    const closeDeleteModal = () => {
        updateState({
            selectedActivity: null,
            isDeleteModalOpen: false,
        });
    };

    const deleteActivity = async () => {
        if (!state.selectedActivity) return;

        try {
            await axios.delete(`${import.meta.env.VITE_OMS_API_URL}/activities/${state.selectedActivity.id}`);

            updateState({
                activities: state.activities.filter(activity => activity.id !== state.selectedActivity!.id),
            });
            closeDeleteModal();
        } catch (error) {
            console.error('Failed to delete activity', error);
        }
    };

    const updateActivity = async () => {
        if (!state.selectedActivity) return;

        try {
            const response = await axios.put(`${import.meta.env.VITE_OMS_API_URL}/activities/${state.selectedActivity.id}`, state.selectedActivity);

            updateState({
                activities: state.activities.map(activity =>
                    activity.id === response.data.id ? response.data : activity
                ),
            });
            closeDetailModal();
        } catch (error) {
            console.error('Failed to update activity', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="form-container">
                <h1>Activity List</h1>
                <div className="form-group">
                    <label htmlFor="activityTitle" className="col-form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="activityTitle"
                        value={state.newActivityTitle}
                        onChange={(e) => updateState({ newActivityTitle: e.target.value })}
                        placeholder="Enter an activity"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="activityDescription" className="col-form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="activityDescription"
                        value={state.newActivityDescription}
                        onChange={(e) => updateState({ newActivityDescription: e.target.value })}
                        placeholder="Enter Description (Optional)"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="activityDate" className="col-form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="activityDate"
                        value={state.newActivityDate}
                        onChange={(e) => updateState({ newActivityDate: e.target.value })}
                        placeholder="Select Date (Optional)"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="activityTime" className="col-form-label">Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="activityTime"
                        value={state.newActivityTime}
                        onChange={(e) => updateState({ newActivityTime: e.target.value })}
                        placeholder="Select Time (Optional)"
                    />
                </div>
                <div className="form-button">
                    <button onClick={addActivity} className="btn btn-primary">Add Activity</button>
                </div>
            </div>

            <div className="card p-4">
                <h2>Existing Activities</h2>
                <ul className="list-group">
                    {state.activities.map((todo) => (
                        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{todo.title}</strong>
                                {todo.description && (
                                    <span className="text-muted d-block">Description: {todo.description}</span>
                                )}
                                {todo.activityDate && (
                                    <span className="text-muted d-block">
                                        Date & Time: {new Date(todo.activityDate).toLocaleDateString()} {new Date(todo.activityDate).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>
                            <div>
                                <button className="btn btn-info btn-sm me-2" onClick={() => openDetailModal(todo)}>Details</button>
                                <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(todo)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {state.isDetailModalOpen && state.selectedActivity && (
                <div className="modal show d-block" onClick={closeDetailModal}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Activity</h5>
                                <button type="button" className="btn-close" onClick={closeDetailModal}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    value={state.selectedActivity.title}
                                    onChange={(e) =>
                                        updateState({
                                            selectedActivity: { ...state.selectedActivity!, title: e.target.value },
                                        })
                                    }
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={updateActivity}>Save</button>
                                <button className="btn btn-secondary" onClick={closeDetailModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {state.isDeleteModalOpen && (
                <div className="modal show d-block" onClick={closeDeleteModal}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Activity</h5>
                                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this activity?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={deleteActivity}>Yes, Delete</button>
                                <button className="btn btn-secondary" onClick={closeDeleteModal}>No, Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityComponent;
