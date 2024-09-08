import React, { useState, useRef } from 'react';
import './FormStyles.css'; // Assuming you have a separate CSS file for styles

const MyForm = () => {
  const [Id, setId] = useState('');
  const [ToA, setToA] = useState('');
  const [reg, setReg] = useState('');
  const [ATA, setATA] = useState('');
  const [Wo, setWo] = useState('');
  const [Mt, setMt] = useState('');
  const [TOM, setTOM] = useState('');
  const [TOA, setTOA] = useState('');
  const [C, setC] = useState('');
  const [DU, setDU] = useState('');
  const [Supervisor, setSupervisor] = useState('');
  const toast = useRef(null); // Reference for Toast

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    if (toast.current) {
      toast.current.show('Form submitted successfully!'); // Example usage
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Id">ID:</label>
          <input type="text" id="Id" value={Id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="ToA">ToA:</label>
          <input type="text" id="ToA" value={ToA} onChange={(e) => setToA(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="reg">Reg:</label>
          <input type="text" id="reg" value={reg} onChange={(e) => setReg(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="ATA">ATA:</label>
          <input type="text" id="ATA" value={ATA} onChange={(e) => setATA(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="Wo">Wo:</label>
          <input type="text" id="Wo" value={Wo} onChange={(e) => setWo(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="Mt">Mt:</label>
          <input type="text" id="Mt" value={Mt} onChange={(e) => setMt(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="TOM">TOM:</label>
          <input type="text" id="TOM" value={TOM} onChange={(e) => setTOM(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="TOA">TOA:</label>
          <input type="text" id="TOA" value={TOA} onChange={(e) => setTOA(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="C">C:</label>
          <input type="text" id="C" value={C} onChange={(e) => setC(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="DU">DU:</label>
          <input type="text" id="DU" value={DU} onChange={(e) => setDU(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="Supervisor">Supervisor:</label>
          <input type="text" id="Supervisor" value={Supervisor} onChange={(e) => setSupervisor(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <div ref={toast} className="toast"> {/* Example Toast container */} </div>
    </div>
  );
};

export default MyForm;
