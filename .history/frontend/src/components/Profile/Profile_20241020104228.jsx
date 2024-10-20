import React, { useState } from 'react';
import './Profile.css'; // Include your CSS for styling

const Profile = () => {
  const [activeSection, setActiveSection] = useState(null); // To track which section is open

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
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

      <div className="profile-options">
        <div className="profile-option" onClick={() => toggleSection('personal')}>
          <span>Personal information</span>
          <span>&rarr;</span>
        </div>
        {activeSection === 'personal' && (
          <div className="collapse-content">
            <p>Name: Alexa Smith</p>
            <p>Birthday: Jan 1, 1990</p>
          </div>
        )}

        <div className="profile-option" onClick={() => toggleSection('contact')}>
          <span>Contact info</span>
          <span>&rarr;</span>
        </div>
        {activeSection === 'contact' && (
          <div className="collapse-content">
            <p>Email: alexa@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        )}

        <div className="profile-option" onClick={() => toggleSection('emergency')}>
          <span>Emergency contacts</span>
          <span>&rarr;</span>
        </div>
        {activeSection === 'emergency' && (
          <div className="collapse-content">
            <p>Contact: John Smith</p>
            <p>Phone: (098) 765-4321</p>
          </div>
        )}

        <div className="profile-option" onClick={() => toggleSection('legal')}>
          <span>Legal</span>
          <span>&rarr;</span>
        </div>
        {activeSection === 'legal' && (
          <div className="collapse-content">
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
