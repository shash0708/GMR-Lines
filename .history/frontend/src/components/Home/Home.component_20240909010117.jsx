// src/pages/Home/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Car from './';
import useDocumentTitle from '../hooks/useDocumentTitle';
import URL from '../config';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  useDocumentTitle('Aviation Logbook');

  const [ameNumber, setAmeNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmeNumber = async () => {
      try {
        const response = await fetch(`${URL}/api/getuser`, {
          method: 'GET',
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAmeNumber(data.AME);
      } catch (error) {
        console.error('Error fetching AME number:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAmeNumber();
  }, []);

  return (
    <div className='Home'>
      <header className='hero-section'>
        <h1>Good Morning</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <h3 className='ame-number'>{ameNumber}</h3>
        )}
      </header>
      <div className='content'>
        <Card
          className='card-new-entry'
          onClick={() => navigate('/form')}
        >
          <div className='card-content'>
            <h2>New Entry</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="icon" viewBox="0 0 16 16">
              <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0"/>
            </svg>
          </div>
        </Card>
        <Card
          className='card-past-records'
          onClick={() => navigate('/past-records')}
        >
          <div className='card-content'>
            <h2>Browse Records</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="icon" viewBox="0 0 16 16">
              <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313M13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A5 5 0 0 0 13 5.698M14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A5 5 0 0 0 13 8.698m0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525"/>
            </svg>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home;
