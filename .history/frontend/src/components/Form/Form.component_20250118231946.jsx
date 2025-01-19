import React, { useState, useEffect, useContext } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import URL from '../config.js';
import { ThemeContext } from '../../context/ThemeChange.js';

const LogForm = ({ user }) => {
  const { darkMode } = useContext(ThemeContext);

  const [formState, setFormState] = useState({
    Id: '',
    ATC: {}, // Store selected values for ATC
    dateTime: dayjs(),
    Location: '',
    ACTtype: '',
    ACRegNo: '',
    TOM: '',
    CPU: '',
    Training: '',
    Perform: '',
    Supervise: '',
    CRS_RTS: '',
    ATA: '',
    OP: '',
    DU: '',
    MRR: '',
    Supervisor: '',
    // other form fields...
  });

  const atcOptions = [
    { name: 'FOT', id: 1 },
    { name: 'SGH', id: 2 },
    { name: 'R/I', id: 3 },
    { name: 'MEL', id: 4 },
    { name: 'TS', id: 5 },
    { name: 'MOD', id: 6 },
    { name: 'REP', id: 7 },
    { name: 'INSP', id: 8 },
    { name: 'Training', id: 9 },
    { name: 'Perform', id: 10 },
    { name: 'Supervise', id: 11 },
    { name: 'CRS/RTS', id: 12 },
  ];

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await axios.get(`${URL}/logs/latestId`, {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
          },
        });
        setFormState((prevState) => ({
          ...prevState,
          Id: (response.data.latestId + 1).toString(),
        }));
      } catch (error) {
        console.error('Error fetching latest Id:', error);
      }
    };

    fetchLatestId();
  }, [user]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (selectedList) => {
    const atcValues = selectedList.reduce((acc, item) => {
      acc[item.name] = 'X'; // Set the selected item value to 'X'
      return acc;
    }, {});
    setFormState((prevState) => ({
      ...prevState,
      ATC: { ...atcValues },
    }));
  };

  const handleRemove = (selectedList) => {
    const atcValues = selectedList.reduce((acc, item) => {
      acc[item.name] = 'X';
      return acc;
    }, {});
    setFormState((prevState) => ({
      ...prevState,
      ATC: { ...atcValues },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    axios.post(`${URL}/logs/createLog`, formState, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
    })
      .then(response => {
        toast.success('New Log Created!');
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: darkMode ? '#121212' : 'white',
        color: darkMode ? '#fff' : '#000',
        padding: 3,
        borderRadius: 2,
        boxShadow: 'none',
      }}
    >
      <Typography variant="h4" gutterBottom>
        <FaArrowLeftLong style={{ fontSize: '24px' }} onClick={() => navigate('/past-records')} />
        Add new Log
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Multiselect
              options={atcOptions}
              displayValue="name"
              onSelect={handleSelect}
              onRemove={handleRemove}
              placeholder="Select ATC Options"
              style={{
                searchBox: { backgroundColor: darkMode ? '#121212' : '#fff', color: darkMode ? '#fff' : '#000' },
                optionContainer: { backgroundColor: darkMode ? '#121212' : '#fff' },
                chips: { backgroundColor: 'blue', color: '#fff' },
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ marginTop: 2, width: '100%' }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LogForm;
