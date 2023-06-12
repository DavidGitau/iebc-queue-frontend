import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const localNetworkAddress = `http://${window.location.hostname}:8000`;
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Authentication token is missing');
          return;
        }

        const headers = {
          Authorization: `Token ${token}`,
        };

        const response = await axios.get(`${localNetworkAddress}/api/profile/`, { headers });
        setProfile(response.data);
      } catch (error) {
        console.log('Error fetching profile:', error);
        setError('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    let formattedTime = `${parseInt(hour) % 12}:${minute}`;

    if (parseInt(hour) >= 12) {
      formattedTime += ' PM';
    } else {
      formattedTime += ' AM';
    }

    return formattedTime;
  };

  return (
    <div>
      {profile ? (
        <div className="limiter">
          <div className="container-login100">
            <div className='login100-form-title text-center'>
              <h3>Voter Profile</h3>
            </div>
            <div className="wrap-login100 p-b-30" >
              {error && (
                <div className="login100-form-title p-b-20 text-center text-dark">
                  <h6>{error}</h6>
                </div>
              )}
              <div className="u-gutter-0 u-layout">
                <div className="u-layout-row">
                  <div className="u-align-left u-container-align-left u-container-style u-layout-cell u-size-27-lg u-size-27-xl u-size-60-md u-size-60-sm u-size-60-xs u-layout-cell-1">
                    <div className="u-container-layout u-valign-middle u-container-layout-1">
                      <h2 className="u-align-center u-text u-text-2 text-white">{profile.profile.first_name} {profile.profile.last_name}</h2>
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
                          <span className="p2-label">Timeslot:</span>
                          <span className="p2-value">
                            {profile.timeslot && profile.timeslot.start && profile.timeslot.stop ? (
                              `${formatTime(profile.timeslot.start)} - ${formatTime(profile.timeslot.stop)}`
                            ) : (
                              'N/A'
                            )}
                          </span>
                        </span>
                        <span className="p2-container">
                          <span className="p2-label">Voter ID:</span>
                          <span className="p2-value">{profile.id}</span>
                        </span>
                        <span className="p2-container">
                          <span className="p2-label">Voted:</span>
                          <span className="p2-value">
                            {profile.voted ? 'Yes' : 'No'}
                          </span>
                        </span>
                      </p>

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

export default UserProfile;
