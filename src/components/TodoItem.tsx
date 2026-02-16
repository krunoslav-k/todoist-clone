import type Todo from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

export default function TodoItem({ todo, onToggleCompleted }: TodoItemProps) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
        />
        <span>{todo.title}</span>
        <span>{todo.description}</span>
      </label>
    </div>
  );
}
