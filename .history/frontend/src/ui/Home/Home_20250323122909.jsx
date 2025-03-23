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

// Add the missing Title component
const Title = styled('h1')({
  color: '#FFFFFF',
  fontSize: '3rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
});

const ButtonGroup = styled('div')({
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem'
});

// ...rest of your existing code...