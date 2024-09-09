import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import StatPage from './pages/StatPage';
import ActivityPage from './pages/ActivityPage';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistic"
              element={
                <ProtectedRoute>
                  <StatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activity"
              element={
                <ProtectedRoute>
                  <ActivityPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;
