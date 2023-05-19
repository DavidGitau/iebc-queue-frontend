import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import UserProfile from './components/pages/UserProfile';
import AdminProfile from './components/pages/AdminProfile';
import LoginPage from './components/Login/LoginForm';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem('token'); // Replace with your token storage approach
      setIsLoggedIn(!!token);
    };

    checkLoggedInStatus();
  }, []);

  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                localStorage.getItem('userType') === 'admin' ? (
                  <AdminProfile />
                ) : (
                  <UserProfile />
                )
              ) : (
                <LoginPage />
              )
            }
          />
          {/* <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
