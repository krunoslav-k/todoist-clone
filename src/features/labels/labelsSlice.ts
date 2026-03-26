import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { dummyLabels } from "../../data/dummyLabels";

interface LabelsState {
  labels: string[];
}

const initialState: LabelsState = {
  labels: dummyLabels,
};

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    addLabel(state, action: PayloadAction<string>) {
      state.labels.push(action.payload);
    },
    removeLabel(state, action: PayloadAction<string>) {
      if (state.labels.includes(action.payload)) {
        state.labels = state.labels.filter((label) => label !== action.payload);
      }
    },
  },
});

export const { addLabel } = labelsSlice.actions;

export default labelsSlice.reducer;
