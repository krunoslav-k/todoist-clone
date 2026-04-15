import { updateTodo } from "../slices/todosSlice";
import type { Priority } from "../types/todo";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

function useTodoActions(todoId: number) {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.entities);

  function setDueDate(date: Date) {
    dispatch(updateTodo({ id: todoId, changes: { dueDate: date } }));
  }

  function removeDueDate() {
    dispatch(updateTodo({ id: todoId, changes: { dueDate: undefined } }));
  }

  function setPriority(priority: Priority) {
    dispatch(updateTodo({ id: todoId, changes: { priority } }));
  }

  function toggleReminder() {
    const todo = todos[todoId];

    if (!todo) return;

    dispatch(
      updateTodo({
        id: todoId,
        changes: { hasReminder: !todo.hasReminder },
      }),
    );
  }

  function addLabel(label: string) {
    const todo = todos[todoId];
    if (!todo) return;

    const labels = todo.labels ?? [];

    if (labels.includes(label)) return;

    dispatch(
      updateTodo({
        id: todoId,
        changes: {
          labels: [...labels, label],
        },
      }),
    );
  }

  return {
    setDueDate,
    removeDueDate,
    setPriority,
    toggleReminder,
    addLabel,
  };
}

export default useTodoActions;
