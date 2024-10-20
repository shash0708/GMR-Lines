import React, { useState } from 'react';
import './Upd.css'; // For your CSS styles

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
      {/* Checkbox display section */}
      {isChecked && (
        <div className="checkbox-container">
          <div className="checkbox">
            <span className="count">{count}</span>
          </div>
        </div>
      )}

      {/* Modal with log details */}
      {modalOpen && editableLog && (
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
                <p>
                  <strong>ACTtype:</strong>{' '}
                  <input
                    type="text"
                    name="ACTtype"
                    value={editableLog.ACTtype}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>ACRegNo:</strong>{' '}
                  <input
                    type="text"
                    name="ACRegNo"
                    value={editableLog.ACRegNo}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>TOM:</strong>{' '}
                  <input
                    type="text"
                    name="TOM"
                    value={editableLog.TOM}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>CPU:</strong>{' '}
                  <input
                    type="text"
                    name="CPU"
                    value={editableLog.CPU}
                    onChange={handleInputChange}
                  />
                </p>
              </div>

              {/* Second Column */}
              <div className="column">
                <p>
                  <strong>FOT:</strong>{' '}
                  <input
                    type="text"
                    name="FOT"
                    value={editableLog.FOT}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>SGH:</strong>{' '}
                  <input
                    type="text"
                    name="SGH"
                    value={editableLog.SGH}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>RI:</strong>{' '}
                  <input
                    type="text"
                    name="RI"
                    value={editableLog.RI}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>MEL:</strong>{' '}
                  <input
                    type="text"
                    name="MEL"
                    value={editableLog.MEL}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>TS:</strong>{' '}
                  <input
                    type="text"
                    name="TS"
                    value={editableLog.TS}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>MOD:</strong>{' '}
                  <input
                    type="text"
                    name="MOD"
                    value={editableLog.MOD}
                    onChange={handleInputChange}
                  />
                </p>
              </div>

              {/* Third Column */}
              <div className="column">
                <p>
                  <strong>REP:</strong>{' '}
                  <input
                    type="text"
                    name="REP"
                    value={editableLog.REP}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>INSP:</strong>{' '}
                  <input
                    type="text"
                    name="INSP"
                    value={editableLog.INSP}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Training:</strong>{' '}
                  <input
                    type="text"
                    name="Training"
                    value={editableLog.Training}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Perform:</strong>{' '}
                  <input
                    type="text"
                    name="Perform"
                    value={editableLog.Perform}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Supervise:</strong>{' '}
                  <input
                    type="text"
                    name="Supervise"
                    value={editableLog.Supervise}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>CRS_RTS:</strong>{' '}
                  <input
                    type="text"
                    name="CRS_RTS"
                    value={editableLog.CRS_RTS}
                    onChange={handleInputChange}
                  />
                </p>
              </div>

              {/* Fourth Column */}
              <div className="column">
                <p>
                  <strong>ATA:</strong>{' '}
                  <input
                    type="text"
                    name="ATA"
                    value={editableLog.ATA}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>OP:</strong>{' '}
                  <input
                    type="text"
                    name="OP"
                    value={editableLog.OP}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>DU:</strong>{' '}
                  <input
                    type="text"
                    name="DU"
                    value={editableLog.DU}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>MRR:</strong>{' '}
                  <input
                    type="text"
                    name="MRR"
                    value={editableLog.MRR}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Supervisor:</strong>{' '}
                  <input
                    type="text"
                    name="Supervisor"
                    value={editableLog.Supervisor}
                    onChange={handleInputChange}
                  />
                </p>
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
    
