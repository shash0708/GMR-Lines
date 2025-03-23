import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FaArrowLeft } from "react-icons/fa6";
import './Topbar.css';

const Topbar = ({ dateTime, onDateChange }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="topbar-container">
      <div className="topbar">
        <div className="date-container">
          <FaArrowLeft 
            className="arrow-icon" 
            onClick={handleBackClick}
            style={{ cursor: 'pointer',color: 'white'' }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              value={dateTime}
              onChange={onDateChange}
              ampm={false} // This enables 24-hour format
              format="DD/MM/YYYY HH:mm" 
              renderInput={(props) => (
                <div className="date-picker-wrapper">
                  {props.inputProps.value}
                </div>
              )}
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                  border: 'none',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                }
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default Topbar;