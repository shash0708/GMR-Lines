import React, { useState } from 'react';
// import './Upd.css'; // For your CSS styles - Commented out for testing purposes

const Logup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableLog({
      ...editableLog,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    console.log('Updated log:', editableLog);
    setModalOpen(false);
  };

  const handleDelete = () => {
    console.log('Deleted log:', editableLog);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="app">
      {/* Button to toggle modal */}
      <button onClick={() => setModalOpen(true)}>Open Modal</button>

      {/* Checkbox display section */}
      {isChecked && (
        <div className="checkbox-container">
          <div className="checkbox">
            <span className="count">{count}</span>
          </div>
        </div>
      )}

      {/* Modal with log details */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Log Details</h2>
            <div className="log-details">
              {/* First Column */}
              <div className="column">
                <p>
                  <strong>Location:</strong>{' '}
                  <input
                    type="text"
                    name="Location"
                    value={editableLog.Location}
                    onChange={handleInputChange}
                  />
                </p>
                {/* Add other inputs in a similar fashion */}
              </div>
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
