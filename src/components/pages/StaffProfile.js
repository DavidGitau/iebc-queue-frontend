import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const StaffProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const localNetworkAddress = `http://${window.location.hostname}:8000`;
        const token = localStorage.getItem('token'); // Replace with your token storage approach

        if (!token) {
          // Handle case when token is not available
          setError('Authentication token is missing');
          return;
        }

        const headers = {
          Authorization: `Token ${token}`,
        };

        const response = await axios.get(`${localNetworkAddress}/api/profile/`, { headers });
        const centerId = response.data.center.id;
        localStorage.setItem('centerId', centerId);
        setProfile(response.data);
      } catch (error) {
        console.log('Error fetching profile:', error);
        setError('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);
  const handleAllocateTimeslot = async () => {
    try {
      const localNetworkAddress = `http://${window.location.hostname}:8000`;
      const token = localStorage.getItem('token');
      const centerId = localStorage.getItem('centerId');

      const response = await axios.post(
        `${localNetworkAddress}/api/allocate-timeslots/`,
        { cid: centerId },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log('Timeslot allocation response:', response.data);
      // Handle the response accordingly, e.g., show a success message or redirect to a different page

    } catch (error) {
      console.log('Error allocating timeslot:', error);
      // Handle the error accordingly, e.g., show an error message
    }
  };

  const handleDisallocateTimeslot = async () => {
    try {
      const localNetworkAddress = `http://${window.location.hostname}:8000`;
      const token = localStorage.getItem('token');
      const centerId = localStorage.getItem('centerId');

      const response = await axios.post(
        `${localNetworkAddress}/api/disallocate-timeslots/`,
        { cid: centerId },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log('Timeslot disallocation response:', response.data);
      // Handle the response accordingly, e.g., show a success message or redirect to a different page

    } catch (error) {
      console.log('Error disallocating timeslot:', error);
      // Handle the error accordingly, e.g., show an error message
    }
  };

  return (
    <div>
      {profile ? (
        <div className="limiter">
          <div className="container-login100">
            <div className="login100-form-title text-center">
              <h3>Staff Profile</h3>
            </div>
            <div className="wrap-login100 p-t-30 p-b-30">
              {error && (
                <div className="login100-form-title p-b-20 text-center text-dark">
                  <h6>{error}</h6>
                </div>
              )}
              <div className="u-gutter-0 u-layout">
                <div className="u-layout-row">
                  <div className="u-align-left u-container-align-left u-container-style u-layout-cell u-size-27-lg u-size-27-xl u-size-60-md u-size-60-sm u-size-60-xs u-layout-cell-1">
                    <div className="u-container-layout u-valign-middle u-container-layout-1">
                      <h2 className="u-align-center u-text u-text-2 text-white">
                        {profile.profile.first_name} {profile.profile.last_name}
                      </h2>
                      <p className="p1">
                          <span className="p2-container">
                            <span className="p2-label">DOB:</span>
                            <span className="p2-value">{profile.profile.dob}</span>
                          </span>
                          <span className="p2-container">
                            <span className="p2-label">Age:</span>
                            <span className="p2-value">{profile.profile.age}</span>
                          </span>
                          <span className="p2-container">
                            <span className="p2-label">Gender:</span>
                            <span className="p2-value">
                              {profile.profile.gender === 'M' ? 'Male' : 'Female'}
                            </span>
                          </span>
                          <span className="p2-container">
                            <span className="p2-label">ID Number:</span>
                            <span className="p2-value">{profile.profile.id_number}</span>
                          </span>
                          <span className="p2-container">
                            <span className="p2-label">Registered:</span>
                            <span className="p2-value">
                              {profile.profile.registered ? 'Yes' : 'No'}
                            </span>
                          </span>
                          <span className="p2-container">
                            <span className="p2-label">Staff ID:</span>
                            <span className="p2-value">{profile.id || '-'}</span>
                          </span>
                          <span className="p2-container">
                            <span className="p2-label">Center:</span>
                            <span className="p2-value">{profile.center.name}</span>
                          </span>
                        </p>

                        <div className="container-login100-form-btn p-t-10">
                          <Link to="/register-queue" className="smaller-button">
                            <button className="login100-form-btn">Manage Queue</button>
                          </Link>
                          <Link to="/manage-kims" className="smaller-button">
                            <button className="login100-form-btn">Manage KIMs</button>
                          </Link>
                            <button className="login100-form-btn smaller-button" onClick={handleAllocateTimeslot}>Allocate Timeslots</button>
                            <button className="login100-form-btn smaller-button" onClick={handleDisallocateTimeslot}>Disallocate Timeslots</button>
                    
                        </div>

                    </div>
                  </div>
                  <div
                    className="u-container-align-center u-container-style u-image u-layout-cell u-size-33-lg u-size-33-xl u-size-60-md u-size-60-sm u-size-60-xs u-image-1"
                    data-image-width="1316"
                    data-image-height="1080"
                  >
                    <div className="u-container-layout u-container-layout-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default StaffProfile;
