import { Check } from "lucide-react";
import type Todo from "../../types/todo";
import { priorityStyles } from "../../config/priorityStyles";

interface TodoCheckboxProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

export default function TodoCheckbox({
  todo,
  onToggleCompleted,
}: TodoCheckboxProps) {
  const style = priorityStyles[todo.priority ?? 4];

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
        className="hidden"
      />

      <span
        className={`w-5 h-5 mr-1 rounded-full ${style.border} ${style.backgroundColor} ${style.hoverBackgroundColor} flex items-center justify-center cursor-pointer group/checkbox`}
      >
        <Check
          strokeWidth={style.strokeWidth}
          className={`w-3.5 h-3.5 ${style.color} transition-all duration-150 ${
            todo.completed
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75 group-hover/checkbox:opacity-100 group-hover/checkbox:scale-100"
          }`}
        />
      </span>
    </div>
  );
}
