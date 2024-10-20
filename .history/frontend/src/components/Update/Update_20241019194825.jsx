import React, { useState } from 'react';
 import './Upd.css'; // For your CSS styles

const Logup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(true);
  const [editableLog, setEditableLog] = useState({
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

  const handleUpdate = () => {
    console.log('Updated log:', editableLog);
    setModalOpen(false);
  };

  const handleDelete = () => {
    console.log('Deleted log:', editableLog);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="app">
      {/* Button to toggle modal */}
      {/* <button onClick={() => setModalOpen(true)}>Open Modal</button> */}

      {/* Modal with log details */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Log Details</h2>

            {/* First Column */}
            <div className="column">
              <p><strong>Location:</strong><p/> {editableLog.Location}</p>
              <p><strong>ACTtype:</strong> <p/> {editableLog.ACTtype}</p>
              <p><strong>ACRegNo:</strong> <p/> {editableLog.ACRegNo}</p>
              <p><strong>TOM:</strong><p/>  {editableLog.TOM}</p>
              <p><strong>CPU:</strong><p/>  {editableLog.CPU}</p>
            </div>

            {/* Second Column */}
            <div className="column">
              <p><strong>FOT:</strong><p/>  {editableLog.FOT}</p>
              <p><strong>SGH:</strong> <p/> {editableLog.SGH}</p>
              <p><strong>RI:</strong><p/>  {editableLog.RI}</p>
              <p><strong>MEL:</strong><p/>  {editableLog.MEL}</p>
              <p><strong>TS:</strong><p/>  {editableLog.TS}</p>
              <p><strong>MOD:</strong><p/>  {editableLog.MOD}</p>
            </div>

            {/* Third Column */}
            <div className="column">
              <p><strong>REP:</strong> <p/> {editableLog.REP}</p>
              <p><strong>INSP:</strong><p/>  {editableLog.INSP}</p>
              <p><strong>Training:</strong><p/>  {editableLog.Training}</p>
              <p><strong>Perform:</strong> <p/> {editableLog.Perform}</p>
              <p><strong>Supervise:</strong><p/>  {editableLog.Supervise}</p>
              <p><strong>CRS_RTS:</strong> {editableLog.CRS_RTS}</p>
            </div>

            {/* Fourth Column */}
            <div className="column">
              <p><strong>ATA:</strong> {editableLog.ATA}</p>
              <p><strong>OP:</strong> {editableLog.OP}</p>
              <p><strong>DU:</strong> {editableLog.DU}</p>
              <p><strong>MRR:</strong> {editableLog.MRR}</p>
              <p><strong>Supervisor:</strong> {editableLog.Supervisor}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="update-button" onClick={handleUpdate}>
                Update
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logup;
