import React, { useState } from 'react';
import './App.css'; // Assume we have some CSS for styling

const CardSelection = () => {
  // This state holds the IDs of the selected cards
  const [selectedIds, setSelectedIds] = useState([]);

  // Function to toggle the selection of a card
  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      // Remove the ID if already selected
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      // Add the ID to the selected list
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="container">
      <div className="cards">
        {/* Render 6 cards (for example) */}
        {[1, 2, 3, 4, 5, 6].map((cardId) => (
          <div
            key={cardId}
            className="card"
            onClick={() => toggleSelection(cardId)}
          >
            <div className="card-content">
              Card {cardId}
              {/* Circular checkbox */}
              {selectedIds.includes(cardId) && (
                <div className="checkbox-circle">
                  <span>&#10003;</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Button that shows the count of selected cards */}
      <button className="select-button">
        Selected IDs Count: {selectedIds.length}
      </button>
    </div>
  );
};

export default CardSelection;
