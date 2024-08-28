
import { v4 as uuid } from "uuid";
import React, { useState } from 'react';
import Activity from "./Activity";

const ActivityComponent: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [newActivityTitle, setNewActivityTitle] = useState<string>('');
    const [newActivityDescription, setNewActivityDescription] = useState<string>('');
    const [newActivityDate, setNewActivityDate] = useState<Date>(()=>new Date());
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const addActivity = () => {
        if (newActivityTitle.trim() === '') return;
        const newActivityToAdd: Activity = 
        { 
            id: uuid(), 
            title: newActivityTitle, 
            description: newActivityDescription,
            activityDate: newActivityDate
        };
        setActivities([...activities, newActivityToAdd]);
        setNewActivityTitle('');
        setNewActivityDescription('');
        setNewActivityDate(()=>new Date());
    };

    const openDetailModal = (activity: Activity) => {
        setSelectedActivity(activity);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setSelectedActivity(null);
        setIsDetailModalOpen(false);
    };

    const openDeleteModal = (activity: Activity) => {
        setSelectedActivity(activity);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedActivity(null);
        setIsDeleteModalOpen(false);
    };

    const deleteActivity = () => {
        if (!selectedActivity) return;
        setActivities(activities.filter(activity => activity.id !== selectedActivity.id));
        closeDeleteModal();
    };

    const updateActivity = () => {
        if (!selectedActivity) return;
        setActivities(activities.map(activity => (activity.id === selectedActivity.id ? selectedActivity : activity)));
        closeDetailModal();
    };

    return (
        <div>
            <h1>Activity List</h1>
            <div>
                <input
                    type="text"
                    value={newActivityTitle}
                    onChange={(e) => setNewActivityTitle(e.target.value)}
                    placeholder="Enter an activity"
                />
                <input
                    type="text"
                    value={newActivityDescription}
                    onChange={(e) => setNewActivityDescription(e.target.value)}
                    placeholder="Enter Description"
                />
                <button onClick={addActivity}>Add Activity</button>
            </div>
            <ul>
                {activities.map((todo) => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => openDetailModal(todo)}>Details</button>
                        <button onClick={() => openDeleteModal(todo)}>Delete</button>
                    </li>
                ))}
            </ul>

            {isDetailModalOpen && selectedActivity && (
                <div className="modal" onClick={closeDetailModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Todo</h2>
                        <input
                            type="text"
                            value={selectedActivity.title}
                            onChange={(e) => setSelectedActivity({ ...selectedActivity, title: e.target.value })}
                        />
                        <button onClick={updateActivity}>Save</button>
                        <button onClick={closeDetailModal}>Cancel</button>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="modal" onClick={closeDeleteModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Are you sure you want to delete this Todo?</h2>
                        <button onClick={deleteActivity}>Yes, Delete</button>
                        <button onClick={closeDeleteModal}>No, Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityComponent;
