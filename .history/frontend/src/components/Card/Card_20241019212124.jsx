import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL from '../config';
import { FaPlaneDeparture } from "react-icons/fa";

const StyledCard = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 100px;
  background-color: transparent;
  opacity:1;
  border: 1px solid black;
  border-radius: 20px;
  margin: 10px;
  backdrop-filter: blur(10px); /* Add blur effect */

  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    
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
  z-index: 1000; /* Ensures the modal is above all other elements */
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
        const response = await fetch(`${URL}/logs/Getlogs/${id}`,{
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

  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0);

  const handleCardLongPress = () => {
    setIsChecked(true);
    setCount(count + 1);
  };


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
    
    <div class="item-container" onClick={handleCardClick} onContextMenu={(e) => { e.preventDefault(); handleCardLongPress(); }}>
  <div class="icon-container">
  <FaPlaneDeparture />


  </div>

  <div class="info-container"  >
  <div> {date}</div>
  <div>ID: {id}</div>
  </div>

  <div class="arrow-container">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="arrow-icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 19l7-7-7-7" />
    </svg>
  </div>
</div>
      {/* <StyledCard onClick={handleCardClick}>
        <div>Date: {date}</div>
        <div>ID: {id}</div>
        <div>ToA: {ToA}</div>
      </StyledCard> */}

{isChecked && (
        <div className="checkbox-container">
          <div className="checkbox">
            <span className="count">{count}</span>
          </div>
        </div>
      )}

      {modalOpen && editableLog && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <h2>Log Details</h2>
            <div className="log-details">
            <div className="column">
  <p><strong>Location:</strong> <input type="text" name="Location" value={editableLog.Location} onChange={handleInputChange} /></p>
  <p><strong>ACTtype:</strong> <input type="text" name="ACTtype" value={editableLog.ACTtype} onChange={handleInputChange} /></p>
  <p><strong>ACRegNo:</strong> <input type="text" name="ACRegNo" value={editableLog.ACRegNo} onChange={handleInputChange} /></p>
  <p><strong>TOM:</strong> <input type="text" name="TOM" value={editableLog.TOM} onChange={handleInputChange} /></p>
  <p><strong>CPU:</strong> <input type="text" name="CPU" value={editableLog.CPU} onChange={handleInputChange} /></p>
</div>

<div className="column">
  <p><strong>FOT:</strong> <input type="text" name="FOT" value={editableLog.FOT} onChange={handleInputChange} /></p>
  <p><strong>SGH:</strong> <input type="text" name="SGH" value={editableLog.SGH} onChange={handleInputChange} /></p>
  <p><strong>RI:</strong> <input type="text" name="RI" value={editableLog.RI} onChange={handleInputChange} /></p>
  <p><strong>MEL:</strong> <input type="text" name="MEL" value={editableLog.MEL} onChange={handleInputChange} /></p>
  <p><strong>TS:</strong> <input type="text" name="TS" value={editableLog.TS} onChange={handleInputChange} /></p>
  <p><strong>MOD:</strong> <input type="text" name="MOD" value={editableLog.MOD} onChange={handleInputChange} /></p>
</div>


<div className="column">
  <p><strong>REP:</strong> <input type="text" name="REP" value={editableLog.REP} onChange={handleInputChange} /></p>
  <p><strong>INSP:</strong> <input type="text" name="INSP" value={editableLog.INSP} onChange={handleInputChange} /></p>
  <p><strong>Training:</strong> <input type="text" name="Training" value={editableLog.Training} onChange={handleInputChange} /></p>
  <p><strong>Perform:</strong> <input type="text" name="Perform" value={editableLog.Perform} onChange={handleInputChange} /></p>
  <p><strong>Supervise:</strong> <input type="text" name="Supervise" value={editableLog.Supervise} onChange={handleInputChange} /></p>
  <p><strong>CRS_RTS:</strong> <input type="text" name="CRS_RTS" value={editableLog.CRS_RTS} onChange={handleInputChange} /></p>
</div>

<div className="column">
  <p><strong>ATA:</strong> <input type="text" name="ATA" value={editableLog.ATA} onChange={handleInputChange} /></p>
  <p><strong>OP:</strong> <input type="text" name="OP" value={editableLog.OP} onChange={handleInputChange} /></p>
  <p><strong>DU:</strong> <input type="text" name="DU" value={editableLog.DU} onChange={handleInputChange} /></p>
  <p><strong>MRR:</strong> <input type="text" name="MRR" value={editableLog.MRR} onChange={handleInputChange} /></p>
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
