import React from 'react';
import { styled } from '@mui/system';

const HomeContainer = styled('div')({
  backgroundColor: '#343541',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative', // Add this
  zIndex: 1 // Add this
});

const Title = styled('h1')({
  color: '#FFFFFF',
  fontSize: '3rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  zIndex: 2, // Add this
  position: 'relative', // Add this
  letterSpacing: '1px' // Add this for better readability
});

function Home() {
  return (
    <HomeContainer>
      <Title>Welcome To AirCrew</Title>
    </HomeContainer>
  );
}

export default Home;