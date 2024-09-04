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
  MockTemplateCardData,
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

  const {
    mockTemplates: mockTemplatesData,
    mockTemplateCards,
    setMockTemplates,
    setMockTemplateCards,
  } = useMockTemplateStore((state) => ({
    mockTemplates: state.mockTemplates,
    setMockTemplates: state.setMockTemplates,
    setMockTemplateCards: state.setMockTemplateCards,
    mockTemplateCards: state.mockTemplateCards,
  }));

  useEffect(() => {
    setDecks(decks);
    setCards(cards);
    setTags(tags);
    setMockTemplates(mockTemplates);
    setInterviews(interviews);

    // Extract mockTemplateCards from the mockTemplates
    // Flatten the mockTemplateCards across all templates
    const mockTemplateCards = mockTemplates.flatMap((template) =>
      template.cards.map((card) => ({
        templateId: template.id,
        cardId: card.cardId,
      }))
    );
    setMockTemplateCards(mockTemplateCards); // Set mockTemplateCards in Zustand store
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

  useEffect(() => {
    // console.log("New Decks in store: ", decksData);
    // console.log("New Cards in store: ", cardsData);
    // console.log("New Tags in store: ", tagsData);
    console.log("New Mock Templates in store: ", mockTemplatesData);
    console.log("Mock Template Cards in store: ", mockTemplateCards);
    // console.log("New Interviews in store: ", interviewsData);
  }, [decksData, cardsData, tagsData, mockTemplatesData]);

  return null;
};

export default HydrateDashboard;
