import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type Todo from "../../types/todo";

const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState();

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id">>) => {
      todosAdapter.addOne(state, { id: Date.now(), ...action.payload });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      todosAdapter.removeOne(state, action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; changes: Partial<Todo> }>,
    ) => {
      todosAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload.changes,
      });
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
