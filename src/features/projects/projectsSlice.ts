import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { dummyProjects } from "../../data/dummyProjects";

const initialState = {
  projects: dummyProjects,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<string>) {
      state.projects.push(action.payload);
    },

    removeProject(state, action: PayloadAction<string>) {
      if (state.projects.includes(action.payload)) {
        state.projects = state.projects.filter(
          (project) => project !== action.payload,
        );
      }
    },
  },
});

export const { addProject, removeProject } = projectsSlice.actions;

export default projectsSlice.reducer;
