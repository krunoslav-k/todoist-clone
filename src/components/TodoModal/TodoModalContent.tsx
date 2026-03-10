import { Check, Paperclip, Plus } from "lucide-react";
import profileIcon from "../../assets/profile.svg";
import type Todo from "../../types/todo";

interface TodoModalContentProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

export default function TodoModalContent({
  todo,
  onToggleCompleted,
}: TodoModalContentProps) {
  return (
    <div className="w-[70%] h-full p-3 pl-13">
      <label className="-ml-8 pb-1 flex items-center justify-start hover:cursor-pointer group">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
          className="hidden"
        />

        <span className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center mr-3">
          <Check
            strokeWidth={2.5}
            className={`w-3.5 h-3.5 text-gray-500 transition-all duration-150  ${todo.completed ? "opacity-100 scale-100" : "opacity-0 scale-75 hover:opacity-50 hover:scale-100"}`}
          />
        </span>

        <p className="text-xl font-medium">{todo.title}</p>
      </label>

      <p className="mb-7 text-sm text-gray-600">{todo.description}</p>

      <button className="p-1 pr-2 mb-4 flex justify-center items-center gap-2 text-sm font-medium text-gray-500 rounded-sm cursor-pointer hover:bg-gray-100 hover:text-black">
        <Plus strokeWidth={1} size={18} className="text-black" />
        Add sub-task
      </button>

      <hr className="text-gray-200" />

      <div className="mt-4 flex justify-start items-center relative">
        <img
          src={profileIcon}
          alt="empty profile icon"
          className="h-6 mr-2.5"
        />
        <input
          type="text"
          placeholder="Comment"
          className="w-full h-7 pl-5 border border-gray-200 text-sm  rounded-full cursor-pointer hover:bg-gray-50 focus:outline-none"
        />
        <button className="absolute right-5 cursor-pointer">
          <Paperclip strokeWidth={1} size={17} />
        </button>
      </div>
    </div>
  );
}
