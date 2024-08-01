"use client";
import { useEffect } from "react";
import { useDeckStore, useCardStore, useTagStore } from "@/_store";
import { DeckData, CardData, TagData, CardTagData } from "@/types/data-types";

interface HydrateStoreProps {
  decks: DeckData[];
  // cards: CardData[];
  cards: CardData[];
  tags: TagData[];
  cardTags: CardTagData[];
}

const HydrateStore = ({ decks, cards, tags, cardTags }: HydrateStoreProps) => {
  const setDecks = useDeckStore((state) => state.setDecks);
  const setCards = useCardStore((state) => state.setCards);
  const setTags = useTagStore((state) => state.setTags);
  const setCardTags = useTagStore((state) => state.setCardTags);

  useEffect(() => {
    setDecks(decks);
    setCards(cards);
    setTags(tags);
    setCardTags(cardTags);
    
    console.log("New Cards set in store: ", decks);
    console.log("New Decks set in store: ", cards);
  }, [decks, cards, tags, cardTags, setDecks, setCards, setTags, setCardTags]);

  return null;
};

export default HydrateStore;
