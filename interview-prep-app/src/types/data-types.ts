export type FeedbackPoint = {
  point: string;
  explanation: string;
};

export type Feedback = {
  strengths: FeedbackPoint[];
  weaknesses: FeedbackPoint[];
  tipsForImprovement: FeedbackPoint[];
};

export type CardData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  question: string;
  answer: string;
  authorId: string;
  deckId: string;
  tags: TagData[] | null;
  feedback?: string;
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
    cards: CardData[];
  };
  unassignedDeck: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    thumbnail: string | null;
    description: string | null;
    cards: CardData[];
  } | null;
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
  interviewStage?: InterviewStageData | null; // One-to-one relation with InterviewStage
}

export type MockTemplateCardData = {
  cardId: string;
  templateId: string;
  stage: string;
  order: number;
};

export interface InterviewData {
  id: string;
  company: string;
  jobPosition: string;
  expectedSalary?: string;
  jobDescription?: string;
  skills?: string;
  qualifications?: string;
  location?: string;
  dateApplied?: string; // DateTime in Prisma, converted to string for TypeScript
  dateFollowUp?: string; // DateTime in Prisma, converted to string for TypeScript
  status?: string;
  createdAt: string; // DateTime in Prisma, stored as string in TypeScript
  updatedAt: string; // DateTime in Prisma, stored as string in TypeScript
  mockTemplates: MockTemplateData[] | null;
  interviewStages: InterviewStageData[] | null;
}

// Data type for the InterviewStage
export interface InterviewStageData {
  id: string;
  stageDate?: string; // DateTime in Prisma, stored as string in TypeScript
  format?: string;
  type?: string;
  mockTemplateId?: string; // One-to-one relationship with MockTemplate
  createdAt: string; // DateTime in Prisma, stored as string in TypeScript
  updatedAt: string; // DateTime in Prisma, stored as string in TypeScript
}
