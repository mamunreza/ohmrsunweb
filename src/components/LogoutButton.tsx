import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('isLoggedIn');
    logout();
    navigate('/login');
  };

  return <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
};

export default LogoutButton;
