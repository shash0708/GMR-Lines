import React, { useState } from 'react';
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
const Signup = () => {
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
      const response = await axios.post(`${URL}/api/createuser`, formState, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Log the entire response data to understand its structure
      console.log('Response data:', response.data);
  
      // Extract the AME from the response data
  
      // Store AME in localStorage if it exists
      if (AME) {
        toast.success('User created successfully!');
        navigate('/profile'); // Redirect to profile page
      } else {
        toast.error('AME number is missing from the response');
      }
  
    } catch (error) {
      toast.error('Error creating user');
      console.error('Error creating user:', error);
    }
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: 'Black',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <FaArrowLeftLong
          style={{ fontSize: '14px' }}
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
                      sx={{ color: 'Black' }}
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
                      '& .MuiInputBase-root': { color: 'Black' },
                      '& .MuiInputBase-input': { color: 'Black' },
                      '& .MuiFormLabel-root': { color: 'Black' },
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

export default Signup;
