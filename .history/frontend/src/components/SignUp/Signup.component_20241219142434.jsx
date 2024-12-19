import React, { useState,useContext } from 'react';
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
  DialogActions,
} from '@mui/material';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import URL from '../config';
import { ThemeContext } from '../../context/ThemeChange.js';

const Signup = () => {
      const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  const [formState, setFormState] = useState({
    Name: '',
    Location: '',
    Designation: '',
    AME: '',
    Email: '',
    Phone: '',
    password:'',
    cpassword:'',

  });


  const navigate = useNavigate();
  // const URL = 'your_api_url_here'; // Replace with your API URL

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Function to create a user and store AME in localStorage
  const handleCreateUser = async () => {
    try {
      // Log the formState to see what is being sent
      console.log('Form state:', formState);
      
      const response = await axios.post(`${URL}/api/createuser`, formState, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Log the entire response to debug
      console.log('Response:', response);
      const json = response.data;

      if (response.status === 200) {
        const ameNumber = formState.AME;
        console.log('AME number:', ameNumber);
        localStorage.setItem('auth-token', json.authtoken);
        console.log(json.authoken)
  
        if (ameNumber) {
          localStorage.setItem('ameNumber', ameNumber);
          toast.success('User created successfully!');
          navigate('/profile');
        } else {
          toast.error('AME number is missing from the response');
        }
      } else {
        toast.error('Failed to create user');
      }
  
    } catch (error) {
      // Log the full error to understand the issue
      console.error('Error creating user:', error);
      
      // Check if the error response is available
      if (error.response) {
        console.error('Error response data:', error.response.data);
        toast.error('Error: ' + (error.response.data.message || 'Invalid request'));
      } else {
        toast.error('Error creating user: ' + error.message);
      }
    }
  };
  
  
  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: darkMode ? 'black' : 'white',
        color: darkMode ? 'white' : '#000',       
         padding: 3,
        borderRadius: 2,
        boxShadow: 'none',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
        
          color: darkMode ? 'white' : '#000',      
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <FaArrowLeftLong
          style={{ fontSize: '14px',
            
            color: darkMode ? 'white' : '#000',      
           }}
          onClick={() => window.history.back()}
        />
SignUp      </Typography>
      <form>
        <Grid container spacing={2}>
          {Object.keys(formState)
            .filter((field) => !['Id', 'createdAt', 'updatedAt', '__v'].includes(field)) // Filter out unwanted fields
            .map((field) =>
              field === 'TOM' || field === 'CPU' ? (
                <Grid item xs={12} key={field}>
                  <FormControl fullWidth>
                    <InputLabel
                      id={`${field}-label`}
                      sx={{  color: darkMode ? 'white' : '#000', 
                        border: `1px solid ${darkMode ? '#fff' : '#000'}`}}
                    >
                      {field}
                    </InputLabel>
                    <Select
                      labelId={`${field}-label`}
                      id={field}
                      name={field}
                      value={formState[field] || ''} // Ensure the value is set, defaulting to an empty string
                      onChange={handleInputChange}
                      required
                      sx={{
                        '& .MuiSelect-select': {
                          backgroundColor: darkMode ? 'black' : 'white',
        color: darkMode ? 'white' : '#000',      
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'blue',
                        },
                        '& .MuiSelect-icon': { color: 'white' },
                        '& .MuiFormLabel-root.Mui-focused': {
                          backgroundColor: darkMode ? 'black' : 'white',
                          color: darkMode ? 'white' : '#000',      
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: 'blue',
                          },
                      }}
                    ></Select>
                  </FormControl>
                </Grid>
              ) : (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    label={field}
                    id={field}
                    name={field}
                    value={formState[field] || ''} // Ensure value defaults to empty string to avoid uncontrolled component issues
                    onChange={handleInputChange}
                    required={field !== 'OP'}
                    multiline={field === 'CPU' || field === 'OP'}
                    rows={field === 'CPU' || field === 'OP' ? 4 : 1}
                    sx={{
                      '& .MuiInputBase-root': {  backgroundColor: darkMode ? 'black' : 'white',
                        color: darkMode ? 'white' : '#000',       },
                      '& .MuiInputBase-input': {  backgroundColor: darkMode ? 'black' : 'white',
                        color: darkMode ? 'white' : '#000',       },
                      '& .MuiFormLabel-root': {  backgroundColor: darkMode ? 'black' : 'white',
                        color: darkMode ? 'white' : '#000',       },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'b' },
                        '&:hover fieldset': { borderColor: 'Black' },
                        '&.Mui-focused fieldset': { borderColor: 'Black' },
                      },
                    }}
                  />
                </Grid>
              )
            )}
        </Grid>
        <DialogActions>
          <Button
            onClick={handleCreateUser}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Container>
  );
};

export default Signup;
