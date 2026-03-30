import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import labelsReducer from "../features/labels/labelsSlice";
import projectsReducer from "../features/projects/projectsSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    labels: labelsReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
