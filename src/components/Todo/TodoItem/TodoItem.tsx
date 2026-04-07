import { GripVertical } from "lucide-react";
import type Todo from "../../../types/todo";
import TodoItemCheckbox from "./TodoItemCheckbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoItemActions from "./TodoItemActions";
import TodoForm from ".././TodoForm/TodoForm";
import { useRef, useState } from "react";
import DueDateMenu from ".././TodoForm/menus/DueDateMenu/DueDateMenu";
import useClickOutside from "../../../hooks/useClickOutside";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { updateTodo } from "../../../features/todos/todosSlice";
import DragHighlightLine from "./DragHighlightLine";
import useTodoModal from "../../../hooks/useTodoModal";
import TodoItemMeta from "./TodoItemMeta";

interface TodoItemProps {
  todo: Todo;
  activeTodoForm: "add" | number | null;
  setActiveTodoForm: (form: "add" | number | null) => void;
}

export default function TodoItem({
  todo,
  activeTodoForm,
  setActiveTodoForm,
}: TodoItemProps) {
  const [isDueDateMenuOpen, setIsDueDateMenuOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isSorting,
    isDragging,
  } = useSortable({ id: todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging
      ? "none"
      : isSorting
        ? "transform 150ms ease-out"
        : "transform 250ms cubic-bezier(0.25, 0.8, 0.25, 1)",
  };
  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useClickOutside(menuRef, () => setIsDueDateMenuOpen(false));

  const isEditing = activeTodoForm === todo.id;

  const { openTodoModal } = useTodoModal();

  function handleSelectDate(dueDate: Date) {
    handleUpdateTodo({ dueDate: dueDate });
  }

  function handleUpdateTodo(change: Partial<Todo>) {
    dispatch(updateTodo({ id: todo.id, changes: change }));
  }

  return (
    <>
      {!isEditing && (
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className={`flex items-start p-3 border-b border-gray-200 relative group/todoitem ${isDragging ? "bg-gray-50 rounded-b-2xl" : ""}`}
        >
          {isDragging && <DragHighlightLine />}

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

          <div
            className={`-ml-2 grow flex flex-col ${isDragging ? "opacity-0" : ""}`}
          >
            <div
              onClick={() => openTodoModal(todo.id)}
              className="flex items-center cursor-pointer"
            >
              <TodoItemCheckbox
                todo={todo}
                onToggleCompleted={(completed) =>
                  handleUpdateTodo({ completed })
                }
              />
              <p className="ml-2">{todo.title}</p>
            </div>

            <div
              onClick={() => openTodoModal(todo.id)}
              className="ml-6 cursor-pointer"
            >
              <p className="ml-2 text-[0.8rem] text-gray-400">
                {todo.description}
              </p>

              <TodoItemMeta todo={todo} />
            </div>
          </div>

          {!isSorting && (
            <TodoItemActions
              onEditTodo={() => setActiveTodoForm(todo.id)}
              onDueDateClick={() => setIsDueDateMenuOpen(true)}
            />
          )}
        </div>
      )}

      {isDueDateMenuOpen && (
        <DueDateMenu
          onSelectDate={handleSelectDate}
          onSelectDateAndClose={handleSelectDate}
          onDeleteDate={() => handleUpdateTodo({ dueDate: undefined })}
          initialDueDate={todo.dueDate}
          ref={menuRef}
        />
      )}

      {isEditing && (
        <TodoForm initialTodo={todo} onClose={() => setActiveTodoForm(null)} />
      )}
    </>
  );
}
