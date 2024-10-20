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
import { useNavigate, useParams } from 'react-router-dom';
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
        const response = await axios.get(`http://localhost:5000/api/user/${ameno}`); // Replace with actual API call
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

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/user/${ameno}`, userData); // Update user data based on AMENO
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

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
     
      // Axios throws an error for non-2xx responses, so no need for response.ok check
      toast.success('Log updated successfully!');
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      toast.error('Error updating log');
      console.error('Error updating log:', error);
    }
  };
  
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/user/${ameno}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      
      // Axios automatically throws for non-2xx responses, no need for extra checks
      toast.success('Log deleted successfully!');
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      toast.error('Error deleting log');
      console.error('Error deleting log:', error);
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
    <Typography variant="h4" gutterBottom sx={{ color: 'Black', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '40px' }}>
      <FaArrowLeftLong style={{ fontSize: '24px' }} onClick={() => window.history.back()} /> 
      Edit info
    </Typography>
    <form>
      <Grid container spacing={2}>
        {Object.keys(formState)
          .filter(field => !['Id', 'createdAt', 'updatedAt', '__v'].includes(field)) // Filter out unwanted fields
          .map((field) =>
            field === 'TOM' || field === 'CPU' ? (
              <Grid item xs={12} key={field}>
                <FormControl fullWidth>
                  <InputLabel id={`${field}-label`} sx={{ color: 'Black' }}>
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
                      '& .MuiSelect-select': { color: 'black', backgroundColor: 'white' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'blue' },
                      '& .MuiSelect-icon': { color: 'white' },
                      '& .MuiFormLabel-root.Mui-focused': { color: 'white' },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'blue' },
                    }}
                  >
                    
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
        <Button onClick={handleUpdate} color="primary" variant="contained">
          Update
        </Button>
        {/* <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button> */}
        <Button onClick={() => window.history.back()} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  </Container>
  );
};

export default EditProfile;
