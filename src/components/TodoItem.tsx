import type Todo from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

export default function TodoItem({ todo, onToggleCompleted }: TodoItemProps) {
  return (
    <div className="p-3 border-b-1 border-gray-300">
      <label className="flex items-center justify-start hover:cursor-pointer group">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
          className="hidden"
        />

        <span className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center mr-3">
          <svg
            className={`w-3.5 h-3.5 text-gray-500 transition-all duration-150  ${todo.completed ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-50 group-hover:scale-100"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.125"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>

        <div>
          <span className="ml-2">{todo.title}</span>
          <div className="ml-2 text-[0.8rem] text-gray-400">
            {todo.description}
          </div>
          <div>{todo.dueDate ? todo.dueDate.toDateString() : ""}</div>
        </div>
      </label>
    </div>
  );
}
