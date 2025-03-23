import React, { useState, useEffect,useContext } from 'react';
import './Profile.css'; // Include your CSS for styling
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../config.js';
import { ThemeContext } from '../../context/ThemeChange.js';
import { FaArrowLeft } from "react-icons/fa6";

const Profile = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false); 
  const [imageMenuOpen, setImageMenuOpen] = useState(false); // State for the image menu
  const [profileImage, setProfileImage] = useState(null); // State to hold profile image
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); 

  // Retrieve the logged-in user's AME from localStorage
  const AME = localStorage.getItem('ameNumber');

  const toggleSection = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  // Fetch user data based on AME when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (AME) {
        try {
          const response = await axios.get(`${URL}/api/getuser/${AME}`, {
            headers: {
              'auth-token': localStorage.getItem('auth-token'), 
            },
          });
          setUserData(response.data); 
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    fetchUserData(); 
  }, [AME]);

  // On initial load, retrieve the stored image from localStorage
  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage); // Load the image from localStorage if it exists
    }
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };
  
  const handleEditClick = () => {
    navigate('/edit');
  };

  const handleSettingsClick = () => {
    setSettingsMenuOpen(prev => !prev); 
  };

  const handleSignOut = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('ameNumber'); 
    navigate('/'); 
  };

  // const toggleDarkMode = () => {
  //   console.log('Toggle Dark Mode');
  // };

  // Image click handler to toggle the menu for upload/update/delete
  const handleImageClick = () => {
    setImageMenuOpen(prev => !prev);
  };

  // Upload image function (You can expand this with actual upload logic)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image); // Update the profile image state
        localStorage.setItem('profileImage', base64Image); // Store it in localStorage to persist across reloads
      };
      reader.readAsDataURL(file);
    }
    setImageMenuOpen(false); // Close the menu after upload
  };

  // Delete the profile image
  const handleImageDelete = () => {
    setProfileImage(null); // Remove the image from state
    localStorage.removeItem('profileImage'); // Remove it from localStorage
    setImageMenuOpen(false); // Close the menu after delete
  };

  return (
    <div className={`proedit ${darkMode ? 'dark-mode' : ''}`}>
      <div className='Profile'>
        <IoSettingsOutline className={`settings ${settingsMenuOpen}`} onClick={handleSettingsClick} />
        <h1>Profile</h1>
      </div>

      {/* Settings Menu */}
      {settingsMenuOpen && (
        <div className="settings-menu">
          <button onClick={toggleDarkMode} className="settings-button">
          {darkMode ? 'Light Mode' : 'Dark Mode'}

          </button>
          {userData ? (
            <button onClick={handleSignOut} className="settings-button">Sign Out</button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="settings-button">Sign In</button>
              <button onClick={() => navigate('/signup')} className="settings-button">Sign Up</button>
            </>
          )}
        </div>
      )}

      <div className='babes'>
        <div   className={`profile-container ${darkMode ? 'dark-mode' : ''}`}>
          <div className="profile-header">
            {/* Profile Image */}
            {localStorage.getItem('auth-token') && (
  <img
    src={profileImage || "https://via.placeholder.com/100"}
    alt="Profile"
    className="profile-image"
    onClick={handleImageClick}
  />
)}

            <h1>{userData ? userData.Name : 'Loading...'}</h1>
            <p>{userData ? `${userData.Designation}, ${userData.Location}` : 'Loading...'}</p>
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
          </div>

          {/* Image Menu (Upload, Update, Delete) */}
          {imageMenuOpen && (
            <div className="image-menu">
              <label className="image-menu-button">
                Upload
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
              <label className="image-menu-button">
                Update
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
              <button className="image-menu-button" onClick={handleImageDelete}>Delete</button>
            </div>
          )}

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
              <div className="option-header">
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
