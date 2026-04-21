import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { dummyProjects } from "../data/dummyProjects";

const initialState = {
  projects: dummyProjects,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: {
      reducer(state, action: PayloadAction<{ name: string; id: string }>) {
        state.projects.push(action.payload);
      },
      prepare(name: string) {
        return {
          payload: {
            name,
            id: nanoid(),
          },
        };
      },
    },

    removeProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
    },
  },
});

export const { addProject, removeProject } = projectsSlice.actions;

export default projectsSlice.reducer;
