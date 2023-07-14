import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css'

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import AdminProfile from './components/Login/AdminProfile';
import LoginPage from './components/Login/LoginForm';
import RegisterPage from './components/Login/RegisterForm';
import StaffProfile from './components/Login/StaffProfile';
import UserProfile from './components/Login/UserProfile';

import CenterList from './components/Admin/CenterList';
import PollingStationList from './components/Admin/StationList';
import QueueList from './components/Admin/QueueList';
import StaffList from './components/Admin/StaffList';
import VoterList from './components/Admin/VoterList';
import Wardlist from './components/Admin/WardList';

import CenterDetail from './components/Staff/CenterDetail';
import KimsManagement from './components/Staff/ManageKims';
import KimsKit from './components/Staff/KimsKit';
import QueueDetail from './components/Staff/QueueDetail';
import QueueRegistration from './components/Staff/QueueRegistration';

import BookQueue from './components/Voter/BookQueue';
import Queue from './components/Voter/Queue';


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
              <Route path='/staff-list' element={<StaffList />} />
              <Route path="/register-staff" element={<RegisterPage />} />
            </>
          )}
          {isLoggedIn && localStorage.getItem('userType') === 'user' && (
            <>
              <Route path="/book" element={<BookQueue />} /> {/* Add the BookQueue component as a route */}
              <Route path="/queue" element={<Queue />} /> {/* Add the BookQueue component as a route */}
            </>
          )}
          {isLoggedIn && localStorage.getItem('userType') === 'staff' && (
            <>
              <Route path="/register-queue" element={<QueueRegistration />} /> {/* Add the BookQueue component as a route */}
              <Route path="/manage-kiems" element={<KimsManagement />} />
              <Route path="/kiems-kit" element={<KimsKit />} />
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
