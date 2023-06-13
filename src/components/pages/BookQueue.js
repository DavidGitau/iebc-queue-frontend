import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClockFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const BookQueue = () => {
  const navigate = useNavigate();
  const [timeField, setTimeField] = useState('');
  const [times, setTimes] = useState([]);
  const [error, setError] = useState('');
  const [successm, setSucess] = useState('');
  const [voterId, setVoterId] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    fetchTimes();
    fetchVoterId();
  }, []);

  const fetchTimes = async () => {
    try {
      const localNetworkAddress = `http://${window.location.hostname}:8000`;
      const response = await axios.get(`${localNetworkAddress}/api/time-slots/`);
      const { data } = response;
      setTimes(data || []);
    } catch (error) {
      setError('Failed to fetch times. Please try again.');
    }
  };

  const fetchVoterId = () => {
    const storedVoterId = localStorage.getItem('voterId');
    if (storedVoterId) {
      setVoterId(storedVoterId);
    }
  };

  const handleBookQueue = async (e) => {
    e.preventDefault();

    if (timeField) {
      try {
        const localNetworkAddress = `http://${window.location.hostname}:8000`;
        const token = localStorage.getItem('token');
        
        const response = await axios.post(
          `${localNetworkAddress}/api/book-queue/`,
          { timeslot: timeField, id: voterId },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );


        if (response.data.success) {
          setSucess(response.data.success);
          setShowSuccessPopup(true); // Show the success popup
        } else {
          setError(response.data.error);
        }

        
        // navigate('/');
      } catch (error) {
        setError('Failed to book the timeslot. Please try again.');
      }
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    navigate('/');
  };

  const PopupMessage = ({ show, message, onClose }) => {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Popup Message</Modal.Title>
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
      <div className="container-login100">
        <div className="wrap-login100 p-t-30 p-b-30">
          {error && (
            <div className="login100-form-title p-b-20 text-center text-dark">
              <h6>{error}</h6>
            </div>
          )}
          <div className="login100-form-title p-b-20 text-center">
            <h3>Book Queue</h3>
          </div>
          <form className="login100-form validate-form" onSubmit={handleBookQueue}>
            <div className="wrap-input100 validate-input m-b-10" data-validate="Time is required">
              <select
                className="input100 custom-select"
                name="timeField"
                value={timeField}
                onChange={(e) => setTimeField(e.target.value)}
              >
                <option value="">Select a time</option>
                {times.length > 0 ? (
                  times.map((time) => {
                    const startTime = time.start.split(':');
                    const startHour = parseInt(startTime[0]);
                    const startMinutes = parseInt(startTime[1]);

                    const startPeriod = startHour >= 12 ? 'pm' : 'am';
                    const formattedStartHour = startHour % 12 || 12;
                    const formattedStartTime = `${formattedStartHour}:${startMinutes.toString().padStart(2, '0')} ${startPeriod}`;

                    const stopTime = time.stop.split(':');
                    const stopHour = parseInt(stopTime[0]);
                    const stopMinutes = parseInt(stopTime[1]);

                    const stopPeriod = stopHour >= 12 ? 'pm' : 'am';
                    const formattedStopHour = stopHour % 12 || 12;
                    const formattedStopTime = `${formattedStopHour}:${stopMinutes.toString().padStart(2, '0')} ${stopPeriod}`;

                    return (
                      <option key={time.id} value={time.id}>
                        {formattedStartTime} - {formattedStopTime}
                      </option>
                    );
                  })
                ) : (
                  <option value="" disabled>
                    No available times
                  </option>
                )}
              </select>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <ClockFill />
              </span>
            </div>
            <div className="container-login100-form-btn p-t-10">
              <button className="login100-form-btn" type="submit">
                Book
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

export default BookQueue;
