import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import CreateActivityForm from './components/Activity/CreateActivityForm';
// import JWTExpiryHandler from './components/Auth/JWTExpiryHandler';

const App: React.FC = () => {

  // const [token, setToken] = useState<string>(localStorage.getItem('token') ?? '');

  // const handleTokenExpired = () => {
  //   console.log('Session expired')
  //   localStorage.removeItem('token');
  //   setToken('');
  // };

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
              path="/create-activity"
              element={
                <ProtectedRoute>
                  <CreateActivityForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
      {/* <JWTExpiryHandler token={token} onTokenExpired={handleTokenExpired} /> */}
    </>
  );
};

export default App;
