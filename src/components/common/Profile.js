import React from 'react';
import useFetchData from '../utils/Api';

const Profile = () => {
  const { data: profile, error } = useFetchData('profile');

  return (
    <div>
      {profile ? (
        <div className="limiter">
          <div className="container-login100">
            <div className="login100-form-title text-center">
              <h3>Admin Profile</h3>
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
                        {profile.first_name} {profile.last_name}
                      </h2>
                      <p className="p1">
                        <span className="p2-container">
                        <span className="p2-label">DOB:</span>
                        <span className="p2-value">{profile.dob}</span>
                        </span>
                        <span className="p2-container">
                        <span className="p2-label">Age:</span>
                        <span className="p2-value">{profile.age}</span>
                        </span>
                        <span className="p2-container">
                        <span className="p2-label">Gender:</span>
                        <span className="p2-value">{profile.gender === 'M' ? 'Male' : 'Female'}</span>
                        </span>
                        <span className="p2-container">
                        <span className="p2-label">ID Number:</span>
                        <span className="p2-value">{profile.id_number}</span>
                        </span>
                        <span className="p2-container">
                        <span className="p2-label">Registered?</span>
                        <span className="p2-value">{profile.registered ? 'Yes' : 'No'}</span>
                        </span>
                        <span className="p2-container">
                        <span className="p2-label">Voter ID:</span>
                        <span className="p2-value">{profile.voter_id || '-'}</span>
                        </span>
                        <span className="p2-container">
                        <span className="p2-label">Voted?</span>
                        <span className="p2-value">{profile.voted ? 'Yes' : 'No'}</span>
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

export default Profile;
