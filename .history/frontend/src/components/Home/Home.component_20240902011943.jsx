import React, { useState, useEffect } from 'react';
import Buttons from '../Buttons/Buttons.component';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('Log Book'); // Set the document title for this page

  const [ameNumber, setAmeNumber] = useState(''); // State to store AME number
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Function to fetch AME number from the backend
    const fetchAmeNumber = async () => {
      try {

        const response = await fetch(`${URL}/api/getuser', {
          method: 'GET', // Use GET method for fetching user data
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse JSON response
        // console.log('Success:', data);

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
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : (
        <h3 style={{ display: 'flex', justifyContent: 'center' }}>Hi.{ameNumber}</h3>
      )}
      <Buttons text="New Entry" to="/form" />
      <Buttons text="Past Records" to="/past-records" />
    </div>
  );
}

export default Home;
