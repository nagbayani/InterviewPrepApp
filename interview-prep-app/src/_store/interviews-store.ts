import { create } from "zustand";
import { InterviewData } from "@/types/data-types";

interface InterviewState {
  interviews: Record<string, InterviewData>;
  setInterviews: (interviews: InterviewData[]) => void;
  addInterview: (interview: InterviewData) => void;
  updateInterview: (interviewId: string, data: Partial<InterviewData>) => void;
  deleteInterview: (interviewId: string) => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  interviews: {},

  /**
   * Sets all interviews in the store
   * @param interviews
   * @returns
   */
  setInterviews: (interviews) =>
    set(() => ({
      interviews: Array.isArray(interviews)
        ? interviews.reduce(
            (acc, interview) => ({
              ...acc,
              [interview.id]: interview,
            }),
            {}
          )
        : {},
    })),

  /**
   * Adds a new interview to the store
   * @param interview
   * @returns
   */
  addInterview: (interview: InterviewData) =>
    set((state) => ({
      interviews: {
        ...state.interviews,
        [interview.id]: interview,
      },
    })),

  /**
   * Updates an existing interview in the store
   * @param interviewId
   * @param data
   * @returns
   */
  updateInterview: (interviewId, data) =>
    set(
      (state) => (
        console.log("ZUSTAND UPDATE INTERVIEW ID", interviewId),
        console.log("ZUSTAND UPDATE INTERVIEW DATA", data),
        {
          interviews: {
            ...state.interviews,
            [interviewId]: {
              ...state.interviews[interviewId],
              ...data,
            },
          },
        }
      )
    ),

  /**
   * Deletes an interview by its ID
   * @param interviewId
   * @returns
   */
  deleteInterview: (interviewId: string) =>
    set((state) => {
      const updatedInterviews = { ...state.interviews };
      delete updatedInterviews[interviewId]; // Remove the interview from the state
      return { interviews: updatedInterviews };
    }),
}));
