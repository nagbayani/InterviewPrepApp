import { StateCreator } from "zustand";
import { mockInterviewStages } from "@/lib/mock-type-stages";

type MockTypeKeys = keyof typeof mockInterviewStages;

type MockForm = {
  title: string;
  description: string;
  type: MockTypeKeys | "";
  stages: Array<{ label: string; description: string }>; // Add mock stages to MockForm
};

type MockFormSlice = {
  mockForm: MockForm;
  setMockForm: (data: Partial<MockForm>) => void;
  resetMockForm: () => void;
};

const initialMockFormState: MockForm = {
  title: "",
  description: "",
  type: "",
  stages: [],
};

// Set the initial state of the mock form to include the stages
const createMockFormSlice: StateCreator<MockFormSlice> = (set) => ({
  mockForm: initialMockFormState,
  setMockForm: (data) =>
    set((state) => ({
      mockForm: {
        ...state.mockForm,
        ...data,
        stages: data.type
          ? mockInterviewStages[data.type] || []
          : state.mockForm.stages, // include stages in the state
      },
    })),
  resetMockForm: () => set(() => ({ mockForm: initialMockFormState })),
});

export default createMockFormSlice;
export type { MockForm, MockFormSlice };
