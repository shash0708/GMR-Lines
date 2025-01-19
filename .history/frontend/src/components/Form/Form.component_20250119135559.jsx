import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import dayjs from 'dayjs';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import URL from '../config.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { ThemeContext } from '../../context/ThemeChange.js';
import { toast } from 'react-toastify';

const LogForm = ({ user }) => {
  const { darkMode } = useContext(ThemeContext);

  const [formState, setFormState] = useState({
    Id: '',
    ATC: {},
    dateTime: dayjs(),
    Location: '',
    ACTtype: '',
    ACRegNo: '',
    TOM: '',
    CPU: '',
    ATA: '',
    OP: '',
    DU: '',
    MRR: '',
    Supervisor: '',
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

  const tomOptions = ['A1(Line)', 'A2(Line)', 'A3(Line)'];
  const cpuOptions = ['B1', 'B2', 'B3'];

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await axios.get(`${URL}/logs/latestId`, {
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('auth-token'),
          },
        });
        const latestId = response.data.latestId;
        setFormState((prevState) => ({
          ...prevState,
          Id: (latestId + 1).toString(),
        }));
      } catch (error) {
        console.error('Error fetching latest Id:', error);
      }
    };

    fetchLatestId();
  }, [user]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/past-records');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      dateTime: newValue || prevState.dateTime,
    }));
  };

  const handleSelect = (selectedList) => {
    const atcValues = atcOptions.reduce((acc, option) => {
      acc[option.name] = selectedList.some((item) => item.id === option.id) ? 'X' : '';
      return acc;
    }, {});
    console.log()
    setFormState((prevState) => ({
      ...prevState,
      ATC: atcValues,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = Object.values(formState).every(
      (value) => value !== '' || value === formState.ATC
    );

    if (!isFormValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    axios.post(`${URL}/logs/createLog`, formState, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
    })
      .then((response) => {
        toast.success('New Log Created!');
        console.log('Data saved:', response.data);
        navigate('/past-records');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Failed to save the log. Please try again.');
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: darkMode ? '#fff' : '#000',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <FaArrowLeftLong
          style={{ fontSize: '24px', cursor: 'pointer' }}
          onClick={handleBackClick}
        />
        Add New Log
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formState).map((field) => (
            field !== 'dateTime' && field !== 'ATC' && (
              <Grid item xs={12} key={field}>
                {field === 'TOM' || field === 'CPU' ? (
                  <FormControl fullWidth>
                    <InputLabel>{field}</InputLabel>
                    <Select
                      name={field}
                      value={formState[field]}
                      onChange={handleChange}
                      required
                    >
                      {(field === 'TOM' ? tomOptions : cpuOptions).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    label={field}
                    name={field}
                    value={formState[field]}
                    onChange={handleChange}
                    disabled={field === 'Id'}
                    required
                  />
                )}
              </Grid>
            )
          ))}
          <Grid item xs={12}>
            <Multiselect
              options={atcOptions}
              displayValue="name"
              selectedValues={Object.keys(formState.ATC)
                .filter((key) => formState.ATC[key] === 'X')
                .map((name) => atcOptions.find((opt) => opt.name === name))}
              onSelect={handleSelect}
              onRemove={handleSelect}
              placeholder="Select ATC Options"
              style={{
                searchBox: {
                  backgroundColor: darkMode ? '#121212' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                },
                optionContainer: {
                  backgroundColor: darkMode ? '#121212' : '#fff',
                },
                chips: {
                  backgroundColor: 'blue',
                  color: '#fff',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                label="Select Date & Time"
                value={formState.dateTime}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, width: '100%' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LogForm;
