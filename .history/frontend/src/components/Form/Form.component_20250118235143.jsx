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
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// dayjs.extend(customParseFormat);
const LogForm = ({ user }) => {
  const { darkMode } = useContext(ThemeContext);

  const [formState, setFormState] = useState({
    Id: '',
    ATC: {},
    dateTime: dayjs(), // Single dateTime field for MobileDateTimePicker
    Location: '',
    ACTtype: '',
    ACRegNo: '',
    TOM: '',
    CPU: '',
    // FOT: '',
    // SGH: '',
    // RI: '',
    // MEL: '',
    // TS: '',
    // MOD: '',
    // REP: '',
    // INSP: '',
    // Training: '',
    // Perform: '',
    // Supervise: '',
    // CRS_RTS: '',
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

  const handleClick = () => {
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
    if (newValue && dayjs.isDayjs(newValue)) {
      setFormState((prevState) => ({
        ...prevState,
        dateTime: newValue, // Ensure the new value is valid
      }));
    } else {
      console.error('Invalid date object:', newValue);
    }
  };

  const handleSelect = (selectedList) => {
    const atcValues = selectedList.reduce((acc, item) => {
      acc[item.name] = 'X'; // Set the selected item value to 'X'
      console.log(acc);
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
        console.log('Data saved:', response.data);
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          backgroundColor: darkMode ? '#121212' : 'white',
          color: darkMode ? '#fff' : '#000',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <FaArrowLeftLong
          style={{ fontSize: '24px' }}
          onClick={handleClick}
        />
        Add new Log
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formState).map((field) => (
            field !== 'dateTime' &&  field !== 'ATC' && ( // Skip the dateTime field for now
              field === 'TOM' || field === 'CPU' ? (
                <Grid item xs={12} key={field}>
                  <FormControl fullWidth>
                    <InputLabel
                      id={`${field}-label`}
                      sx={{
                        backgroundColor: darkMode ? '#121212' : 'white',
                        color: darkMode ? '#fff' : '#000',
                      }}
                    >
                      {field}
                    </InputLabel>
                    <Select
                      labelId={`${field}-label`}
                      id={field}
                      name={field}
                      value={formState[field]}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiSelect-select': {
                          backgroundColor: darkMode ? '#121212' : 'white',
                          color: darkMode ? '#fff' : '#000',
                        },
                      }}
                    >
                      {(field === 'TOM' ? tomOptions : cpuOptions).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    label={field}
                    id={field}
                    name={field}
                    value={formState[field]}
                    onChange={handleChange}
                    disabled={field === 'Id'}
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: darkMode ? '#121212' : 'white',
                        color: darkMode ? '#fff' : '#000',
                      },
                    }}
                  />
                </Grid>
              )
            )
          ))}
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
          sx={{
            marginTop: 2,
            width: '100%',
            backgroundColor: 'blue',
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LogForm;
