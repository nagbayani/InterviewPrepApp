"use client";
import { useEffect } from "react";
import { useDeckStore, useCardStore, useTagStore } from "@/_store";
import { useMockTemplateStore } from "./mock-store";
import { useInterviewStore } from "./interviews-store";
import {
  DeckData,
  CardData,
  TagData,
  MockTemplateData,
  InterviewData,
} from "@/types/data-types";
import { set } from "zod";

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
  interviews: InterviewData[];
}

const HydrateDashboard = ({
  decks,
  cards,
  tags,
  mockTemplates,
  interviews,
}: HydrateDashboardProps) => {
  // const setDecks = useDeckStore((state) => state.setDecks);
  const { interviews: interviewsData, setInterviews } = useInterviewStore(
    (state) => ({
      interviews: state.interviews,
      setInterviews: state.setInterviews,
    })
  );
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
    setInterviews(interviews);
  }, [
    decks,
    cards,
    tags,
    mockTemplates,
    interviews,
    setDecks,
    setCards,
    setTags,
    setMockTemplates,
    setInterviews,
  ]);

  // useEffect(() => {
  //   console.log("New Decks in store: ", decksData);
  //   console.log("New Cards in store: ", cardsData);
  //   console.log("New Tags in store: ", tagsData);
  //   console.log("New Mock Templates in store: ", mockTemplatesData);
  // }, [decksData, cardsData, tagsData, mockTemplatesData]);

  return null;
};

export default HydrateDashboard;
