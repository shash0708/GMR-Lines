import React from 'react';
import './Upd.css'; // import CSS for styling

const Logup = () => {
  return (
    <div>
      <h2>Log details</h2>
      <div className="log-item">
        <p><strong>Date</strong></p>
       
        <p className="value">6/1/2022</p>
      </div>

      <div className="log-item">
        <span className="label">Employee ID</span>
        <span className="value">2345</span>
     
      </div>

      <div className="log-item">
      <p><strong>Location</strong> <p name="Location" value="ad" />fdm</p>
      <p><strong>ACTtype:</strong> <p type="text" name="ACTtype" v onChange={handleInputChange} /></p>
  <p><strong>ACRegNo:</strong> <p type="text" name="ACRegNo" value={editableLog.ACRegNo} onChange={handleInputChange} /></p>
  <p><strong>TOM:</strong> <p type="text" name="TOM" value={editableLog.TOM} onChange={handleInputChange} /></p>
  <p><strong>CPU:</strong>
 
      </div>

      <div className="log-item">
        <span className="label">Flight number</span>
        <span className="value">1234</span>
      </div>

      <div className="log-item">
        <span className="label">Aircraft type</span>
        <span className="value">B737-900</span>
      </div>

      <div className="log-item">
        <span className="label">Route</span>
        <span className="value">SFO-LAX</span>
      </div>

      <div className="log-item">
        <span className="label">Departure time</span>
        <span className="value">12:00 PM</span>
      </div>

      <div className="log-item">
        <span className="label">Arrival time</span>
        <span className="value">1:30 PM</span>
      </div>

      <div className="log-item">
        <span className="label">Total time</span>
        <span className="value">1 hour 30 minutes</span>
      </div>
    </div>
  );
};

export default Logup;
