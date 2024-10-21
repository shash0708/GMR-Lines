import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  DialogActions,
} from '@mui/material';
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [userData, setUserData] = useState(null); // Initially set to null to detect when data is available
  const [formState, setFormState] = useState({
    Name: '',
    Location: '',
    Designation: '',
    AME: '',
    Email: '',
    Phone: '',
  });

  const ameno = localStorage.getItem('ameNumber'); // Retrieve AMENO from localStorage
console.log("--->>>>---",ameno);
  // Fetch user data based on AMENO
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data..."); // Debugging log
        const response = await axios.get(`http://localhost:5000/api/getuser/${ameno}`, {
          headers: {
            'auth-token': localStorage.getItem('auth-token'), // Ensure the token is present
          },
        });
        console.log('User data fetched:', response.data); // Log fetched data
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (ameno) {
      fetchUserData();
    } else {
      console.error('No AMENO found in localStorage.');
    }
  }, [ameno]);

  // Populate formState with userData once fetched
  useEffect(() => {
    if (userData) {
      console.log("Setting form state with user data:", userData); // Debugging log
      setFormState({
        Name: userData.Name || '',
        Location: userData.Location || '',
        Designation: userData.Designation || '',
        AME: userData.AME || '',
        Email: userData.Email || '',
        Phone: userData.Phone || '',
      });
    }
  }, [userData]); // Update formState when userData changes

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/updateuser/${ameno}`, formState, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      toast.success('Profile updated successfully!');
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
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
          style={{ fontSize: '24px' }}
          onClick={() => window.history.back()}
        />
        Edit info
      </Typography>
      <form>
        <Grid container spacing={2}>
          {Object.keys(formState)
            .filter((field) => !['Id', 'createdAt', 'updatedAt', '__v'].includes(field)) // Filter out unwanted fields
            .map((field) => (
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
            ))}
        </Grid>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update
          </Button>
          <Button onClick={() => window.history.back()} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Container>
  );
};

export default EditProfile;
