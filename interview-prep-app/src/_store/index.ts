import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CardData, DeckData, TagData, CardTagData } from "@/types/data-types";
import { StringifyOptions } from "querystring";

// Zustand Store
interface TagState {
  tags: Record<string, TagData>; // A record of tags keyed by tag ID
  cardTags: Record<string, Record<string, CardTagData>>; // A nested record of card-tags, keyed by card ID and then tag ID
  updateTag: (tagId: string, data: Partial<TagData>) => void; // Updates a tag with new data
  setTags: (tags: TagData[]) => void; // Sets the entire tags state from an array of TagData
  setCardTags: (cardTags: CardTagData[]) => void; // Sets the entire cardTags state from an array of CardTagData
  addTag: (tag: TagData) => void; // Adds a new tag to the state
  deleteTag: (tagId: string) => void; // Deletes a tag from the state by its ID
  addCardTag: (cardTag: CardTagData) => void; // Adds a card-tag relationship to the state
  deleteCardTag: (cardId: string, tagId: string) => void; // Deletes a card-tag relationship from the state
}

export const useTagStore = create<TagState>((set) => ({
  // Initial state for tags and cardTags
  tags: {}, // Initialize tags as an empty object
  cardTags: {}, // Initialize cardTags as an empty object

  /**
   * Updates a tag with new data.
   * @param tagId - The ID of the tag to update.
   * @param data - Partial data to update the tag with.
   */
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

  /**
   * Adds a new tag to the state.
   * @param tag - The TagData object to add.
   */
  addTag: (tag: TagData) =>
    set((state) => ({
      tags: {
        ...state.tags,
        [tag.id]: tag,
      },
    })),

  /**
   * Sets the entire tags state from an array of TagData.
   * @param tags - An array of TagData objects.
   */
  setTags: (tags) =>
    set(() => ({
      tags: Array.isArray(tags)
        ? tags.reduce(
            (acc, tag) => ({
              ...acc,
              [tag.id]: tag,
            }),
            {}
          )
        : {}, // Return an empty object if tags is not an array
    })),

  /**
   * Sets the entire cardTags state from an array of CardTagData.
   * @param cardTags - An array of CardTagData objects.
   */
  setCardTags: (cardTags) => {
    // Reduce the array into a nested record of cardTags
    const cardTagRecord = cardTags.reduce((acc, cardTag) => {
      if (!acc[cardTag.cardId]) {
        // Initialize the nested object for the cardId if it doesn't exist
        acc[cardTag.cardId] = {};
      }
      // Assign the cardTag to the nested object under cardId and tagId
      acc[cardTag.cardId][cardTag.tagId] = cardTag;
      return acc;
    }, {} as Record<string, Record<string, CardTagData>>);

    // Update the state with the new cardTags record
    set({ cardTags: cardTagRecord });
  },

  /**
   * Deletes a tag from the state by its ID.
   * @param tagId - The ID of the tag to delete.
   */
  deleteTag: (tagId: string) =>
    set((state) => {
      // Create a shallow copy of the tags
      const newTags = { ...state.tags };
      // Delete the tag with the specified tagId
      delete newTags[tagId];
      // Return the new state with updated tags
      return { tags: newTags };
    }),

  /**
   * Adds a card-tag relationship to the state.
   * @param cardTag - The CardTagData object to add.
   */
  addCardTag: (cardTag: CardTagData) =>
    set((state) => {
      console.log("Adding card tag: ", cardTag);
      // Create a shallow copy of the current cardTags
      const newCardTags = { ...state.cardTags };
      // Initialize the nested object for the cardId if it doesn't exist
      if (!newCardTags[cardTag.cardId]) {
        newCardTags[cardTag.cardId] = {};
      }
      // Assign the cardTag to the nested object under cardId and tagId
      newCardTags[cardTag.cardId][cardTag.tagId] = cardTag;
      // Return the new state with updated cardTags
      return { cardTags: newCardTags };
    }),

  /**
   * Deletes a card-tag relationship from the state.
   * @param cardId - The ID of the card.
   * @param tagId - The ID of the tag.
   */
  deleteCardTag: (cardId: string, tagId: string) =>
    set((state) => {
      // Create a shallow copy of the current cardTags
      const newCardTags = { ...state.cardTags };
      // Check if the cardId exists in cardTags
      if (newCardTags[cardId]) {
        delete newCardTags[cardId][tagId];
        // If no tags are left under this cardId, delete the cardId
        if (Object.keys(newCardTags[cardId]).length === 0) {
          delete newCardTags[cardId];
        }
      }
      // Return the new state with updated cardTags
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

interface DeckState {
  decks: Record<string, DeckData>;
  updateDeck: (deckId: string, data: Partial<DeckData>) => void;
  setDecks: (decks: DeckData[]) => void;
  addDeck: (deck: DeckData) => void;
  deleteDeck: (deckId: string) => void;
  unassignedDeck: string | null; // To store only the unassigned deck's ID
  setUnassignedDeck: (deckId: string) => void; // Method to set the unassigned deck's ID
}

export const useDeckStore = create<DeckState>((set) => ({
  decks: {},
  unassignedDeck: null, // Initialize with null (no unassigned deck ID yet)

  /**
   * Sets the unassigned deck ID (only one deck can be unassigned)
   * @param deckId
   */
  setUnassignedDeck: (deckId: string) =>
    set(() => ({
      unassignedDeck: deckId,
    })),

  /**
   * Updates the deck by its ID with the new data
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
    set((state) => {
      const newDecks = Array.isArray(decks)
        ? decks.reduce(
            (acc, deck) => ({
              ...acc,
              [deck.id]: deck,
            }),
            {}
          )
        : {}; // Return an empty object if decks is not an array

      return {
        decks: newDecks,
      };
    }),

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
