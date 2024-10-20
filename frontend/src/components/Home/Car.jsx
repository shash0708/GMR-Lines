// src/components/Card/Card.js
import React from 'react';
import './Car.css';

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