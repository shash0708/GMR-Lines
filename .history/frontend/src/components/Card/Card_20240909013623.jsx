import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL from '../config';
const StyledCard = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 100px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    background-color: darkblue;
    color: white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  text-align: left;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  margin-top: 10px;
  background-color: blue;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Card = ({ date, id,ToA }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editableLog, setEditableLog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await fetch(`${URL}/getlogs/logs/${id}`,{
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
      <StyledCard onClick={handleCardClick}>
        <div>Date: {date}</div>
        <div>ID: {id}</div>
        <div>ToA: {ToA}</div>
      </StyledCard>

      {modalOpen && editableLog && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <h2>Log Details</h2>
            <div className="log-details">
              <div className="column">
                <p><strong>Date:</strong> <input type="text" name="createdAt" value={new Date(editableLog.createdAt).toLocaleDateString()} onChange={handleInputChange} /></p>
                <p><strong>ToA:</strong> <input type="text" name="ToA" value={editableLog.ToA} onChange={handleInputChange} /></p>
                <p><strong>Reg:</strong> <input type="text" name="reg" value={editableLog.reg} onChange={handleInputChange} /></p>
                <p><strong>ATA:</strong> <input type="text" name="ATA" value={editableLog.ATA} onChange={handleInputChange} /></p>
                <p><strong>Wo:</strong> <input type="text" name="Wo" value={editableLog.Wo} onChange={handleInputChange} /></p>
              </div>
              <div className="column">
                <p><strong>Mt:</strong> <input type="text" name="Mt" value={editableLog.Mt} onChange={handleInputChange} /></p>
                <p><strong>TOM:</strong> <input type="text" name="TOM" value={editableLog.TOM} onChange={handleInputChange} /></p>
                <p><strong>TOA:</strong> <input type="text" name="TOA" value={editableLog.TOA} onChange={handleInputChange} /></p>
                <p><strong>C:</strong> <input type="text" name="C" value={editableLog.C} onChange={handleInputChange} /></p>
                <p><strong>DU:</strong> <input type="text" name="DU" value={editableLog.DU} onChange={handleInputChange} /></p>
                <p><strong>Supervisor:</strong> <input type="text" name="Supervisor" value={editableLog.Supervisor} onChange={handleInputChange} /></p>
              </div>
            </div>
            <UpdateButton onClick={handleUpdate} style={{marginRight:'20px'}}>Update</UpdateButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ModalContent>
        </ModalOverlay>
      )}

      <ToastContainer />
    </>
  );
};

export default Card;
