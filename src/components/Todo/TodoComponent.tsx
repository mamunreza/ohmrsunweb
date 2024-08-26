import React, { useState } from 'react';
import { Todo } from './Todo';

const TodoComponent: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState<string>('');
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const addTodo = () => {
        if (newTodoTitle.trim() === '') return;
        const newTodo: Todo = { id: Date.now(), title: newTodoTitle };
        setTodos([...todos, newTodo]);
        setNewTodoTitle('');
    };

    const openDetailModal = (todo: Todo) => {
        setSelectedTodo(todo);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setSelectedTodo(null);
        setIsDetailModalOpen(false);
    };

    const openDeleteModal = (todo: Todo) => {
        setSelectedTodo(todo);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedTodo(null);
        setIsDeleteModalOpen(false);
    };

    const deleteTodo = () => {
        if (!selectedTodo) return;
        setTodos(todos.filter(todo => todo.id !== selectedTodo.id));
        closeDeleteModal();
    };

    const updateTodo = () => {
        if (!selectedTodo) return;
        setTodos(todos.map(todo => (todo.id === selectedTodo.id ? selectedTodo : todo)));
        closeDetailModal();
    };

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="Enter a new Todo"
                />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => openDetailModal(todo)}>Details</button>
                        <button onClick={() => openDeleteModal(todo)}>Delete</button>
                    </li>
                ))}
            </ul>

            {isDetailModalOpen && selectedTodo && (
                <div className="modal" onClick={closeDetailModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Todo</h2>
                        <input
                            type="text"
                            value={selectedTodo.title}
                            onChange={(e) => setSelectedTodo({ ...selectedTodo, title: e.target.value })}
                        />
                        <button onClick={updateTodo}>Save</button>
                        <button onClick={closeDetailModal}>Cancel</button>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="modal" onClick={closeDeleteModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Are you sure you want to delete this Todo?</h2>
                        <button onClick={deleteTodo}>Yes, Delete</button>
                        <button onClick={closeDeleteModal}>No, Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoComponent;
