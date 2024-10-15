import { StateCreator } from "zustand";
import { mockInterviewLookup } from "@/lib/mock-interviews";

type IndustryKeys = keyof typeof mockInterviewLookup;

type IndustryInterviewForm = {
  industry: IndustryKeys | ""; // Tracks the selected industry
  interviewType: string | ""; // Tracks the selected interview type
  availableInterviews: Array<{
    value: string;
    label: string;
    purpose: string;
    description: string;
  }>; // Available interviews based on the selected industry
};

type IndustrySlice = {
  industryForm: IndustryInterviewForm;
  setIndustryForm: (data: Partial<IndustryInterviewForm>) => void;
  resetIndustryForm: () => void;
};

const initialIndustryFormState: IndustryInterviewForm = {
  industry: "",
  interviewType: "",
  availableInterviews: [],
};

// Create the slice to manage industry and interview type selection
const createIndustrySlice: StateCreator<IndustrySlice> = (set) => ({
  industryForm: initialIndustryFormState,
  setIndustryForm: (data) =>
    set((state) => ({
      industryForm: {
        ...state.industryForm,
        ...data,
        availableInterviews: data.industry
          ? mockInterviewLookup[data.industry] || []
          : state.industryForm.availableInterviews, // Updates available interviews when industry changes
      },
    })),
  resetIndustryForm: () =>
    set(() => ({ industryForm: initialIndustryFormState })),
});

export default createIndustrySlice;
export type { IndustrySlice, IndustryInterviewForm };
