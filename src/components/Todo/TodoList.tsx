import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { reorderTodos } from "../../slices/todosSlice";
import type Todo from "../../types/todo";
import { useState } from "react";
import TodoItem from "./TodoItem/TodoItem";
import TodoItemOverlay from "./TodoItem/TodoItemOverlay";

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
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const activeTodo = todos.find((t) => t.id === activeId);
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
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);

      dispatch(reorderTodos({ oldIndex, newIndex }));
    }
  }

  return (
    <ul>
      <DndContext
        onDragStart={(event) => {
          setActiveId(event.active.id);
        }}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={todos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
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

        <DragOverlay>
          {activeTodo ? <TodoItemOverlay todo={activeTodo} /> : null}
        </DragOverlay>
      </DndContext>
    </ul>
  );
}
