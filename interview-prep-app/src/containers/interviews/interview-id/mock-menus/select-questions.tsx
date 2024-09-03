import React, { useState } from "react";
import { useDeckStore } from "@/_store/index";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DeckData, CardData } from "@/types/data-types";
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
          <Button variant='outline' onClick={handleBackClick}>
            Back to Decks
          </Button>
          <h2>{selectedDeck.title}</h2>
          <ul className='cards-list'>
            {selectedDeck.cards.map((card: CardData) => (
              <li key={card.id}>
                <Checkbox
                  id={card.id}
                  checked={!!selectedCardsByDeck[selectedDeck.id]?.[card.id]}
                  onCheckedChange={() =>
                    handleCardSelect(selectedDeck.id, card.id)
                  }
                />
                <label htmlFor={card.id}>{card.question}</label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='decks-view'>
          <h2>Select a Deck</h2>
          <ul className='decks-list'>
            {Object.values(decks).map((deck: DeckData) => (
              <li key={deck.id}>
                <Button variant='ghost' onClick={() => handleDeckSelect(deck)}>
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
