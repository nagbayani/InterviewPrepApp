"use client";
import { useEffect } from "react";
import { useDeckStore, useCardStore } from "@/_store";
import { DeckData, CardData } from "@/types/data-types";

interface HydrateStoreProps {
  decks: DeckData[];
  // cards: CardData[];
  cards: CardData[];
}

const HydrateStore = ({ decks, cards }: HydrateStoreProps) => {
  const setDecks = useDeckStore((state) => state.setDecks);
  const setCards = useCardStore((state) => state.setCards);

  useEffect(() => {
    setDecks(decks);
    setCards(cards);
    console.log("New Cards set in store: ", decks);
    console.log("New Decks set in store: ", cards);
  }, [decks, cards, setDecks, setCards]);

  return null;
};

export default HydrateStore;
