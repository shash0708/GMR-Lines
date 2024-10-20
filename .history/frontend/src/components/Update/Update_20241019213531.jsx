import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL from '../config';
import { 
  Grid, 
  TextField, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle 
} from '@mui/material';

const Logup = ({ date, id, ToA }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editableLog, setEditableLog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await fetch(`${URL}/logs/Getlogs/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEditableLog(data);
      } catch (error) {
        console.error('Error fetching log:', error);
      }
    };
    fetchLog();
  }, [id]);

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableLog((prevLog) => ({
      ...prevLog,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${URL}/update/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(editableLog),
      });

      if (!response.ok) {
        throw new Error('Failed to update log');
      }

      toast.success('Log updated successfully!');
      setModalOpen(false);
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      toast.error('Error updating log');
      console.error('Error updating log:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${URL}/delete/deleteLog/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete log');
      }

      toast.success('Log deleted successfully!');
      setModalOpen(false);
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      toast.error('Error deleting log');
      console.error('Error deleting log:', error);
    }
  };

  return (
    <>
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Log</DialogTitle>
        <DialogContent>
          {editableLog ? ( // Only render the content if editableLog is defined
            <Grid container spacing={2}>
              {Object.keys(editableLog).map((field, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    label={field}
                    name={field}
                    value={editableLog[field]}
                    onChange={handleInputChange}
                    fullWidth
                    multiline={field === 'OP' || field === 'CPU'} // Adjust if specific fields require multi-line
                    rows={field === 'OP' || field === 'CPU' ? 3 : 1}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>Loading log data...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default Card;
