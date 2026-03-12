import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type Todo from "../../types/todo";
import TodoItem from "./TodoItem";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";

interface TodoListProps {
  todos: Todo[];
  onToggleCompleted: (id: number, completed: boolean) => void;
  onTodoSelect: (id: number) => void;
  onSetTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onEditTodo: (editedTodo: Todo) => void;
}

export default function TodoList({
  todos,
  onToggleCompleted,
  onTodoSelect,
  onSetTodos,
  onEditTodo,
}: TodoListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onSetTodos((todos) => {
        const oldIndex = todos.findIndex((todo) => todo.id === active.id);
        const newIndex = todos.findIndex((todo) => todo.id === over.id);
        return arrayMove<Todo>(todos, oldIndex, newIndex);
      });
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
                onToggleCompleted={onToggleCompleted}
                onTodoSelect={onTodoSelect}
                onEditTodo={onEditTodo}
                key={todo.id}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </ul>
  );
}
