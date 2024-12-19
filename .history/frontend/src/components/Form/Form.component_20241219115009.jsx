import React, { useState, useEffect,useContext  } from 'react';
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
import URL from '../config.js'

import { toast } from 'react-toastify';
const LogForm = ({ user }) => {  
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const [formState, setFormState] = useState({
    Id: '',
    Location: '',
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

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await axios.get(`${URL}/logs/latestId`, {
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('auth-token')
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', formState);

    axios.post(`${URL}/logs/createLog`, formState, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      }
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
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 2,
        boxShadow: 'none',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: 'Black', textAlign: 'center', display: 'flex', alignItems: 'center',gap: '40px' }}>
      <FaArrowLeftLong style={{ fontSize: '24px' }}       onClick={handleClick} 
      /> {/* Adjust the size here */}
      {/* Add the arrow icon with margin */}
        Add new Log
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formState).map((field) => (
            field === 'TOM' || field === 'CPU' ? (
              <Grid item xs={12} key={field}>
                <FormControl fullWidth>
                  <InputLabel
                    id={`${field}-label`}
                    sx={{ color: 'Black' }}
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
                        color: 'gray',
                        backgroundColor: 'Gray',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue',
                      },
                      '& .MuiSelect-icon': {
                        color: 'white',
                      },
                      '& .MuiFormLabel-root.Mui-focused': {
                        color: 'white',
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'blue',
                      },
                      '& .MuiSelect-select.MuiSelect-select': {
                        backgroundColor: 'white',
                      },
                      '& .MuiMenuItem-root': {
                        backgroundColor: 'white',
                        color: 'black', // Ensure text color is readable
                      },
                      '& .MuiMenuItem-root:hover': {
                        backgroundColor: 'gray',
                      },
                    }}
                  >
                    {(field === 'TOM' ? tomOptions : cpuOptions).map(option => (
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
                  required={field !== 'OP'}
                  multiline={field === 'CPU' || field === 'OP'}
                  rows={field === 'CPU' || field === 'OP' ? 4 : 1}
                  disabled={field === 'Id'}
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'Black',
                    },
                    '& .MuiInputBase-input': {
                      color: 'Black',
                    },
                    '& .MuiFormLabel-root': {
                      color: 'Black',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'blue',
                      },
                      '&:hover fieldset': {
                        borderColor: 'Black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'Black',
                      },
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
            width:'100%',
            backgroundColor: 'blue',
            '&:hover': {
              backgroundColor: '#4B0082',
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
