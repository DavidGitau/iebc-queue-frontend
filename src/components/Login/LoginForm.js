import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircleFill, LockFill, PeopleFill } from "react-bootstrap-icons";
import ProfilePage from '../pages/UserProfile';

  
import './Login.css'
import img1 from "../../assets/images/login/admin.png"
import img2 from "../../assets/images/login/user.png"
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
        username,
        password,
        group: selectedType // Include the selected user type (user group)
      };
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', loginData);

      // Save authentication details
      const token = response.data.token;
      const userType = selectedType;

      localStorage.setItem('token', token); // Save token
      localStorage.setItem('userType', userType); // Save user type

      // Clear form fields and error message
      setUsername('');
      setPassword('');
      setError('');

      // Set login state to true
      setLoggedIn(true);
      window.location.reload();
    } catch (error) {
      // Handle login error
      setError('Invalid details. Please try again.'); // Set the error message state
      setPassword('');
      setUsername('');
    }
  };

  const [selectedType, setSelectedType] = useState('user');

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  return (
    <>{isLoggedIn ? (
      <ProfilePage />
    ) : (
      <div className="limiter">
        <div className="container-login100" style={{ backgroundImage: "url('images/img-01.jpg')" }}>
          <div className="wrap-login100 p-t-30 p-b-30">
            {error &&
              <div className='login100-form-title p-b-20 text-center text-dark'>
                <h6>{error}</h6>
              </div>} {/* Display the error message if it exists */}
            <div className='login100-form-title p-b-20 text-center'>
              <h3>Account Type</h3>
            </div>
            <form className="login100-form validate-form" onSubmit={handleLogin}>
              <div className="account-type">
                <a
                  className={`type-inner ${selectedType === 'user' ? 'selected' : ''}`}
                  onClick={() => handleTypeClick('user')}
                >
                  <div className="login100-form-avatar">
                    <img src={img2} alt="User Avatar" />
                  </div>
                  <span className="login100-form-title p-t-20 p-b-45">
                    User
                    {selectedType === 'user' && (
                      <CheckCircleFill className="check-icon" color="white" size={20} />
                    )}
                  </span>
                </a>
                <a
                  className={`type-inner ${selectedType === 'admin' ? 'selected' : ''}`}
                  onClick={() => handleTypeClick('admin')}
                >
                  <div className="login100-form-avatar">
                    <img src={img1} alt="Admin Avatar" />
                  </div>
                  <span className="login100-form-title p-t-20 p-b-45">
                    Admin
                    {selectedType === 'admin' && (
                      <CheckCircleFill className="check-icon" color="white" size={20} />
                    )}
                  </span>
                </a>
              </div>
              <div className="wrap-input100 validate-input m-b-10" data-validate="Username is required">
                <input className="input100" type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <PeopleFill />
                </span>
              </div>
              <div className="wrap-input100 validate-input m-b-10" data-validate="Password is required">
                <input className="input100" type="password" name="pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <LockFill />
                </span>
              </div>
              <div className="container-login100-form-btn p-t-10">
                <button className="login100-form-btn" type='submit'>
                  Login
                </button>
              </div>
              <div className="text-center w-full p-t-25 p-b-60">
                <a href="/" className="txt1">
                  Forgot Username / Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </>);
};

export default LoginPage;