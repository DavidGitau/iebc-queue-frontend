import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClockFill } from 'react-bootstrap-icons';

const KimsManagement = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const localNetworkAddress = `http://${window.location.hostname}:8000`;
      const token = localStorage.getItem('token');
      const cid = localStorage.getItem('centerId');

      const response = await axios.post(
        `${localNetworkAddress}/api/kims-stations/`,
        { cid: cid }, // Pass the cid along with the id
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      // Handle the successful registration response here, if needed

      // console.log('Registration successful!');
      // console.log(response.data)
      setStations(response.data)

      // Redirect to home page
      // navigate('/');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleStationChange = (e) => {
    setSelectedStation(e.target.value);
  };

  const handleManage = (stationId) => {
    console.log(stationId)
    localStorage.setItem('stationId', stationId);
    navigate(`/kims-kit`);
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
            <h3>Kim Management</h3>
          </div>
          <form className="login100-form validate-form" onSubmit={() => handleManage(selectedStation)}>
            <div className="wrap-input100 validate-input m-b-10" data-validate="Time is required">
              {/* <label>Select a station:</label> */}
              <select
                className="input100 custom-select"
                name="stationField"
                value={selectedStation}
                onChange={handleStationChange}
              >
                <option value="">Select a station</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.id}
                  </option>
                ))}
              </select>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <ClockFill />
              </span>
            </div>
            <div className="container-login100-form-btn p-t-10">
              <button className="login100-form-btn" type="submit">
                Manage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KimsManagement;
