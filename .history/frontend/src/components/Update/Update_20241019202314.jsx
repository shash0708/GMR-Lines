import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Include useNavigate for redirect after delete
import { Container, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const LogDetails = () => {
  const { logId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    Id: logId, // logId will be the unique identifier
    TOM: '',
    CPU: '',
    // Add other fields as needed
  });

  useEffect(() => {
    // Fetch the log by logId and populate formState
    // Example: fetchLog(logId).then(data => setFormState(data));
  }, [logId]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Logic to update the log (send updated formState to backend)
    // Example: updateLog(logId, formState).then(() => alert('Log Updated!'));
  };

  const handleDelete = () => {
    // Logic to delete the log (call the delete API)
    // Example: deleteLog(logId).then(() => {
    //   alert('Log Deleted!');
    //   navigate('/'); // Redirect to homepage or logs list after deletion
    // });
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Edit Log
      </Typography>

      <form onSubmit={handleUpdate}>
        <Grid container spacing={2}>
          {Object.keys(formState).map((field) => (
            field === 'TOM' || field === 'CPU' ? (
              <Grid item xs={12} key={field}>
                <FormControl fullWidth>
                  <InputLabel id={`${field}-label`}>{field}</InputLabel>
                  <Select
                    labelId={`${field}-label`}
                    id={field}
                    name={field}
                    value={formState[field]}
                    onChange={handleChange}
                    required
                  >
                    {/* Replace with appropriate options */}
                    <MenuItem value="Option1">Option 1</MenuItem>
                    <MenuItem value="Option2">Option 2</MenuItem>
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
                  onChange={handleChange}
                  required={field !== 'OP'} // 'OP' field is optional, adjust as needed
                  multiline={field === 'CPU' || field === 'OP'}
                  rows={field === 'CPU' || field === 'OP' ? 4 : 1}
                  disabled={field === 'Id'} // Disable the 'Id' field (can't change)
                />
              </Grid>
            )
          ))}
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, width: '100%' }}>
          Update
        </Button>
        
        <Button
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          sx={{ marginTop: 2, width: '100%' }}
        >
          Delete
        </Button>
      </form>
    </Container>
  );
};

export default LogDetails;
