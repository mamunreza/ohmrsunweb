import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ActivityComponent.css';
import { Activity } from '../../types/Activity';
import { getActivities, createActivity, updateActivity, deleteActivity } from '../../services/activityService';

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
            const activities = await getActivities();
            updateState({ activities: activities });
        };
        fetchActivities();
    }, []);

    const addActivity = async () => {
        if (state.newActivityTitle.trim() === '') return;

        const newActivityToAdd: Partial<Activity> = {
            title: state.newActivityTitle,
            description: state.newActivityDescription || '',
            activityDate: state.newActivityDate && state.newActivityTime
                ? new Date(`${state.newActivityDate}T${state.newActivityTime}`).toISOString()
                : undefined,
        };

        const addedActivity = await createActivity(newActivityToAdd);
        updateState({
            activities: [...state.activities, addedActivity],
            newActivityTitle: '',
            newActivityDescription: '',
            newActivityDate: '',
            newActivityTime: '',
        });
    };

    const openDetailModal = (activity: Activity) => {
        if (activity.activityDate) {
            const localDate = new Date(activity.activityDate);
            const date = localDate.toISOString().split('T')[0]; // Extract date part
            const time = localDate.toTimeString().split(' ')[0].substring(0, 5); // Extract time part
            updateState({
                selectedActivity: activity,
                newActivityDate: date,  // Set date in local format
                newActivityTime: time,  // Set time in local format
                isDetailModalOpen: true,
            });
        } else {
            updateState({
                selectedActivity: activity,
                newActivityDate: '',
                newActivityTime: '',
                isDetailModalOpen: true,
            });
        }
    };

    const handleActivityDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        const existingTime = state.newActivityTime || '00:00';

        const localDateTime = new Date(`${newDate}T${existingTime}`);
        const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();

        updateState({
            newActivityDate: newDate,
            selectedActivity: {
                ...state.selectedActivity!,
                activityDate: utcDateTime,
            },
        });
    };

    const handleActivityTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        const existingDate = state.newActivityDate || new Date().toISOString().split('T')[0];

        const localDateTime = new Date(`${existingDate}T${newTime}`);
        const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();

        updateState({
            newActivityTime: newTime,
            selectedActivity: {
                ...state.selectedActivity!,
                activityDate: utcDateTime,
            },
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

    const removeActivity = async () => {
        if (!state.selectedActivity) return;

        const response = await deleteActivity(state.selectedActivity.id!);
        console.log(response);
        updateState({
            activities: state.activities.filter(activity => activity.id !== state.selectedActivity!.id)
        });
        closeDeleteModal();
    };

    const modifyActivity = async () => {
        if (!state.selectedActivity) return;

        const updatedActivityDate = state.newActivityDate && state.newActivityTime
            ? new Date(`${state.newActivityDate}T${state.newActivityTime}:00`).toISOString()
            : undefined;

        const activityToModify = {
            ...state.selectedActivity,
            activityDate: updatedActivityDate,  // Ensure the date is in UTC
        };
        
        const response = await updateActivity(activityToModify);
        updateState({
            activities: state.activities.map(activity =>
                activity.id === response.id ? response : activity
            ),
        });
        closeDetailModal();
    };

    return (
        <div className="container mt-4">
            <div className="form-container">
                <h1>Activity</h1>
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
                                <div className="form-group">
                                    <label htmlFor="activityTitle">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={state.selectedActivity.title}
                                        onChange={(e) =>
                                            updateState({
                                                selectedActivity: { ...state.selectedActivity!, title: e.target.value },
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="activityDate">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={state.newActivityDate}  // Bind the date input to the state
                                        onChange={handleActivityDateChange}  // Handle date change
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="activityTime">Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={state.newActivityTime}  // Bind the time input to the state
                                        onChange={handleActivityTimeChange}  // Handle time change
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={modifyActivity}>Save</button>
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
                                <button className="btn btn-danger" onClick={removeActivity}>Yes, Delete</button>
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
