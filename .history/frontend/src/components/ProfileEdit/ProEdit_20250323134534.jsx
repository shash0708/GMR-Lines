import React, { useContext } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  DialogActions,
  IconButton,
} from '@mui/material';
import { FaArrowLeftLong } from "react-icons/fa6";
import { ThemeContext } from '../../context/ThemeChange.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import URL from '../config.js';

const EditProfile = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [formState, setFormState] = React.useState({
    Name: '',
    Location: '',
    Designation: '',
    AME: '',
    Email: '',
    Phone: '',
  });

  const ameno = localStorage.getItem('ameNumber');

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${URL}/api/getuser/${ameno}`, {
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
          },
        });
        setFormState(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (ameno) {
      fetchUserData();
    }
  }, [ameno]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${URL}/api/updateuser/${ameno}`, formState, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      toast.success('Profile updated successfully!');
      window.location.reload();
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: darkMode ? 'black' : 'white',
        color: darkMode ? '#fff' : '#000',
        padding: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FaArrowLeftLong
          style={{ fontSize: '24px', cursor: 'pointer' }}
          onClick={() => window.history.back()}
        />
        Edit Info
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: darkMode ? '#fff' : '#000',
          }}
        >
          
        </IconButton>
      </Typography>

      <form>
        <Grid container spacing={2}>
          {Object.keys(formState).map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                fullWidth
                label={field}
                id={field}
                name={field}
                value={formState[field] || ''}
                onChange={handleInputChange}
                required
                sx={{
                  '& .MuiInputBase-root': {
                    color: darkMode ? '#fff' : '#000',
                  },
                  '& .MuiInputBase-input': {
                    color: darkMode ? '#fff' : '#000',
                  },
                  '& .MuiFormLabel-root': {
                    color: darkMode ? '#bbb' : '#000',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: darkMode ? '#bbb' : 'blue',
                    },
                    '&:hover fieldset': {
                      borderColor: darkMode ? '#fff' : '#000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkMode ? '#fff' : '#000',
                    },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <DialogActions>
          <Button
            onClick={handleUpdate}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: darkMode ? '#6200ea' : '#1976d2',
              '&:hover': {
                backgroundColor: darkMode ? '#3700b3' : '#115293',
              },
            }}
          >
            Update
          </Button>
          <Button
            onClick={() => window.history.back()}
            color="secondary"
            sx={{
              color: darkMode ? '#fff' : '#000',
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Container>
  );
};

export default EditProfile;
