import React, { useState } from 'react';
import './Profile.css'; // Include your CSS for styling
import { IoSettingsOutline } from "react-icons/io5";

const Profile = () => {
  const [activeSection, setActiveSection] = useState(null); // To track which section is open

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div>
    <div className='Profile'>
    <IoSettingsOutline  className='settings'/>
   
    <h1>Profile</h1>
</div>
<div></div>
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
        {/* Personal Information Section */}
        <div className="profile-option" onClick={() => toggleSection('personal')}>
          <span>Personal information</span>
          <span className={`arrow ${activeSection === 'personal' ? 'up' : 'down'}`}>&#9662;</span>
        </div>
        {activeSection === 'personal' && (
          <div className="collapse-content">
            <p>Name: Alexa Smith</p>
            <p>Birthday: Jan 1, 1990</p>
          </div>
        )}

        {/* Contact Info Section */}
        <div className="profile-option" onClick={() => toggleSection('contact')}>
          <span>Contact info</span>
          <span className={`arrow ${activeSection === 'contact' ? 'up' : 'down'}`}>&#9662;</span>
        </div>
        {activeSection === 'contact' && (
          <div className="collapse-content">
            <p>Email: alexa@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        )}

        {/* Emergency Contacts Section */}
        <div className="profile-option" onClick={() => toggleSection('emergency')}>
          <span>Emergency contacts</span>
          <span className={`arrow ${activeSection === 'emergency' ? 'up' : 'down'}`}>&#9662;</span>
        </div>
        {activeSection === 'emergency' && (
          <div className="collapse-content">
            <p>Contact: John Smith</p>
            <p>Phone: (098) 765-4321</p>
          </div>
        )}

        {/* Legal Section */}
        <div className="profile-option" onClick={() => toggleSection('legal')}>
          <span>Legal</span>
          <span className={`arrow ${activeSection === 'legal' ? 'up' : 'down'}`}>&#9662;</span>
        </div>
        {activeSection === 'legal' && (
          <div className="collapse-content">
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
