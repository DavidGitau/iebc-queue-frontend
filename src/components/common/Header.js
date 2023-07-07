import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const userType = localStorage.getItem('userType'); // Get the user type from localStorage

  return (
    <header className="navbar navbar-expand-lg navbar-primary bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <span className="brand-text text-ivory">IEBC</span>
        </Link>
        <button
          className={`navbar-toggler ${isMenuOpen ? 'collapsed' : ''}`}
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={handleMenuToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`}
          id="navbarNav"
          onClick={closeMenu}
        >
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                {/* <li className="nav-item active">
                  <Link to="/" className="nav-link text-ivory">
                    Home
                  </Link>
                </li> */}
                {userType === 'admin' ? (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-ivory"
                      href="#"
                      id="adminMenuDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="adminMenuDropdown">
                      <li>
                        <Link to="/voters" className="dropdown-item text-ivory">
                          Voters
                        </Link>
                      </li>
                      <li>
                        <Link to="/queues" className="dropdown-item text-ivory">
                          Queues
                        </Link>
                      </li>
                      <li>
                        <Link to="/stations" className="dropdown-item text-ivory">
                          Polling Stations
                        </Link>
                      </li>
                      <li>
                        <Link to="/wards" className="dropdown-item text-ivory">
                          Wards
                        </Link>
                      </li>
                      <li>
                        <Link to="/centers" className="dropdown-item text-ivory">
                          Polling Centers
                        </Link>
                      </li>
                      <li>
                        <Link to="/staff-list" className="dropdown-item text-ivory">
                          Staffs
                        </Link>
                      </li>
                      <li>
                        <Link to="/register-staff" className="dropdown-item text-ivory">
                          Add Staff
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : userType === 'staff' ? ( // Display the options for staff user type
                  <>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle text-ivory"
                        href="#"
                        id="staffMenuDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Staff
                      </Link>
                      <ul className="dropdown-menu" aria-labelledby="staffMenuDropdown">
                        <li>
                          <Link to="/manage-kims" className="dropdown-item text-ivory">
                            Manage Kims
                          </Link>
                        </li>
                        <li>
                          <Link to="/register-queue" className="dropdown-item text-ivory">
                            Manage Queue
                          </Link>
                        </li>
                        <li>
                          <Link to="/queue-detail" className="dropdown-item text-ivory">
                            Queue Detail
                          </Link>
                        </li>
                        <li>
                          <Link to="/center-detail" className="dropdown-item text-ivory">
                            Center Detail
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </>
                  ) : (
                      <>
                      <li className="nav-item">
                        <Link to="/book" className="nav-link text-ivory">
                          Book Queue
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/queue" className="nav-link text-ivory">
                          View Queue
                        </Link>
                      </li>
                      </>
                )}
                <li className="nav-item">
                  <Link to="/" className="nav-link text-ivory">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-ivory btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <Link to="/" className="nav-link text-ivory">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-ivory">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-ivory">
                    Register
                  </Link>
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
