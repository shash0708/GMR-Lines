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
          onClick={() => history('/form')} // Navigate to "/form" when card is clicked
        >
          <h2>New Entry</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-plus-fill" viewBox="0 0 16 16">
  <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0"/>
</svg>
        </Car>
        <Car
          className='card-past-records'
          onClick={() => history('/past-records')} // Navigate to "/past-records" when card is clicked
        >
          <h2>Past Records</h2>
        </Car>
      </div>
    </div>
  );
}

export default Home;
