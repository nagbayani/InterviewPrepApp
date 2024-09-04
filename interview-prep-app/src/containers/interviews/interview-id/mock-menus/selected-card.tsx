import React from "react";
import { CardData } from "@/types/data-types";

interface SelectedCardProps {
  card: CardData;
}

const SelectedCard = ({ card }: SelectedCardProps) => {
  return (
    <div className='border border-black rounded-md p-4 gap-4 bg-white shadow-sm'>
      <strong className='text-lg'>{card.question}</strong>
    </div>
  );
};

export default SelectedCard;
