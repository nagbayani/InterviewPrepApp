"use client";
import { useEffect } from "react";
import { useDeckStore, useCardStore, useTagStore } from "@/_store";
import { DeckData, CardData, TagData, CardTagData } from "@/types/data-types";

interface HydrateStoreProps {
  // decks: DeckData[];
  cards: CardData[];
  tags: TagData[];
  cardTags: CardTagData[];
}

const HydrateStore = ({ tags, cardTags, cards }: HydrateStoreProps) => {
  const setDecks = useDeckStore((state) => state.setDecks);
  const setCards = useCardStore((state) => state.setCards);
  const setTags = useTagStore((state) => state.setTags);
  const setCardTags = useTagStore((state) => state.setCardTags);

  useEffect(() => {
    setTags(tags);
    setCardTags(cardTags);
    setCards(cards);
  }, [tags, cardTags, setTags, setCardTags, cards, setCards]);

  return null;
};

export default HydrateStore;
