import React, { useState } from "react";
import { useDeckStore } from "@/_store/index";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DeckData, CardData } from "@/types/data-types";
import { ChevronLeft } from "lucide-react";

import "../../../../styles/interviews/select-questions.css";

interface SelectQuestionsProps {
  selectedCardsByDeck: Record<string, Record<string, boolean>>;
  setSelectedCardsByDeck: React.Dispatch<
    React.SetStateAction<Record<string, Record<string, boolean>>>
  >;
}

const SelectQuestions = ({
  selectedCardsByDeck,
  setSelectedCardsByDeck,
}: SelectQuestionsProps) => {
  const [selectedDeck, setSelectedDeck] = useState<DeckData | null>(null);

  const { decks } = useDeckStore((state) => ({
    decks: state.decks,
  }));

  const handleDeckSelect = (deck: DeckData) => {
    setSelectedDeck(deck);
  };

  const handleCardSelect = (deckId: string, cardId: string) => {
    setSelectedCardsByDeck((prev) => ({
      ...prev,
      [deckId]: {
        ...prev[deckId],
        [cardId]: !prev[deckId]?.[cardId],
      },
    }));
  };

  const handleBackClick = () => {
    setSelectedDeck(null);
  };

  return (
    <div className='select-questions-container'>
      {selectedDeck ? (
        <div className='deck-cards-view'>
          <Button variant='textIcon' onClick={handleBackClick}>
            <ChevronLeft size={12} />
            <span>Back</span>
          </Button>
          <h2 className='text-2xl mt-4'>{selectedDeck.title}</h2>
          <ul className='cards-list gap-4'>
            {selectedDeck.cards.map((card: CardData) => (
              <li key={card.id} className='flex my-2 gap-2 items-start'>
                <Checkbox
                  id={card.id}
                  checked={!!selectedCardsByDeck[selectedDeck.id]?.[card.id]}
                  onCheckedChange={() =>
                    handleCardSelect(selectedDeck.id, card.id)
                  }
                  className='mt-1'
                />
                <label htmlFor={card.id}>{card.question}</label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='decks-view'>
          {/* <h2>Select a Deck</h2> */}
          <ul className='flex-col'>
            {Object.values(decks).map((deck: DeckData) => (
              <li key={deck.id} className='w-full'>
                <Button
                  variant='ghost'
                  onClick={() => handleDeckSelect(deck)}
                  className='w-full'
                >
                  {deck.title}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectQuestions;
