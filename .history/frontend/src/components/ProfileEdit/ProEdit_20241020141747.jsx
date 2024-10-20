import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const ameno = localStorage.getItem('ameno'); // Retrieve AMENO from localStorage

  // Fetch user data based on AMENO
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${ameno}`); // Replace with actual API call
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (ameno) {
      fetchUserData();
    } else {
      console.error('No AMENO found in localStorage.');
    }
  }, [ameno]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/user/${ameno}`, userData); // Update user data based on AMENO
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Edit Profile for AMENO: {ameno}</h1>
      <input
        type="text"
        value={userData.name || ''}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        placeholder="Name"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditProfile;
