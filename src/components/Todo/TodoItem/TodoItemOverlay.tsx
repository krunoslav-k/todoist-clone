import { AlarmClock, Calendar, Tag } from "lucide-react";
import TodoCheckbox from "./TodoItemCheckbox";
import { categorizeDueDate } from "../../../utils/categorizeDueDate";
import type Todo from "../../../types/todo";
import { dueDateColors } from "../../../config/dueDateColors";

interface TodoItemOverlayProps {
  todo: Todo;
}

export default function TodoItemOverlay({ todo }: TodoItemOverlayProps) {
  const { label, category } = categorizeDueDate(todo.dueDate);
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

  function handleToggleCompleted(completed: boolean): void {
    console.log(completed);
  }

  return (
    <div className="-ml-2 grow flex flex-col">
      <div className="flex items-center cursor-pointer">
        <TodoCheckbox
          todo={todo}
          onToggleCompleted={(completed) => handleToggleCompleted(completed)}
        />
        <p className="ml-2">{todo.title}</p>
      </div>

      <div className="ml-6 cursor-pointer">
        <p className="ml-2 text-[0.8rem] text-gray-400">{todo.description}</p>

        <div className="ml-2 flex items-center gap-2 text-[13px] font-light">
          {todo.dueDate && (
            <span className={`flex items-center gap-1 ${color}`}>
              <Calendar strokeWidth={1.6} size={12} /> {label} {dueDateTime}
            </span>
          )}

          {todo.hasReminder && (
            <span>
              <AlarmClock
                strokeWidth={1.6}
                size={12}
                className="text-gray-600 hover:text-black"
              />
            </span>
          )}

          {todo.labels &&
            todo.labels.map((label) => (
              <span
                key={label}
                className="flex justify-center items-center gap-1 text-[#808080] hover:underline"
              >
                <Tag strokeWidth={1.6} size={12} />
                {label}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
