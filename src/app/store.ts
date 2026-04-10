import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../slices/todosSlice";
import labelsReducer from "../slices/labelsSlice";
import projectsReducer from "../slices/projectsSlice";
import sectionsReducer from "../slices/sectionsSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    labels: labelsReducer,
    projects: projectsReducer,
    sections: sectionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
