"use client";

import React, { useState } from "react";
import Card from "../card";

const Deck = () => {
  const [cards, setCards] = useState<{ id: string }[]>([]);

  const addCard = () => {
    // Generate a unique ID for the new card
    const id = Math.random().toString();

    // Add a new card object to the cards array
    setCards([...cards, { id }]);
  };
  return (
    <div className='w-[full] h-[full] border-red border-2'>
      {cards.map((card) => (
        <Card key={card.id} />
      ))}
      <button className='w-[100px] border-black border-4' onClick={addCard}>
        Click Me
      </button>
    </div>
  );
};

export default Deck;
