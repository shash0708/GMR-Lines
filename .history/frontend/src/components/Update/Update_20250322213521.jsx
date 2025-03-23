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
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Multiselect from 'multiselect-react-dropdown';
import URL from '../config.js';

const Logup = () => {
  const [formState, setFormState] = useState({
    
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
    dateTime: dayjs(),
    ATC: {}, // New ATC field
  });
  

  const tomOptions = ['A1(Line)', 'A2(Line)', 'A3(Line)'];
  const cpuOptions = ['B1', 'B2', 'B3'];
  const atcOptions = [
    { name: 'FOT' },
    { name: 'SGH' },
    { name: 'RI' },
    { name: 'MEL' },
    { name: 'TS' },
    { name: 'MOD' },
    { name: 'REP' },
    { name: 'INSP' },
  ]; // Options for the ATC multiselect

  const { id } = useParams();

  // Fetch log details on component load
  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await axios.get(`${URL}/logs/Getlogs/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
          },
        });

        const { user, _id, createdAt, updatedAt, __v, ...filteredData } = response.data;
        setFormState({
          ...filteredData,
          dateTime: filteredData.dateTime ? dayjs(filteredData.dateTime).toISOString() : null,
        });
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

  const handleDateChange = (newDate) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      dateTime: newDate ? dayjs(newDate).toISOString() : null,
    }));
  };

  const handleSelect = (selectedList) => {
    const newATCState = {};
    selectedList.forEach((item) => {
      newATCState[item.name] = 'X';
    });
    setFormState((prevFormState) => ({
      ...prevFormState,
      ATC: newATCState,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${URL}/update/updatenotes/${id}`, formState, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      toast.success('Log updated successfully!');
      window.location.reload();
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
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      toast.success('Log deleted successfully!');
      window.location.reload();
    } catch (error) {
      toast.error('Error deleting log');
      console.error('Error deleting log:', error);
    }
  };

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
            .filter(field => !['Id', 'createdAt', 'updatedAt', '__v', 'ATC'].includes(field)) // Exclude unwanted fields
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
                      value={formState[field] || ''}
                      onChange={handleInputChange}
                      required
                    >
                      {(field === 'TOM' ? tomOptions : cpuOptions).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ) : field === 'dateTime' ? (
                <Grid item xs={12} key={field}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                      label="Select Date & Time"
                      value={formState.dateTime ? dayjs(formState.dateTime) : null}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
              ) : (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    label={field}
                    id={field}
                    name={field}
                    value={formState[field] || ''}
                    onChange={handleInputChange}
                    required={field !== 'OP'}
                    multiline={field === 'CPU' || field === 'OP'}
                    rows={field === 'CPU' || field === 'OP' ? 4 : 1}
                  />
                </Grid>
              )
            )}
          {/* Add ATC Multiselect Field */}
          <Grid item xs={12}>
            <Multiselect
              options={atcOptions}
              displayValue="name"
              selectedValues={Object.keys(formState.ATC)
                .filter((key) => formState.ATC[key] === 'X')
                .map((name) => atcOptions.find((opt) => opt.name === name))}
              onSelect={handleSelect}
              onRemove={handleSelect}
              placeholder="Select ATC Options"
              style={{
                searchBox: { backgroundColor: '#fff', color: '#000' },
                chips: { backgroundColor: 'blue', color: '#fff' },
              }}
            />
          </Grid>
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
