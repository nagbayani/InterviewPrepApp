import { create } from "zustand";
import createProgressSlice, { ProgressSlice } from "./slices/progress-slice";

const useMockSimulationStore = create<ProgressSlice>()((...a) => ({
  ...createProgressSlice(...a),
}));

export default useMockSimulationStore;
