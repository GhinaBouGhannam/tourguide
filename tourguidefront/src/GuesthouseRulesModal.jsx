import React from 'react';
import './GuesthouseRulesModal.css';

function GuesthouseRulesModal({ show, onClose, instructions }) {
  if (!show) return null; // Don't render the modal if 'show' is false

  return (
    <div className="rules-modal-overlay">
      <div className="rules-modal">
        <h3>Guesthouse Rules</h3>
        <p>{instructions}</p>
        <button className="close-modal-button" onClick={onClose}>Okay</button>
      </div>
    </div>
  );
}

export default GuesthouseRulesModal;
