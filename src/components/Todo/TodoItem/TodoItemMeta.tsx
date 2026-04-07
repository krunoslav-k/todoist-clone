import { AlarmClock, Calendar, Tag } from "lucide-react";
import type Todo from "../../../types/todo";
import { formatDueTime } from "../../../utils/formatDueDate";
import { categorizeDueDate } from "../../../utils/categorizeDueDate";
import { dueDateColors } from "../../../config/dueDateColors";

interface TodoItemMetaProps {
  todo: Todo;
}

export default function TodoItemMeta({ todo }: TodoItemMetaProps) {
  const dueDateTime = formatDueTime(todo.dueDate);
  const { label, category } = categorizeDueDate(todo.dueDate);
  const color = dueDateColors[category];

  return (
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
  );
}
