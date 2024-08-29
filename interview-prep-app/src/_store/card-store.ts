import { create } from "zustand";
import { CardData } from "@/types/data-types";

// state types
interface CardState {
  cards: Record<string, CardData>;
  updateCard: (cardId: string, data: Partial<CardData>) => void;
  setCards: (cards: CardData[]) => void;
  addCard: (card: CardData) => void;
  deleteCard: (cardId: string) => void;
}

export const useCardStore = create<CardState>((set) => ({
  cards: {},
  /**
   * Updates a specific card in the store
   * @param cardId
   * @param data
   * @returns
   */
  updateCard: (cardId, data) =>
    set(
      (state) => (
        console.log("Updating card with ID: ", cardId),
        {
          cards: {
            ...state.cards,
            [cardId]: {
              ...state.cards[cardId],
              ...data,
            },
          },
        }
      )
    ),

  /**
   * Adds a card to the store
   * @param card
   * @returns
   */
  addCard: (card: CardData) =>
    set(
      (state) => (
        console.log("Adding card: ", card),
        {
          cards: {
            ...state.cards,
            [card.id]: card,
          },
        }
      )
    ),

  /**
   *  Sets all cards in the store
   * @param cards
   * @returns
   */
  setCards: (cards) =>
    set(() => ({
      cards: cards.reduce(
        (acc, card) => ({
          ...acc,
          [card.id]: card,
        }),
        {}
      ),
    })),
  deleteCard: (cardId: string) =>
    set((state) => {
      const newCards = { ...state.cards };
      delete newCards[cardId];
      return { cards: newCards };
    }),
}));
