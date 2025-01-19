import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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
import { ThemeContext } from '../../context/ThemeChange.js';
import { toast } from 'react-toastify';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const LogForm = ({ user }) => {  
  const { darkMode } = useContext(ThemeContext);

  const [formState, setFormState] = useState({
    Id: '',
    Location: '',
    DateTime: new Date(), // New DateTime field
    ACTtype: '',
    ACRegNo: '',
    TOM: '',
    CPU: '',
    FOT: '',
    SGH: '',
    RI: '',
    MEL: '',
    TS: '',
    MOD: '',
    REP: '',
    INSP: '',
    Training: '',
    Perform: '',
    Supervise: '',
    CRS_RTS: '',
    ATA: '',
    OP: '',
    DU: '',
    MRR: '',
    Supervisor: '',
  });

  const tomOptions = ['A1(Line)', 'A2(Line)', 'A3(Line)'];
  const cpuOptions = ['B1', 'B2', 'B3'];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await axios.get(`${URL}/logs/latestId`, {
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('auth-token'),
          }
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

  const handleDateTimeChange = (newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      DateTime: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formState,
      DateTime: formState.DateTime.toISOString(), // Format date and time
    };

    axios.post(`${URL}/logs/createLog`, formattedData, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      }
    })
      .then((response) => {
        toast.success('New Log Created!');
        console.log('Data saved:', response.data);
      })
      .catch((error) => {
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
      <Typography variant="h4" gutterBottom sx={{
        backgroundColor: darkMode ? '#121212' : 'white',
        color: darkMode ? '#fff' : '#000',
        textAlign: 'center', display: 'flex', alignItems: 'center', gap: '40px'
      }}>
        <FaArrowLeftLong style={{ fontSize: '24px' }} onClick={handleClick} />
        Add New Log
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item xs={12}>
              <DateTimePicker
                label="Date and Time"
                value={formState.DateTime}
                onChange={handleDateTimeChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: darkMode ? '#121212' : 'white',
                        color: darkMode ? '#fff' : '#000',
                      },
                      '& .MuiInputBase-input': {
                        backgroundColor: darkMode ? '#121212' : 'white',
                        color: darkMode ? '#fff' : '#000',
                      },
                      '& .MuiFormLabel-root': {
                        backgroundColor: darkMode ? '#121212' : 'white',
                        color: darkMode ? '#fff' : '#000',
                      },
                    }}
                  />
                )}
              />
            </Grid>
          </LocalizationProvider>
          {Object.keys(formState).map((field) => (
            field === 'TOM' || field === 'CPU' ? (
              <Grid item xs={12} key={field}>
                <FormControl fullWidth>
                  <InputLabel id={`${field}-label`} sx={{
                    backgroundColor: darkMode ? '#121212' : 'white',
                    color: darkMode ? '#fff' : '#000',
                  }}>
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
                    {(field === 'TOM' ? tomOptions : cpuOptions).map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : field !== 'DateTime' && (
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
          ))}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            marginTop: 2,
            width: '100%',
            backgroundColor: 'blue',
            '&:hover': {
              backgroundColor: 'darkblue',
            }
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LogForm;
