import type Todo from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.completed} />
        <span>{todo.title}</span>
        <span>{todo.description}</span>
      </label>
    </div>
  );
}
