import React, { useState, useEffect, useContext } from 'react';
import './Profile.css'; 
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../config.js';
import { ThemeContext } from '..';
C:\Users\daridram\Desktop\GM\GMR-Lines\frontend\src\context
const Profile = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false); 
  const [imageMenuOpen, setImageMenuOpen] = useState(false); 
  const [profileImage, setProfileImage] = useState(null); 
  const navigate = useNavigate();

  const { darkMode, toggleDarkMode } = useContext(ThemeContext); 

  const AME = localStorage.getItem('ameNumber');

  const toggleSection = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

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

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage); 
    }
  }, []);

  const handleEditClick = () => {
    navigate('/edit');
  };

  const handleSettingsClick = () => {
    setSettingsMenuOpen((prev) => !prev); 
  };

  const handleSignOut = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('ameNumber'); 
    navigate('/'); 
  };

  const handleImageClick = () => {
    setImageMenuOpen((prev) => !prev);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image); 
        localStorage.setItem('profileImage', base64Image); 
      };
      reader.readAsDataURL(file);
    }
    setImageMenuOpen(false); 
  };

  const handleImageDelete = () => {
    setProfileImage(null); 
    localStorage.removeItem('profileImage'); 
    setImageMenuOpen(false); 
  };

  return (
    <div className={`proedit ${darkMode ? 'dark-mode' : ''}`}>
      <div className='Profile'>
        <IoSettingsOutline className={`settings ${settingsMenuOpen}`} onClick={handleSettingsClick} />
        <h1>Profile</h1>
      </div>

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

      <div className="profile-container">
        <div className="profile-header">
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
      </div>
    </div>
  );
};

export default Profile;
