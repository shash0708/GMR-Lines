// src/pages/Home/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation
import Car from './Car' // Import the Card component
import useDocumentTitle from '../hooks/useDocumentTitle';
import URL from '../config';
import './Home.css'; // Ensure you have corresponding CSS file for styling

const Home = () => {
  const history = useNavigate(); // Initialize history for navigation

  useDocumentTitle('Aviation Logbook'); // Set the document title for this page

  const [ameNumber, setAmeNumber] = useState(''); // State to store AME number
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Function to fetch AME number from the backend
    const fetchAmeNumber = async () => {
      try {
        const response = await fetch(`${URL}/api/getuser`, {
          method: 'GET', // Use GET method for fetching user data
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON response
        setAmeNumber(data.AME); // Update state with fetched AME number
      } catch (error) {
        console.error('Error fetching AME number:', error); // Log error if request fails
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    fetchAmeNumber(); // Call the function to fetch AME number when component mounts
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div className='Home'>
      <header className='hero-section'>
        <h1>Good Morning</h1>
        {loading ? (
          <p>Loading...</p> // Show loading message while data is being fetched
        ) : (
          <h3 className='ame-number'>{ameNumber}</h3>
        )}
      </header>
      <div className='content'>
        <Car
          className='card-new-entry'
          onClick={() => history.push('/form')} // Navigate to "/form" when card is clicked
        >
          <h2>New Entry</h2>
        </Car>
        <Car
          className='card-past-records'
          onClick={() => history.push('/past-records')} // Navigate to "/past-records" when card is clicked
        >
          <h2>Past Records</h2>
        </Car>
      </div>
    </div>
  );
}

export default Home;
