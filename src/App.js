import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import UserProfile from './components/pages/UserProfile';
import AdminProfile from './components/pages/AdminProfile';
import LoginPage from './components/Login/LoginForm';
import VoterList from './components/Voter/VoterList';
import PollingStationList from './components/Station/StationList';
import Wardlist from './components/Ward/WardList';

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
          {isLoggedIn && localStorage.getItem('userType') === 'admin' && (
            <>
            <Route path="/voters" element={<VoterList />} />,
            <Route path="/stations" element={<PollingStationList />} />,
            <Route path="/wards" element={<Wardlist />} />,
            // <Route path="/voters" element={<VoterList />} />,
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
