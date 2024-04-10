import React, { useState } from "react";

function Card(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`card-container ${isFlipped ? "is-flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className='card'>
        <div className='card-face card-face-front'>
          <p>{props.front}</p>
        </div>
        <div className='card-face card-face-back'>B: {props.back}</div>
      </div>
    </div>
  );
}

export default Card;
