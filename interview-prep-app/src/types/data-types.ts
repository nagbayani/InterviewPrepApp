import { StringValidation } from "zod";

export type CardData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  question: string;
  answer: string;
  category: string;
  authorId: string;
  deckId: string;
  tags: CardTagData[] | null;
};

export type CardTagData = {
  cardId: string;
  tagId: string;
};

export interface DeckDataResponse {
  deck: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
  };
  cards: {
    id: string;
    createdAt: string;
    updatedAt: string;
    question: string;
    answer: string;
    category: string;
    authorId: string;
    deckId: string;
    tags: string[] | null;
  }[];
}

export interface DeckData {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  // authorId: string;
}
