import type Todo from "../types/todo";
import { Check } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
  onTodoSelect: (id: number) => void;
}

export default function TodoItem({
  todo,
  onToggleCompleted,
  onTodoSelect,
}: TodoItemProps) {
  return (
    <div className="p-3 border-b border-gray-300">
      <label className="flex items-center justify-start hover:cursor-pointer group">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
          className="hidden"
        />

        <span className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center mr-3">
          <Check
            strokeWidth={2.5}
            className={`w-3.5 h-3.5 text-gray-500 transition-all duration-150  ${todo.completed ? "opacity-100 scale-100" : "opacity-0 scale-75 hover:opacity-50 hover:scale-100"}`}
          />
        </span>

        <div onClick={() => onTodoSelect(todo.id)}>
          <span className="ml-2">{todo.title}</span>
          <div className="ml-2 text-[0.8rem] text-gray-400">
            {todo.description}
          </div>
          <div>
            {todo.dueDate
              ? `${todo.dueDate.toDateString()} ${todo.dueDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : ""}
          </div>
          <div>{todo.priority ? todo.priority : ""}</div>
        </div>
      </label>
    </div>
  );
}
