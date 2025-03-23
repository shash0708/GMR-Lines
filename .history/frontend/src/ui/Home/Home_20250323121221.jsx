import React from 'react';
import { styled } from '@mui/system';

const HomeContainer = styled('div')({
  backgroundColor: '#343541',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '15vh', // Add padding to move content up
  position: 'relative',
  zIndex: 1
});

const Title = styled('h1')({
  color: '#FFFFFF',
  fontSize: '3rem',
  fontWeight: 700,
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  zIndex: 2,
  position: 'relative',
  letterSpacing: '1px',
  margin: 0 // Remove default margin
});

function Home() {
  return (
    <HomeContainer>
      <Title>Welcome To AirCrew</Title>
    </HomeContainer>
  );
}

export default Home;