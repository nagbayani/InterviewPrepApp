import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CardData } from "@/types/CardData";

// state types
interface CardState {
  cards: Record<string, CardData>;
  updateCard: (cardId: string, data: Partial<CardData>) => void;
  setCards: (cards: CardData[]) => void;
}

// action types
interface Actions {}


export const useCardStore = create<CardState>((set) => ({
  cards: {},
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
}));

// useBearStore
/*
export const useBearStore = create(
  persist<States & Actions>(
    (set) => ({
      bears: 0,

      increase: () => set((state) => ({ bears: state.bears + 1 })),
      decrease: () => set((state) => ({ bears: state.bears - 1 })),
    }),
    {
      name: 'bearStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
*/
