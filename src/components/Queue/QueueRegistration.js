import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const QueueRegistration = () => {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  const [successm, setSucess] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
      // console.log('Registration successful!');
      if (response.data.success) {
          setSucess(response.data.success);
          setShowSuccessPopup(true); // Show the success popup
        } else {
          setError(response.data.error);
        }


      // Redirect to home page
      // navigate('/');
    } catch (error) {
      setError(error.response.data.error);
    }
  }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    // navigate('/');
  };

  const PopupMessage = ({ show, message, onClose }) => {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
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
      <PopupMessage
        show={showSuccessPopup}
        message={successm}
        onClose={handleCloseSuccessPopup}
      />
    </div>
  );
};

export default QueueRegistration;
