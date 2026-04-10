import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { dummySections } from "../data/dummySections";

const initialState = {
  sections: dummySections,
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    addSection(
      state,
      action: PayloadAction<{ name: string; projectId: string }>,
    ) {
      state.sections.push({
        id: nanoid(),
        name: action.payload.name,
        projectId: action.payload.projectId,
      });
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
