import { AlarmClock, Calendar, GripVertical, Tag } from "lucide-react";
import { dueDateColors } from "../../config/dueDateColors";
import type Todo from "../../types/todo";
import { dueDateHelper } from "../../utils/dueDateHelper";
import TodoCheckbox from "./TodoCheckbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoItemActions from "./TodoItemActions";
import TodoForm from "./TodoForm/TodoForm";
import { useRef, useState } from "react";
import DueDateMenu from "./TodoForm/menus/DueDateMenu/DueDateMenu";
import useClickOutside from "../../hooks/useClickOutside";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateTodo } from "../../features/todos/todosSlice";

interface TodoItemProps {
  todo: Todo;
  onTodoSelect: (id: number) => void;
  activeTodoForm: "add" | number | null;
  setActiveTodoForm: (form: "add" | number | null) => void;
}

export default function TodoItem({
  todo,
  onTodoSelect,
  activeTodoForm,
  setActiveTodoForm,
}: TodoItemProps) {
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
  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useClickOutside(menuRef, () => setIsDueDateMenuOpen(false));

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

  const isEditing = activeTodoForm === todo.id;

  function handleSelectDate(dueDate: Date) {
    handleUpdateTodo({ dueDate: dueDate });
  }

  function handleToggleCompleted(id: number, completed: boolean) {
    console.log(typeof todo.dueDate, todo.dueDate);
    dispatch(
      updateTodo({
        id: id,
        changes: { completed: completed },
      }),
    );
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

          <div className="-ml-2 grow flex flex-col">
            <div
              onClick={() => onTodoSelect(todo.id)}
              className="flex items-center cursor-pointer"
            >
              <TodoCheckbox
                todo={todo}
                onToggleCompleted={(id, completed) =>
                  handleToggleCompleted(id, completed)
                }
              />
              <p className="ml-2">{todo.title}</p>
            </div>

            <div
              onClick={() => onTodoSelect(todo.id)}
              className="ml-6 cursor-pointer"
            >
              <p className="ml-2 text-[0.8rem] text-gray-400">
                {todo.description}
              </p>

              <div className="ml-2 flex items-center gap-2 text-[13px] font-light">
                {todo.dueDate && (
                  <span className={`flex items-center gap-1 ${color}`}>
                    <Calendar strokeWidth={1.6} size={12} /> {label}{" "}
                    {dueDateTime}
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
