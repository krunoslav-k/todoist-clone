import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import TodoItem from "./TodoItem";
import { SortableContext } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { reorderTodos } from "../../features/todos/todosSlice";
import type Todo from "../../types/todo";

interface TodoListProps {
  todos: Todo[];
  activeTodoForm: "add" | number | null;
  setActiveTodoForm: (form: "add" | number | null) => void;
}

export default function TodoList({
  todos,
  activeTodoForm,
  setActiveTodoForm,
}: TodoListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const dispatch = useAppDispatch();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);

      dispatch(reorderTodos({ oldIndex, newIndex }));
    }
  }

  return (
    <ul>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={todos.map((todo) => todo.id)}>
          {todos.map((todo) => {
            return (
              <TodoItem
                todo={todo}
                activeTodoForm={activeTodoForm}
                setActiveTodoForm={setActiveTodoForm}
                key={todo.id}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </ul>
  );
}
