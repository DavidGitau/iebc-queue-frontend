import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Common.css';

const Header = ({ isLoggedIn, onLogout }) => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Token not available, handle the case
        // ...
        return;
      }

      // Send logout request to the server
      await axios.post('http://127.0.0.1:8000/api/logout/', null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      // Remove token from local storage
      localStorage.removeItem('token');
    } catch (error) {
      console.log('Error logging out:', error);
    }

    // Call the logout callback passed from the parent component
    onLogout();
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <span className="brand-text text-ivory">IEBC</span>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item active">
                  <Link to="/" className="nav-link text-ivory">Home</Link>
                </li>
                {localStorage.getItem('userType') === 'admin' ? (
                  // Show Queues, Polling Stations and Profile for admin
                  <>
                    <li className="nav-item">
                      <Link to="/queues" className="nav-link text-ivory">Queues</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/polling-stations" className="nav-link text-ivory">Polling Stations</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link text-ivory">Profile</Link>
                    </li>
                  </>
                ) : (
                  // Show Book Queue and Profile for user
                  <>
                    <li className="nav-item">
                      <Link to="/book" className="nav-link text-ivory">Book Queue</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/profile" className="nav-link text-ivory">Profile</Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button className="nav-link text-ivory btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <Link to="/" className="nav-link text-ivory">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-ivory">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
