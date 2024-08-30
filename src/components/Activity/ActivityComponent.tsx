import { v4 as uuid } from "uuid";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ActivityComponent.css';
// import Activity from "./Activity";

interface Activity {
    id: string; // UUID
    title: string;
    description: string;
    activityDate?: Date;
}

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

    const addActivity = () => {
        if (state.newActivityTitle.trim() === '') return;

        const newActivityToAdd: Activity = {
            id: uuid(),
            title: state.newActivityTitle,
            description: state.newActivityDescription || '', // Optional description
            activityDate: state.newActivityDate && state.newActivityTime
                ? new Date(`${state.newActivityDate}T${state.newActivityTime}`)
                : undefined, // Optional date/time
        };

        updateState({
            activities: [...state.activities, newActivityToAdd],
            newActivityTitle: '',
            newActivityDescription: '',
            newActivityDate: '',
            newActivityTime: '',
        });
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

    const deleteActivity = () => {
        if (!state.selectedActivity) return;
        updateState({
            activities: state.activities.filter(activity => activity.id !== state.selectedActivity!.id),
        });
        closeDeleteModal();
    };

    const updateActivity = () => {
        if (!state.selectedActivity) return;
        updateState({
            activities: state.activities.map(activity =>
                activity.id === state.selectedActivity!.id ? state.selectedActivity! : activity
            ),
        });
        closeDetailModal();
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
                                        Date & Time: {todo.activityDate.toLocaleDateString()} {todo.activityDate.toLocaleTimeString()}
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
