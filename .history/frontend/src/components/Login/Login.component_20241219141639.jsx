import React, { useState ,useContext} from 'react';
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


const Login = () => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  const [formState, setFormState] = useState({
    AME: '',
    password: '',
  });

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Function to log in a user and store AME and token in localStorage
  const handleCreateUser = async () => {
    try {
      console.log('Form state:', formState);
      
      const response = await axios.post(`${URL}/api/login`, formState, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response:', response);
      console.log('Response data:', response.data); // Log the response data for debugging
      const json = response.data; // Directly access the data property
    
      if (response.status === 200) {
        // Check if authtoken exists in the response
        const token = json.authtoken; // Adjust this line based on the actual structure of your response
        const ameNumber = formState.AME;
        console.log('AME number:', ameNumber);
        if (token && ameNumber) {
          localStorage.setItem('auth-token', token); 
          localStorage.setItem('ameNumber', ameNumber);
  
          toast.success('User logged in successfully!'); // Update success message
          navigate('/profile');
        } else {
          toast.error('Token is missing from the response');
        }
      } else {
        toast.error('Failed to log in user');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
  
      if (error.response) {
        console.error('Error response data:', error.response.data);
        toast.error('Error: ' + (error.response.data.message || 'Invalid request'));
      } else {
        toast.error('Error logging in user: ' + error.message);
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
          style={{ fontSize: '14px' ,
            color: darkMode ? 'white' : '#000',
          }}
          onClick={() => window.history.back()}
        />
        SignUp
      </Typography>
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
                      sx={{         color: darkMode ? 'white' : '#000', }}
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
                          color: 'black',
                          backgroundColor: 'white',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'blue',
                        },
                        '& .MuiSelect-icon': { color: 'white' },
                        '& .MuiFormLabel-root.Mui-focused': {
                          color: 'white',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: 'blue',
                          },
                      }}
                    />
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
                      '& .MuiInputBase-root': {         color: darkMode ? 'white' : '#000',},
                      '& .MuiInputBase-input': {       color: darkMode ? 'white' : '#000', },
                      '& .MuiFormLabel-root': {        color: darkMode ? 'white' : '#000', },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'blue' },
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

export default Login;
