"use client";

import React, { useState } from "react";
import Card from "../card/Card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const Deck = () => {
  // retrieve list of cards

  const [cards, setCards] = useState<{ id: string }[]>([]);
  const [prevCardQuestionEmpty, setPrevCardQuestionEmpty] = useState(true);

  const addCard = () => {
    const id = Math.random().toString();

    setCards([...cards, { id }]);
  };

  return (
    <div className='flex relative h-[100%] ml-[100px] items-center'>
      <button
        className='flex add-card-btn w-100px flex-col justify-center items-center'
        onClick={addCard}
      >
        <span>+</span>
        <span>Write a Question</span>
      </button>
      <div className='flex flex-wrap justify-start h-5/6'>
        {cards.map((card, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
