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
  DialogActions,
} from '@mui/material';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const [formState, setFormState] = useState({
    Name: '',
    Location: '',
    Designation: '',
    AME: '',
    Email: '',
    Phone: '',
  });

  const ameno = localStorage.getItem('ameNumber'); // Retrieve AMENO from localStorage

  // Fetch user data based on AMENO
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getuser/${ameno}`); // Replace with actual API call
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

  // Populate formState with fetched userData
  useEffect(() => {
    if (userData) {
      setFormState({
        Name: userData.Name || '',
        Location: userData.Location || '',
        Designation: userData.Designation || '',
        AME: userData.AME || '',
        Email: userData.Email || '',
        Phone: userData.Phone || '',
      });
    }
  }, [userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/user/${ameno}`, formState, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
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
