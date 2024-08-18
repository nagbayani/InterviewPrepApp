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
  tags: TagData[] | null;
};

export type CardTagData = {
  cardId: string;
  tagId: string;
};

export type TagData = {
  id: string;
  name: string;
  color: string;
  authorId: string;
};

export interface DeckDataResponse {
  deck: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    thumbnail: string | null;
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
    tags: TagData[] | null;
  }[];
  tags: TagData[];
  cardTags: CardTagData[];
}

export interface DeckData {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  thumbnail: string | null;
  // authorId: string;
}

export type MockTemplateData = {
  id: string;
  title: string;
  description: string;
  cards: MockTemplateCardData[];
};

export type MockTemplateCardData = {
  cardId: string;
  templateId: string;
};
