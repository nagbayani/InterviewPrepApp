"use client";

import React, { useState } from "react";
import Card from "../card";

const Deck = () => {
  // retrieve list of cards
  
  const [cards, setCards] = useState<{ id: string }[]>([]);
  const [prevCardQuestionEmpty, setPrevCardQuestionEmpty] = useState(true);

  const addCard = () => {

    const id = Math.random().toString();

    setCards([...cards, { id }]);
  };

  return (
    <div className='flex w-auto h-full items-center'>
      <button
        className='flex add-card-btn w-100px flex-col justify-center items-center'
        onClick={addCard}
      >
        <span>+</span>
        <span>Write a Question</span>
      </button>
      <div className='flex flex-wrap justify-start h-5/6'>
        {cards.map((card, index) => (
          <Card key={card.id} isLastCard={index === cards.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
