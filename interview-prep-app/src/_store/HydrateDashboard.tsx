"use client";
import { useEffect } from "react";
import { useDeckStore, useCardStore, useTagStore } from "@/_store";
import { useMockTemplateStore } from "./mock-store";
import {
  DeckData,
  CardData,
  TagData,
  MockTemplateData,
} from "@/types/data-types";

/**
 * Hydrate dashboard layout with:
 * - Decks
 * - Cards
 * - Tags
 * - Mock Templates
 * - Job Listings (future)
 */
interface HydrateDashboardProps {
  decks: DeckData[];
  cards: CardData[];
  tags: TagData[];
  mockTemplates: MockTemplateData[];
}

const HydrateDashboard = ({
  decks,
  cards,
  tags,
  mockTemplates,
}: HydrateDashboardProps) => {
  // const setDecks = useDeckStore((state) => state.setDecks);
  const { decks: decksData, setDecks } = useDeckStore((state) => ({
    decks: state.decks,
    addDeck: state.addDeck,
    setDecks: state.setDecks,
  }));

  const { cards: cardsData, setCards } = useCardStore((state) => ({
    cards: state.cards,
    setCards: state.setCards,
  }));

  const { tags: tagsData, setTags } = useTagStore((state) => ({
    tags: state.tags,
    setTags: state.setTags,
  }));

  const { mockTemplates: mockTemplatesData, setMockTemplates } =
    useMockTemplateStore((state) => ({
      mockTemplates: state.mockTemplates,
      setMockTemplates: state.setMockTemplates,
    }));

  useEffect(() => {
    setDecks(decks);
    setCards(cards);
    setTags(tags);
    setMockTemplates(mockTemplates);
  }, [
    decks,
    cards,
    tags,
    mockTemplates,
    setDecks,
    setCards,
    setTags,
    setMockTemplates,
  ]);

  useEffect(() => {
    console.log("New Decks in store: ", decksData);
    console.log("New Cards in store: ", cardsData);
    console.log("New Tags in store: ", tagsData);
    console.log("New Mock Templates in store: ", mockTemplatesData);
  }, [decksData, cardsData, tagsData, mockTemplatesData]);

  return null;
};

export default HydrateDashboard;
