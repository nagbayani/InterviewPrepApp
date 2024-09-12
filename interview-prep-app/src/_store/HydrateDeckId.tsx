"use client";
import { useEffect } from "react";
import { useDeckStore, useCardStore, useTagStore } from "@/_store";
import { DeckData, CardData, TagData, CardTagData } from "@/types/data-types";

interface HydrateStoreProps {
  // decks: DeckData[];
  // cards: CardData[];
  tags: TagData[];
  cardTags: CardTagData[];
}

const HydrateStore = ({ tags, cardTags }: HydrateStoreProps) => {
  const setTags = useTagStore((state) => state.setTags);
  const setCardTags = useTagStore((state) => state.setCardTags);

  useEffect(() => {
    setTags(tags);
    setCardTags(cardTags);
  }, [tags, cardTags, setTags, setCardTags]);

  return null;
};

export default HydrateStore;
