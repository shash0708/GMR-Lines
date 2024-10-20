import React, { useState, useEffect } from 'react';
import './Profile.css'; // Include your CSS for styling
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const Profile = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [userData, setUserData] = useState(null); // State to hold user data
  const navigate = useNavigate();

  // Retrieve the logged-in user's AME from localStorage
  const AME = localStorage.getItem('AME');

  const toggleSection = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  // Fetch user data based on AME when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/logs/getuser/${AME}`, {
          headers: {
            'auth-token': localStorage.getItem('token'), // Pass the token if authentication is required
          },
        });
        setUserData(response.data); // Store the user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (AME) {
      fetchUserData(); // Call the function to fetch user data
    }
  }, [AME]);

  const handleEditClick = () => {
    // Navigate to the edit page
    navigate('/edit');
  };

  return (
    <div>
      <div className='Profile'>
        <IoSettingsOutline className='settings' />
        <h1>Profile</h1>
      </div>
      <div className="babes">
        <div className="profile-container">
          <div className="profile-header">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="profile-image"
            />
            {/* Dynamically display user's name and other information */}
            <h1>{userData ? userData.Name : 'Loading...'}</h1>
            <p>{userData ? userData.Designation + ', ' + userData.Location : 'Loading...'}</p>
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
          </div>

          <div className="profile-options">
            {/* Personal Information Section */}
            <div className="profile-option" onClick={() => toggleSection('personal')}>
              <div className="option-header">
                <span>Personal information</span>
                <span className={`arrow ${activeSection === 'personal' ? 'up' : 'down'}`}></span>
              </div>
            </div>
            {activeSection === 'personal' && (
              <div className="collapse-content">
                <p>Name: {userData ? userData.Name : 'Loading...'}</p>
                <p>AMENO: {userData ? userData.AME : 'Loading...'}</p>
              </div>
            )}

            {/* Contact Info Section */}
            <div className="profile-option" onClick={() => toggleSection('contact')}>
              <div className="option-header">
                <span>Contact info</span>
                <span className={`arrow ${activeSection === 'contact' ? 'up' : 'down'}`}></span>
              </div>
            </div>
            {activeSection === 'contact' && (
              <div className="collapse-content">
                <p>Email: {userData ? userData.Email : 'Loading...'}</p>
                <p>Phone: {userData ? userData.Phone : 'Loading...'}</p>
              </div>
            )}

            {/* Emergency Contacts Section */}
            <div className="profile-option" onClick={() => toggleSection('emergency')}>
              <div className="option-header">
                <span>Emergency contacts</span>
                <span className={`arrow ${activeSection === 'emergency' ? 'up' : 'down'}`}></span>
              </div>
            </div>
            {activeSection === 'emergency' && (
              <div className="collapse-content">
                <p>Contact: John Smith</p>
                <p>Phone: (098) 765-4321</p>
              </div>
            )}

            {/* Legal Section */}
            <div className="profile-option" onClick={() => toggleSection('legal')}>
              <div className="option-header ">
                <span>Legal</span>
                <span className={`arrow ${activeSection === 'legal' ? 'up' : 'down'}`}></span>
              </div>
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
    </div>
  );
};

export default Profile;
