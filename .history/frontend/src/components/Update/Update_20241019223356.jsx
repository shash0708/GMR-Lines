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
import URL from '../config.js';
const Logup = () => {
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

  const { id } = useParams(); // Use the ID from the URL

  // Fetch log details on component load
  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await axios.get(`${URL}/logs/Getlogs/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });
        setFormState(response.data); // Populate form with the fetched data
      } catch (error) {
        console.error('Error fetching log:', error);
      }
    };
    fetchLog();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${URL}/update/updatenotes/${id}`, formState, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      toast.success('Log updated successfully!');
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      toast.error('Error updating log');
      console.error('Error updating log:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${URL}/delete/deleteLog/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
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
        Add new Log
      </Typography>
      <form>
        <Grid container spacing={2}>
          {Object.keys(formState).map((field) =>
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
                    value={formState[field]}
                    onChange={handleInputChange}
                    required
                    sx={{
                      '& .MuiSelect-select': { color: 'black', backgroundColor: 'Gray' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'blue' },
                      '& .MuiSelect-icon': { color: 'white' },
                      '& .MuiFormLabel-root.Mui-focused': { color: 'white' },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'blue' },
                    }}
                  >
                    {(field === 'TOM' ? tomOptions : cpuOptions).map((option) => (
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
                  onChange={handleInputChange}
                  required={field !== 'OP'}
                  multiline={field === 'CPU' || field === 'OP'}
                  rows={field === 'CPU' || field === 'OP' ? 4 : 1}
                  disabled={field === 'Id'}
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
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
          <Button onClick={() => window.history.back()} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Container>
  );
};

export default Logup;
