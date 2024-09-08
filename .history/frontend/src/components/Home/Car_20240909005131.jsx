// src/components/Card/Card.js
import React from 'react';
import './Card.css'; // Ensure you have corresponding CSS file for styling

const Card = ({ onClick, children, className }) => {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      role="button" // Makes it clear that the div is interactive
      tabIndex="0"  // Makes the div focusable
      onKeyPress={(e) => e.key === 'Enter' && onClick()} // Allow triggering on Enter key press
    >
      {children}
    </div>
  );
};

export default Card;
