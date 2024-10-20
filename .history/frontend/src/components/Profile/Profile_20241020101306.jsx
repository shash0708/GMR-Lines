import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <>
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/100" 
          alt="Profile"
          className="profile-image"
        />
        <h1>Alexa Smith</h1>
        <p>Customer Support, San Francisco</p>
        <button className="edit-button">Edit</button>
      </div>
      {/* <div className="profile-options">
        <div className="profile-option">
          <span>Personal information</span>
          <span>&rarr;</span>
        </div>
        <div className="profile-option">
          <span>Contact info</span>
          <span>&rarr;</span>
        </div>
        <div className="profile-option">
          <span>Emergency contacts</span>
          <span>&rarr;</span>
        </div>
        <div className="profile-option">
          <span>Legal</span>
          <span>&rarr;</span>
        </div>
      </div> */}
    </div>
    </>
  );
};

export default Profile;
