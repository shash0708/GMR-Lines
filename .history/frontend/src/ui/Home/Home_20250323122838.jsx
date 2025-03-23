import React from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaFileExport } from 'react-icons/fa';
import Button from '../CustomButton/Button';
import Sidebar from '../Sidebar/Sidebar';

const PageContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100vh'
});

const MainContent = styled('div')({
  flex: 1,
  backgroundColor: '#343541',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '15vh'
});

const ButtonGroup = styled('div')({
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem'
});

function Home() {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/bot');
  };

  const handleExport = () => {
    navigate('/pdf');
  };

  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <h1>Welcome To AirCrew</h1>
        <ButtonGroup>
          <Button 
            icon={FaPlus}
            text="Add New Entry"
            onClick={handleAddNew}
          />
          <Button 
            icon={FaFileExport}
            text="Export Data"
            onClick={handleExport}
          />
        </ButtonGroup>
      </MainContent>
    </PageContainer>
  );
}

export default Home;