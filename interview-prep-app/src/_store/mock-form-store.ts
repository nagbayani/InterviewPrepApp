import createStepSlice, { StepSlice } from "./mock-form-slices/step-slice";
import createSubmitFormSlice, {
  SubmitFormSlice,
} from "./mock-form-slices/submit-form-slice";
import createMockFormSlice, {
  MockFormSlice,
} from "./mock-form-slices/mock-type-slice";
import { create } from "zustand";
import createQuestionsSlice, {
  QuestionsSlice,
} from "./mock-form-slices/questions-slice"; // Import the new slice
import createQuestionsOrganizationSlice, {
  QuestionsOrganizationSlice,
} from "./mock-form-slices/questions-organization-slice";
import createIndustrySlice, {
  IndustrySlice,
} from "./mock-form-slices/mock-industry-slice";

const useMockFormStore = create<
  StepSlice &
    SubmitFormSlice &
    MockFormSlice &
    QuestionsSlice &
    QuestionsOrganizationSlice &
    IndustrySlice
>()((...a) => ({
  ...createStepSlice(...a),
  ...createSubmitFormSlice(...a),
  ...createMockFormSlice(...a),
  ...createQuestionsSlice(...a),
  ...createQuestionsOrganizationSlice(...a),
  ...createIndustrySlice(...a),
}));

export default useMockFormStore;
