import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CardData, DeckData, TagData, CardTagData } from "@/types/data-types";
import { StringifyOptions } from "querystring";

// Zustand Store
// State for Tags (Cards)
interface TagState {
  tags: Record<string, TagData>;
  cardTags: Record<string, Record<string, CardTagData>>;
  updateTag: (tagId: string, data: Partial<TagData>) => void;
  setTags: (tags: TagData[]) => void;
  setCardTags: (cardTags: CardTagData[]) => void;
  addTag: (tag: TagData) => void;
  deleteTag: (tagId: string) => void;
  addCardTag: (cardTag: CardTagData) => void;
  deleteCardTag: (cardId: string, tagId: string) => void;
}

export const useTagStore = create<TagState>((set) => ({
  tags: {},
  cardTags: {},
  updateTag: (tagId, data) =>
    set((state) => ({
      tags: {
        ...state.tags,
        [tagId]: {
          ...state.tags[tagId],
          ...data,
        },
      },
    })),
  addTag: (tag: TagData) =>
    set((state) => ({
      tags: {
        ...state.tags,
        [tag.id]: tag,
      },
    })),
  setTags: (tags) =>
    set(() => ({
      tags: tags.reduce(
        (acc, tag) => ({
          ...acc,
          [tag.id]: tag,
        }),
        {}
      ),
    })),
  setCardTags: (cardTags) => {
    const cardTagRecord = cardTags.reduce((acc, cardTag) => {
      if (!acc[cardTag.cardId]) {
        acc[cardTag.cardId] = {};
      }
      acc[cardTag.cardId][cardTag.tagId] = cardTag;
      return acc;
    }, {} as Record<string, Record<string, CardTagData>>);
    set({ cardTags: cardTagRecord });
  },
  deleteTag: (tagId: string) =>
    set((state) => {
      const newTags = { ...state.tags };
      delete newTags[tagId];
      return { tags: newTags };
    }),
  addCardTag: (cardTag: CardTagData) =>
    set((state) => {
      const newCardTags = { ...state.cardTags };
      if (!newCardTags[cardTag.cardId]) {
        newCardTags[cardTag.cardId] = {};
      }
      newCardTags[cardTag.cardId][cardTag.tagId] = cardTag;
      return { cardTags: newCardTags };
    }),
  deleteCardTag: (cardId: string, tagId: string) =>
    set((state) => {
      const newCardTags = { ...state.cardTags };
      if (newCardTags[cardId]) {
        delete newCardTags[cardId][tagId];
        if (Object.keys(newCardTags[cardId]).length === 0) {
          delete newCardTags[cardId];
        }
      }
      return { cardTags: newCardTags };
    }),
}));

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
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          ...data,
        },
      },
    })),

  /**
   * Adds a card to the store
   * @param card
   * @returns
   */
  addCard: (card: CardData) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [card.id]: card,
      },
    })),

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

interface DeckState {
  decks: Record<string, DeckData>;
  updateDeck: (deckId: string, data: Partial<DeckData>) => void;
  setDecks: (decks: DeckData[]) => void;
  addDeck: (deck: DeckData) => void;
  deleteDeck: (deckId: string) => void;
}

export const useDeckStore = create<DeckState>((set) => ({
  decks: {},

  /**
   *
   * @param deckId
   * @param data
   * @returns
   */
  updateDeck: (deckId, data) =>
    set((state) => ({
      decks: {
        ...state.decks,
        [deckId]: {
          ...state.decks[deckId],
          ...data,
        },
      },
    })),

  /**
   *
   * @param deck
   * @returns
   */
  addDeck: (deck: DeckData) =>
    set((state) => ({
      decks: {
        ...state.decks,
        [deck.id]: deck,
      },
    })),

  /**
   *
   * @param decks
   * @returns
   */
  setDecks: (decks) =>
    set(() => ({
      decks: decks.reduce(
        (acc, deck) => ({
          ...acc,
          [deck.id]: deck,
        }),
        {}
      ),
    })),
  /**
   * Deletes a deck by its ID
   * @param deckId
   */
  deleteDeck: (deckId) =>
    set((state) => {
      const updatedDecks = { ...state.decks };
      delete updatedDecks[deckId]; // Remove the deck from the state
      return { decks: updatedDecks };
    }),
}));
