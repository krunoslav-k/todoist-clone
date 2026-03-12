import { Calendar, GripVertical } from "lucide-react";
import { dueDateColors } from "../../config/dueDateColors";
import type Todo from "../../types/todo";
import { dueDateHelper } from "../../utils/dueDateHelper";
import TodoCheckbox from "./TodoCheckbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoItemActions from "./TodoItemActions";
import { useState } from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import DateDropdown from "../AddTodoForm/dropdowns/DateDropdown/DateDropdown";

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
  onTodoSelect: (id: number) => void;
  onEditTodo: (editedTodo: Todo) => void;
}

export default function TodoItem({
  todo,
  onToggleCompleted,
  onTodoSelect,
  onEditTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDueDateMenuOpen, setIsDueDateMenuOpen] = useState(false);
  const { label, category } = dueDateHelper(todo.dueDate);
  const color = dueDateColors[category];
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({ id: todo.id });
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

  function handleEditTodo(status: boolean) {
    setIsEditing(status);
  }

  function editTodo(editedTodo: Todo) {
    onEditTodo(editedTodo);
  }

  return (
    <>
      {!isEditing && (
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className="flex items-start p-3 border-b border-gray-300 relative group/todoitem"
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

          <div className="-ml-2 grow flex flex-col hover:cursor-pointer group">
            <div
              onClick={() => onTodoSelect(todo.id)}
              className="flex items-center"
            >
              <TodoCheckbox todo={todo} onToggleCompleted={onToggleCompleted} />
              <p className="ml-2">{todo.title}</p>
            </div>

            <div onClick={() => onTodoSelect(todo.id)} className="ml-6">
              <p className="ml-2 text-[0.8rem] text-gray-400">
                {todo.description}
              </p>
              <div
                className={`ml-2 flex items-center gap-0.5 text-[13px] font-light ${color}`}
              >
                {todo.dueDate && (
                  <span className="flex items-center gap-1">
                    <Calendar strokeWidth={1.6} size={12} /> {label}{" "}
                    {dueDateTime}
                  </span>
                )}
              </div>
              <div>{todo.priority ? todo.priority : ""}</div>
            </div>
          </div>
          {!isSorting && (
            <TodoItemActions
              onEditTodo={handleEditTodo}
              onDueDateClick={setIsDueDateMenuOpen}
            />
          )}
        </div>
      )}

      {isEditing && (
        <AddTodoForm
          handleAddTodo={editTodo}
          handleCancelAddTodo={() => setIsEditing(false)}
        />
      )}

      {isDueDateMenuOpen && (
        <DateDropdown
          handleSelectDate={function (dueDate: Date): void {
            throw new Error("Function not implemented.");
          }}
          handleDeleteDate={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </>
  );
}
