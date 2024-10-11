import { create, StateCreator } from "zustand";

type Question = {
  id: string;
  order: number;
};

type Stage = {
  title: string;
  description: string;
  questions: Question[];
};

export type ProgressSlice = {
  currentStageIndex: number; // Track the current stage
  currentQuestionIndex: number; // Track the current question in the stage
  stages: Stage[]; // List of stages with questions (use a flexible type, can adjust as needed)
  completedStages: any[]; // Store completed stages for review or summary
  isInterviewVisible: boolean; // To handle visibility of the interview
  isInterviewComplete: boolean; // Track interview completion
  // Methods to control the flow of the interview
  setStages: (stages: Stage[]) => void; // Initialize stages to keep track
  goToNextQuestion: () => void; // Method to progress to the next question
  goToPrevQuestion: () => void; // Method to move back to the previous question
  goToNextStage: () => void; // Move to the next stage
  goToPrevStage: () => void; // Move to the previous stage
  onStartInterview: (isInterviewVisible: boolean) => void;
  onInterviewComplete: (isInterviewVisible: boolean) => void; // Handle interview completion
};

const createProgressSlice: StateCreator<ProgressSlice> = (set, get) => ({
  currentStageIndex: 0,
  currentQuestionIndex: 0,
  stages: [], // List of stages with questions
  completedStages: [], // Store completed stages
  isInterviewVisible: false, // Interview is visible initially
  isInterviewComplete: false, // Interview is not complete initially

  // Initialize the stages
  setStages: (stages: any[]) => {
    set({ stages });
  },

  // Method to move to the next question
  goToNextQuestion: () => {
    const { currentStageIndex, currentQuestionIndex, stages } = get();
    const currentStage = stages[currentStageIndex];

    if (currentQuestionIndex < currentStage.questions.length - 1) {
      // Move to the next question within the stage
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    } else {
      // If all questions in the stage are completed, move to the next stage
      get().goToNextStage();
    }
  },

  // Method to move to the previous question
  goToPrevQuestion: () => {
    const { currentStageIndex, currentQuestionIndex } = get();

    if (currentQuestionIndex > 0) {
      // Move to the previous question in the same stage
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    } else if (currentStageIndex > 0) {
      // If at the start of a stage, move to the last question of the previous stage
      get().goToPrevStage();
    }
  },

  // Method to move to the next stage
  goToNextStage: () => {
    const { currentStageIndex, stages, completedStages } = get();

    if (currentStageIndex < stages.length - 1) {
      // Mark the current stage as completed
      set({
        completedStages: [...completedStages, stages[currentStageIndex]],
        currentStageIndex: currentStageIndex + 1, // Move to the next stage
        currentQuestionIndex: 0, // Reset question index for the new stage
      });
    } else {
      // If all stages are completed, mark the interview as complete
      set({ isInterviewComplete: true });
    }
  },

  // Method to move to the previous stage
  goToPrevStage: () => {
    const { currentStageIndex, stages } = get();

    if (currentStageIndex > 0) {
      // Move to the previous stage
      set({
        currentStageIndex: currentStageIndex - 1,
        currentQuestionIndex:
          stages[currentStageIndex - 1].questions.length - 1, // Move to the last question of the previous stage
      });
    }
  },

  onStartInterview(isInterviewVisible) {
    set({ isInterviewVisible: true });
  },

  // Method to handle interview completion visibility
  onInterviewComplete: (isInterviewVisible: boolean) => {
    set({ isInterviewVisible });
  },
});

export default createProgressSlice;
