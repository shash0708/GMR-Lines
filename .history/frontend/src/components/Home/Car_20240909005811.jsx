// src/components/Card/Card.js
import React from 'react';
import './Card.css'; // Ensure you have corresponding CSS file for styling

const Card = ({ onClick, children, className }) => {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      role="button"
      tabIndex="0"
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
    >
      {children}
    </div>
  );
};

export default Card;
