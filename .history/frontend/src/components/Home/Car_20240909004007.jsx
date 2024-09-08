// src/components/Card/Card.js
import React from 'react';
import './Card.css'; // Ensure you have corresponding CSS file for styling

const Car = ({ children, className }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Car;
