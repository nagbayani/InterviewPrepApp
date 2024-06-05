"use client";

import React from "react";
import "../../styles/deckWrapper.css";
import { useState, useEffect } from "react";

interface DeckData {
  deck: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
  };
  cards: {
    id: string;
    createdAt: string;
    updatedAt: string;
    question: string;
    answer: string;
    category: string;
    authorId: string;
    deckId: string;
  }[];
}

interface DeckWrapperProps {
  deck: DeckData["deck"];
  cards: DeckData["cards"];
}

const DeckWrapper = ({ deck, cards }: DeckWrapperProps) => {
  // const deckData = data.deck;
  // const cardsData = data.cards;

  const [deckData, setDeck] = useState(deck);
  const [cardsData, setCards] = useState(cards);

  useEffect(() => {
    setDeck(deck);
    setCards(cards);
    // console.log(deck, "DECK DATA IN DECK WRAPPER");
    // console.log(cards, "CARDS DATA IN DECK WRAPPER");
  }, [deck, cards]);
  return (
    <div className='deck-wrapper-container'>
      <div className='deck-wrapper-header'>
        <h1>{deck?.title}</h1>
      </div>
    </div>
  );
};

export default DeckWrapper;
