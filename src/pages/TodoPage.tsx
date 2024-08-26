// pages/TodoPage.tsx
import React from 'react';
import TodoComponent from '../components/Todo/TodoComponent';
import '../components/Todo/styles.css'; // Import the styles

const TodoPage: React.FC = () => {
  return (
    <div>
      <TodoComponent />
    </div>
  );
};

export default TodoPage;
