import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">OMS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/plan">Plan</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/activity">Activity</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistic">Statistics</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <LogoutButton />
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
