import { Calendar, GripVertical } from "lucide-react";
import { dueDateColors } from "../../config/dueDateColors";
import type Todo from "../../types/todo";
import { dueDateHelper } from "../../utils/dueDateHelper";
import TodoCheckbox from "./TodoCheckbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-3 border-b border-gray-300 relative group/todoitem"
    >
      <div className="absolute -left-8 top-2.75 w-8 h-full hidden group-hover/todoitem:block hover:block">
        <span
          {...attributes}
          {...listeners}
          className="w-fit h-fit py-1 px-0.5 flex items-center justify-center rounded-sm cursor-move hover:bg-gray-100"
          title="Drag to reorder"
        >
          <GripVertical size={18} className="text-gray-600" />
        </span>
      </div>
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
            {todo.dueDate && (
              <span className="flex items-center gap-1">
                <Calendar strokeWidth={1.6} size={12} /> {label} {dueDateTime}
              </span>
            )}
          </div>
          <div>{todo.priority ? todo.priority : ""}</div>
        </div>
      </div>
    </div>
  );
}
