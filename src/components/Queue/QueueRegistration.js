import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QueueRegistration = () => {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');

 const handleRegisterQueue = async (e) => {
  e.preventDefault();

  if (idNumber) {
    try {
      const localNetworkAddress = `http://${window.location.hostname}:8000`;
      const token = localStorage.getItem('token');
      const cid = localStorage.getItem('centerId');

      const response = await axios.post(
        `${localNetworkAddress}/api/register-queue/`,
        { id: idNumber, cid: cid }, // Pass the cid along with the id
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Registration successful!');

      // Redirect to home page
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
    }
  }
};
  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: "url('images/img-01.jpg')" }}>
        <div className="wrap-login100 p-t-30 p-b-30">
          {error && (
            <div className="login100-form-title p-b-20 text-center text-dark">
              <h6>{error}</h6>
            </div>
          )}
          <div className="login100-form-title p-b-20 text-center">
            <h3>Queue Registration</h3>
          </div>
          <form className="login100-form validate-form" onSubmit={handleRegisterQueue}>
            <div className="wrap-input100 validate-input m-b-10" data-validate="ID number is required">
              <input
                className="input100"
                type="text"
                name="idNumber"
                placeholder="Enter ID number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>
            <div className="container-login100-form-btn p-t-10">
              <button className="login100-form-btn" type="submit">
                Get Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QueueRegistration;
