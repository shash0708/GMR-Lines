import React from 'react';
import { styled } from '@mui/system';

const HomeContainer = styled('div')({
  backgroundColor: '#343541',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

const Title = styled('h1')({
  color: '#FFFFFF',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
});

function Home() {
  return (
    <HomeContainer>
      <Title>Welcome To AirCrew</Title>
    </HomeContainer>
  );
}

export default Home;