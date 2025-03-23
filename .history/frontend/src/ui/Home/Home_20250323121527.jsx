import React from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Button from '../CustomButton/Button';

const HomeContainer = styled('div')({
  backgroundColor: '#343541',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '15vh',
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
  margin: 0,
  marginBottom: '2rem' // Add margin bottom for spacing
});

function Home() {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/bot'); // Navigate to bot page when button is clicked
  };

  return (
    <HomeContainer>
      <Title>Welcome To AirCrew</Title>
      <Button 
        icon={FaPlus}
        text="Add New Entry"
        onClick={handleAddNew}
      />
       <Button 
        icon={FaPlus}
        text="Export Data"
        onClick={handleAddNew}
      />
    </HomeContainer>
  );
}

export default Home;