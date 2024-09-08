// src/pages/Home/Home.js
import React, { useState, useEffect } from 'react';
import Buttons from '../Buttons/Buttons.component';
import Car; // Import the Card component
import useDocumentTitle from '../hooks/useDocumentTitle';
import URL from '../config';
import './Home.css'; // Ensure you have corresponding CSS file for styling

const Home = () => {
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
        <Card className='card-new-entry'>
          <Buttons text="New Entry" to="/form" className='btn-new-entry' />
        </Card>
        <Card className='card-past-records'>
          <Buttons text="Past Records" to="/past-records" className='btn-past-records' />
        </Card>
      </div>
    </div>
  );
}

export default Home;
