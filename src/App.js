import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import './App.css'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import UserProfile from './components/pages/UserProfile';
import AdminProfile from './components/pages/AdminProfile';
import StaffProfile from './components/pages/StaffProfile';
import RegisterPage from './components/Login/RegisterForm';
import VoterList from './components/Voter/VoterList';
import LoginPage from './components/Login/LoginForm';
import PollingStationList from './components/Station/StationList';
import Wardlist from './components/Ward/WardList';
import QueueList from './components/Queue/QueueList';
import CenterList from './components/Station/CenterList';
import BookQueue from './components/pages/BookQueue';
import QueueRegistration from './components/Queue/QueueRegistration';
import KimsManagement from './components/Queue/ManageKims';
import KimsKit from './components/Queue/KimsKit';
import QueueDetail from './components/Queue/QueueDetail';
import CenterDetail from './components/Station/CenterDetail';


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
                ) : localStorage.getItem('userType') === 'staff' ? (
                  <StaffProfile />
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
              <Route path="/voters" element={<VoterList />} />
              <Route path="/stations" element={<PollingStationList />} />
              <Route path="/wards" element={<Wardlist />} />
              <Route path="/queues" element={<QueueList />} />
              <Route path="/centers" element={<CenterList />} />
              <Route path="/register-staff" element={<RegisterPage />} />
            </>
          )}
          {isLoggedIn && localStorage.getItem('userType') === 'user' && (
            <>
              <Route path="/book" element={<BookQueue />} /> {/* Add the BookQueue component as a route */}
            </>
          )}
          {isLoggedIn && localStorage.getItem('userType') === 'staff' && (
            <>
              <Route path="/register-queue" element={<QueueRegistration />} /> {/* Add the BookQueue component as a route */}
              <Route path="/manage-kims" element={<KimsManagement />} />
              <Route path="/kims-kit" element={<KimsKit />} />
              <Route path="/queue-detail" element={<QueueDetail />} />
              <Route path="/center-detail" element={<CenterDetail />} />
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
