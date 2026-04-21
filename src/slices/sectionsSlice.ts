import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { dummySections } from "../data/dummySections";
import type Section from "../types/section";

const initialState = {
  sections: dummySections,
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    addSection: {
      reducer(state, action: PayloadAction<Section>) {
        state.sections.push(action.payload);
      },
      prepare(name: string, projectId: string) {
        return {
          payload: {
            id: nanoid(),
            name,
            projectId,
          },
        };
      },
    },

    removeSection(state, action: PayloadAction<string>) {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload,
      );
    },
  },
});

export const { addSection, removeSection } = sectionsSlice.actions;

export default sectionsSlice.reducer;
