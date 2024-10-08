import { StateCreator } from "zustand";
import { Question } from "./questions-slice"; // Import the Question type
import { mockInterviewStages } from "@/lib/mock-type-stages"; // Assuming this file contains your mock interview stages

// Stage type to represent each stage with its questions
export type Stage = {
  stageLabel: string; // The label of the stage (e.g., "Introduction", "Technical")
  description?: string; // Optional description of the stage
  questions: Question[]; // Array of questions in this stage
};

export type QuestionsOrganizationSlice = {
  stageQuestions: Stage[]; // Array of stages holding questions
  addQuestionToStage: (stageLabel: string, question: Question) => void; // Add question to a specific stage
  removeQuestionFromStage: (stageLabel: string, questionId: string) => void; // Remove question from a stage
  setStageQuestions: (stages: Stage[]) => void; // Set the entire stages array with questions
  resetStageQuestions: () => void; // Reset all stages
  setOrderedQuestionsForStage: (
    stageLabel: string,
    orderedQuestions: Question[]
  ) => void; // Set the questions in a specific order for a stage
};

const createQuestionsOrganizationSlice: StateCreator<
  QuestionsOrganizationSlice
> = (set) => ({
  stageQuestions: [], // Initialize as an empty array of stages

  addQuestionToStage: (stageLabel, question) =>
    set((state) => {
      // Check if the stage exists
      const stageExists = state.stageQuestions.find(
        (stage) => stage.stageLabel === stageLabel
      );

      if (stageExists) {
        // If the stage exists, add the question to the existing stage
        return {
          stageQuestions: state.stageQuestions.map((stage) =>
            stage.stageLabel === stageLabel
              ? { ...stage, questions: [...stage.questions, question] }
              : stage
          ),
        };
      } else {
        // If the stage doesn't exist, create a new stage with the question
        return {
          stageQuestions: [
            ...state.stageQuestions,
            { stageLabel, questions: [question] },
          ],
        };
      }
    }),

  removeQuestionFromStage: (stageLabel, questionId) =>
    set((state) => ({
      stageQuestions: state.stageQuestions.map((stage) =>
        stage.stageLabel === stageLabel
          ? {
              ...stage,
              questions: stage.questions.filter((q) => q.id !== questionId),
            }
          : stage
      ),
    })),

  setStageQuestions: (stages) => set(() => ({ stageQuestions: stages })),

  resetStageQuestions: () => set(() => ({ stageQuestions: [] })),
  // New function to set the questions in a particular order for a specific stage
  setOrderedQuestionsForStage: (
    stageLabel: string,
    orderedQuestions: Question[]
  ) =>
    set((state) => ({
      stageQuestions: state.stageQuestions.map((stage) =>
        stage.stageLabel === stageLabel
          ? { ...stage, questions: orderedQuestions }
          : stage
      ),
    })),
});

export default createQuestionsOrganizationSlice;
