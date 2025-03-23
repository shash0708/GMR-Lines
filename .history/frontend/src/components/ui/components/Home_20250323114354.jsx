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

function Home() {
  return (
    <HomeContainer>
      {/* Your content goes here */}
    </HomeContainer>
  );
}

export default Home;