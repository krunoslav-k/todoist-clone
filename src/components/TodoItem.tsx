import type Todo from "../types/todo";
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
          <div>
            {todo.dueDate
              ? `${todo.dueDate.toDateString()} ${todo.dueDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : ""}
          </div>
          <div>{todo.priority ? todo.priority : ""}</div>
        </div>
      </div>
    </div>
  );
}
