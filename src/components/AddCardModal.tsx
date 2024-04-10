import React, { useState } from 'react';

function AddCardModal({ isOpen, onClose, onAddCard }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleAddCard = () => {
    onAddCard({ front, back });
    setFront('');
    setBack('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Flash Card</h2>
        <label>Front:</label>
        <input type="text" value={front} onChange={(e) => setFront(e.target.value)} />
        <label>Back:</label>
        <input type="text" value={back} onChange={(e) => setBack(e.target.value)} />
        <div className="modal-buttons">
          <button onClick={handleAddCard}>Add Card</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
    // <div className="modal">
    //   <div className="modal-content">
    //     <h2 className='modalTitle'>Add New Flash Card</h2>
    //     <label className='modalTitle' >Front:</label>
    //     <input type="text" value={front} onChange={(e) => setFront(e.target.value)} />
    //     <label className='modalTitle' >Back:</label>
    //     <input type="text" value={back} onChange={(e) => setBack(e.target.value)} />
    //     <button onClick={handleAddCard}>Add Card</button>
    //     <button onClick={onClose}>Cancel</button>
    //   </div>
    // </div>
  );
}

export default AddCardModal;