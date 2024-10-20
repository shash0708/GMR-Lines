import React, { useState, useEffect } from 'react';
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

const LogForm = ({ user }) => {
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

  // Fetch the latest ID for this user from the backend and set it in the form
  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/logs/latestId', {
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const latestId = response.data.latestId;
        setFormState((prevState) => ({
          ...prevState,
          Id: (latestId + 1).toString(),  // Increment the latest ID and update formState
        }));
      } catch (error) {
        console.error('Error fetching latest Id:', error);
      }
    };

    fetchLatestId();
  }, [user]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', formState);

    axios.post('http://localhost:5000/logs/createLog', formState, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    })
      .then(response => {
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
        backgroundColor: 'white', // Background color of the form container
        padding: 3,
        borderRadius: 2,
        boxShadow: 'none',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: 'Black', textAlign: 'center' }}>
        Log Entry Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formState).map((field) => (
            field === 'TOM' || field === 'CPU' ? (
              <Grid item xs={12} key={field}>
                <FormControl fullWidth>
                  <InputLabel
                    id={`${field}-label`}
                    sx={{ color: 'white' }} // Label color
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
                        color: 'white', // Text color of the selected item
                        backgroundColor: 'black', // Background color of the Select component
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'purple', // Border color of the Select component
                      },
                      '& .MuiSelect-icon': {
                        color: 'white', // Color of the dropdown icon
                      },
                      '& .MuiFormLabel-root.Mui-focused': {
                        color: 'white', // Label color when focused
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'purple', // Border color when focused
                      },
                      '& .MuiSelect-select.MuiSelect-select': {
                        backgroundColor: 'black', // Dropdown background color
                      },
                      '& .MuiMenuItem-root': {
                        backgroundColor: 'black', // Background color of menu items
                        color: 'white', // Text color of menu items
                      },
                      '& .MuiMenuItem-root:hover': {
                        backgroundColor: 'gray', // Background color of menu items on hover
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
                  disabled={field === 'Id'} // Disable the Id field to prevent editing
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'white', // Input text color
                    },
                    '& .MuiInputBase-input': {
                      color: 'white', // Input text color
                    },
                    '& .MuiFormLabel-root': {
                      color: 'white', // Label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'purple', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', // Border color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white', // Border color when focused
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
            backgroundColor: 'purple',
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
