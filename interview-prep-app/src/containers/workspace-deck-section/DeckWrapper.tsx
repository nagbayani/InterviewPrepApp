"use client";

import React from "react";
import "../../styles/deckWrapper.css";
import { useState, useEffect } from "react";
import CardForm from "@/components/forms/card/CardForm";
import cuid from "cuid";

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

interface CardData {
  id: string;
  createdAt: string;
  updatedAt: string;
  question: string;
  answer: string;
  category: string;
  authorId: string;
  deckId: string;
}

const DeckWrapper = ({ deck, cards }: DeckWrapperProps) => {
  // const deckData = data.deck;
  // const cardsData = data.cards;

  const [deckData, setDeck] = useState(deck);
  const [cardsData, setCards] = useState(cards);
  const [testCards, setTestCards] = useState<CardData[]>([cards]);

  const addCard = () => {
    setTestCards([...testCards, { id: cuid(), question: "" }]);
  };

  useEffect(() => {
    setDeck(deck);
    setCards(cards);
    // console.log(deck, "DECK DATA IN DECK WRAPPER");
    console.log(cards, "CARDS DATA IN DECK WRAPPER");
  }, [deck, cards]);
  return (
    <div className='deck-wrapper-container'>
      <div className='deck-wrapper-header'>
        <h1>{deck?.title}</h1>
      </div>
      {cards.map((card) => {
        return <CardForm key={card.id} question={card.question} />;
      })}
      <button className='add-card-btn w-full' onClick={addCard}>
        Add Card
      </button>
    </div>
  );
};

export default DeckWrapper;

/*
    id        String   @id @default(cuid())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt 
    question  String
    answer    String
    category  String
    author    User    @relation(fields: [authorId], references: [id])
    authorId  String
    deck      Deck    @relation(fields: [deckId], references: [id])
    deckId    String
  */
