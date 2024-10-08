// questions-slice.ts
import { StateCreator } from "zustand";

export type Question = {
  id: string;
  text: string;
  tags?: string[]; // Optional
};

export type QuestionsSlice = {
  importedQuestions: Question[];
  generatedQuestions: Question[];
  questionBank: Question[];
  addImportedQuestion: (question: Question) => void;
  addGeneratedQuestion: (question: Question) => void;
  removeImportedQuestion: (questionId: string) => void;

  resetQuestions: () => void;
};

const createQuestionsSlice: StateCreator<QuestionsSlice> = (set) => ({
  importedQuestions: [],
  generatedQuestions: [],
  questionBank: [],

  addImportedQuestion: (question) =>
    set((state) => ({
      importedQuestions: [...state.importedQuestions, question],
      questionBank: [...state.questionBank, question], // Add to question bank as well
    })),

  addGeneratedQuestion: (question) =>
    set((state) => ({
      generatedQuestions: [...state.generatedQuestions, question],
      questionBank: [...state.questionBank, question], // Add to question bank as well
    })),

  removeImportedQuestion: (questionId) =>
    set((state) => ({
      importedQuestions: state.importedQuestions.filter(
        (q) => q.id !== questionId
      ),
      questionBank: state.questionBank.filter((q) => q.id !== questionId), // Remove from question bank
    })),

  resetQuestions: () =>
    set(() => ({
      importedQuestions: [],
      generatedQuestions: [],
      questionBank: [],
    })),
});

export default createQuestionsSlice;
