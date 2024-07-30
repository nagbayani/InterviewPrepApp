import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CardData, DeckData, TagData } from "@/types/data-types";
import { StringifyOptions } from "querystring";

// State for Tags (Cards)
interface TagState {
  tags: Record<string, TagData>;
  updateTag: (tagId: string, data: Partial<TagData>) => void;
  setTags: (tags: TagData[]) => void;
  addTag: (tag: TagData) => void;
  deleteTag: (tagId: string) => void;
}

export const useTagStore = create<TagState>((set) => ({
  tags: {},
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
  deleteTag: (tagId: string) =>
    set((state) => {
      const newTags = { ...state.tags };
      delete newTags[tagId];
      return { tags: newTags };
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
}));
