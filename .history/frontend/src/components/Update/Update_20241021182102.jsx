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
            'auth-token': localStorage.getItem(),
          },
        });
        
        console.log("Fetched Data:", response.data); // Debugging: check what data is being fetched

        // Exclude unwanted fields before setting state
        const { user,_id, createdAt, updatedAt, __v, ...filteredData } = response.data;
        setFormState(filteredData); // Populate form with the filtered data
        
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
     await axios.put(`${URL}/update/updatenotes/${id}`, formState, {
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
      await axios.delete(`${URL}/delete/deleteLog/${id}`, {
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
  

  // Conditional rendering to wait for data load
  if (!formState.TOM && !formState.CPU) {
    return <Typography>Loading...</Typography>;
  }

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
        Edit Log
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
                      {(field === 'TOM' ? tomOptions : cpuOptions).map((option) => (
                        <MenuItem key={option}                  value={formState[field] || ''}   onChange={handleInputChange}>
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
