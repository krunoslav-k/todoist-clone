import { Calendar } from "lucide-react";
import { dueDateColors } from "../config/dueDateColors";
import type Todo from "../types/todo";
import { dueDateHelper } from "../utils/dueDateHelper";
import TodoCheckbox from "./TodoCheckbox";

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
  const { label, category } = dueDateHelper(todo.dueDate);
  const color = dueDateColors[category];

  let dueDateTime = "";
  if (
    todo.dueDate &&
    !(todo.dueDate.getHours() === 0 && todo.dueDate.getMinutes() === 0)
  ) {
    dueDateTime = todo.dueDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="p-3 border-b border-gray-300">
      <div className="flex flex-col hover:cursor-pointer group">
        <div
          onClick={() => onTodoSelect(todo.id)}
          className="flex items-center"
        >
          <TodoCheckbox todo={todo} onToggleCompleted={onToggleCompleted} />
          <p className="ml-2">{todo.title}</p>
        </div>

        <div onClick={() => onTodoSelect(todo.id)} className="ml-6">
          <p className="ml-2 text-[0.8rem] text-gray-400">{todo.description}</p>
          <div
            className={`ml-2 flex items-center gap-0.5 text-[13px] font-light ${color}`}
          >
            <Calendar strokeWidth={1.6} size={12} />
            {todo.dueDate ? `${label} ${dueDateTime}` : ""}
          </div>
          <div>{todo.priority ? todo.priority : ""}</div>
        </div>
      </div>
    </div>
  );
}
