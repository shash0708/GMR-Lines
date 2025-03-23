import React from 'react';
import { styled } from '@mui/system';
import { FaPlus } from 'react-icons/fa'; // You can change the icon as needed

const StyledButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '12px 24px',
  backgroundColor: '#343541',
  color: '#FFFFFF',
  border: 'none',
  borderColor: 'orange',
  borderRadius: '50px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#2a2b35',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  },
  '& button': {
    border: '2px solid #FF8C00', // Orange border
    '&:hover': {
      borderColor: '#FFA500', // Lighter orange on hover
      backgroundColor: 'rgba(255, 140, 0, 0.1)' // Slight orange tint on hover
    }
  }
  
});

const Button = ({ icon: Icon, text, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {Icon && <Icon size={20} />}
      {text}
    </StyledButton>
  );
};

export default Button;