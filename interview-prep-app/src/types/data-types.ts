export type CardData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  question: string;
  answer: string;
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
    description: string | null;
    unassigned: boolean;
    cards: CardData[];
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

export type DeckData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  thumbnail: string | null;
  description: string | null;
  cards: CardData[];
  unassigned: boolean;
};

export interface MockTemplateData {
  id: string;
  title: string;
  description: string;
  type: string;
  cards: MockTemplateCardData[];
  interviewId: string;
}

export type MockTemplateCardData = {
  cardId: string;
  templateId: string;
};

export interface InterviewData {
  id: string;
  company: string;
  jobPosition: string;
  expectedSalary?: string;
  jobDescription?: string;
  skills?: string;
  qualifications?: string;
  createdAt: string;
  updatedAt: string;
  mockTemplates: MockTemplateData[] | null;
}
