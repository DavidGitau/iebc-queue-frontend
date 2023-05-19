import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  // const date = new Date(profile.dob);
  // const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // const formattedDate = date.toLocaleDateString(undefined, options);

  useEffect(() => {
    // Function to fetch the profile data
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace with your token storage approach
        console.log('Token:', token);
        if (!token) {
          // Handle case when token is not available
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        console.log('Request Headers:', response.headers);
        setProfile(response.data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div className="limiter">
          <div className="container-login100">
            <div className='login100-form-title text-center'>
              <h3>Admin Profile</h3>
            </div>
            <div className="wrap-login100 p-t-30 p-b-30" >
              {error && (
                <div className="login100-form-title p-b-20 text-center text-dark">
                  <h6>{error}</h6>
                </div>
              )}
              <div className="u-gutter-0 u-layout">
                <div className="u-layout-row">
                  <div className="u-align-left u-container-align-left u-container-style u-layout-cell u-size-27-lg u-size-27-xl u-size-60-md u-size-60-sm u-size-60-xs u-layout-cell-1">
                    <div className="u-container-layout u-valign-middle u-container-layout-1">
                      <h2 className="u-align-center u-text u-text-2 text-white">{profile.first_name} {profile.last_name}</h2>
                      <p className="p1" >
                        Date of Birth:&nbsp;&nbsp;<span className='p2'>&nbsp; {profile.dob} </span>
                        <br />
                        Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='p2'>&nbsp; {profile.age} </span>
                        <br/>
                        Gender: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='p2'>&nbsp; { profile.gender == 'M' ? <span>Male</span> : <span>FeMale</span> } </span>
                        <br/>
                        ID Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <span className='p2'>&nbsp; {profile.id_number} </span>
                        <br/>
                        Registered? <span className='p2'>&nbsp; {} </span>
                        <br/>
                        Voter ID: <span className='p2'>&nbsp; {} </span>
                        <br/>
                        Voted? <span className='p2'>&nbsp; {} </span>
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

export default AdminProfile;
