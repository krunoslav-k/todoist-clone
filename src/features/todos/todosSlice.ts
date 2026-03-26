import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type Todo from "../../types/todo";
import { dummyData } from "../../data/dummyData";
import { arrayMove } from "@dnd-kit/sortable";

const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState({
  ids: dummyData.map((todo) => todo.id),
  entities: Object.fromEntries(dummyData.map((todo) => [todo.id, todo])),
});

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

    reorderTodos: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>,
    ) => {
      const { oldIndex, newIndex } = action.payload;
      state.ids = arrayMove(state.ids, oldIndex, newIndex);
    },
  },
});

export const { addTodo, removeTodo, updateTodo, reorderTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
