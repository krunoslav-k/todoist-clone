import { useRef, useState } from "react";
import type Todo from "../types/todo";
import { useAppDispatch } from "./reduxHooks";
import { addTodo, updateTodo } from "../slices/todosSlice";
import type { Priority } from "../types/todo";
import useDropdown from "./useDropdown";

const EMPTY_TODO: Todo = {
  id: Date.now(),
  title: "",
  description: "",
  completed: false,
  dueDate: undefined,
  priority: 4,
  hasReminder: false,
  labels: [],
};

export default function useTodoForm(initialTodo?: Todo, onClose?: () => void) {
  const [todo, setTodo] = useState<Todo>(
    () => initialTodo ?? { ...EMPTY_TODO, id: Date.now() },
  );
  const titleRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { closeDropdown } = useDropdown();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!todo.title.trim()) return;

    if (initialTodo) {
      dispatch(updateTodo({ id: todo.id, changes: todo }));
    } else {
      dispatch(addTodo(todo));
    }

    setTodo({ ...EMPTY_TODO, id: Date.now() });
    onClose?.();
  }

  function updateField<K extends keyof Todo>(key: K, value: Todo[K]) {
    setTodo((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSelectDate(date: Date) {
    updateField("dueDate", date);
    closeDropdown();
  }

  function handleRemoveDate() {
    updateField("dueDate", undefined);
    closeDropdown();
  }

  function handlePrioritySelect(priority: Priority) {
    updateField("priority", priority);
    closeDropdown();
  }

  function handleToggleReminder() {
    updateField("hasReminder", !todo.hasReminder);
    closeDropdown();
  }

  function handleAddLabel(label: string) {
    const labels = todo.labels ?? [];
    if (labels.includes(label)) return;

    updateField("labels", [...labels, label]);
    closeDropdown();
  }

  function handleRemoveLabel(label: string) {
    updateField(
      "labels",
      (todo.labels ?? []).filter((l) => l !== label),
    );
  }
  function handleRemoveAllLabels() {
    updateField("labels", []);
  }

  return {
    todo,
    setTodo,
    updateField,

    titleRef,

    handleSubmit,
    handleSelectDate,
    handleRemoveDate,
    handlePrioritySelect,
    handleToggleReminder,
    handleAddLabel,
    handleRemoveLabel,
    handleRemoveAllLabels,
  };
}
