import React, { useState } from 'react';
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
  const [dockPosition, setDockPosition] = useState('top');

  const handleDockChange = (position) => {
    setDockPosition(position);
  };

  return (
    <div className={`navbar ${dockPosition}`}>
      {/* <div className="navbar-content">
        <button onClick={() => handleDockChange('top')}>Top</button>
        <button onClick={() => handleDockChange('bottom')}>Bottom</button>
        <button onClick={() => handleDockChange('left')}>Left</button>
        <button onClick={() => handleDockChange('right')}>Right</button>
      </div> */}
      <div className="navbar-items">
        <a href="#home">Home</a>
        <a href="#about">Past Records</a>
        <a href="#services">Log Out</a>
      </div>
    </div>
  );
};

export default Navbar;
