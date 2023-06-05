import React, { useState } from 'react';
import axios from 'axios';
import { PeopleFill } from 'react-bootstrap-icons';

const RegisterForm = () => {
  const [idNumber, setIdNumber] = useState('');
  const [dob, setDob] = useState('');
  const [centerId, setCenterId] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const registrationData = {
    id_number: idNumber,
    dob: dob,
    center_id: centerId,
    };


      try {
        console.log(registrationData)
    const localNetworkAddress = `http://${window.location.hostname}:8000`;
    const token = localStorage.getItem('token'); // Get the token from local storage
    await axios.post(`${localNetworkAddress}/api/register-staff/`, registrationData, {
      headers: {
        Authorization: `Token ${token}`, // Include the token in the Authorization header
      },
    });
      // Handle registration success
      // Set registered state to true or perform other actions

      setIsRegistered(true);
    } catch (error) {
      // Handle registration error
      // Set error message state or perform other actions

      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      {isRegistered ? (
        <div>
          <h3>Registration Successful!</h3>
          {/* Display success message or redirect to login page */}
        </div>
      ) : (
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: "url('images/img-01.jpg')" }}>
            <div className="wrap-login100 p-t-30 p-b-30">
              {error && (
                <div className="login100-form-title p-b-20 text-center text-dark">
                  <h6>{error}</h6>
                </div>
              )}
              <div className="login100-form-title p-b-20 text-center">
                <h3>Staff Registration</h3>
              </div>
              <form className="login100-form validate-form" onSubmit={handleRegister}>
                <div className="wrap-input100 validate-input m-b-10" data-validate="ID Number is required">
                  <input
                    className="input100"
                    type="text"
                    name="idNumber"
                    placeholder="ID Number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <PeopleFill />
                  </span>
                </div>
                <div className="wrap-input100 validate-input m-b-10" data-validate="Date of Birth is required">
                  <input
                    className="input100"
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <PeopleFill />
                  </span>
                </div>
                <div className="wrap-input100 validate-input m-b-10" data-validate="Center ID is required">
                  <input
                    className="input100"
                    type="text"
                    name="centerId"
                    placeholder="Center ID"
                    value={centerId}
                    onChange={(e) => setCenterId(e.target.value)}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <PeopleFill />
                  </span>
                </div>
                <div className="container-login100-form-btn p-t-10">
                  <button className="login100-form-btn" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
