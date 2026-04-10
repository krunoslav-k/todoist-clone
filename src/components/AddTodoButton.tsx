import { Plus } from "lucide-react";

interface AddTodoButtonProps {
  handleAddTodoButtonClick: () => void;
}

export default function AddTodoButton({
  handleAddTodoButtonClick,
}: AddTodoButtonProps) {
  return (
    <button
      onClick={handleAddTodoButtonClick}
      className="flex items-start justify-center gap-3 py-3 px-0.5 group hover:cursor-pointer"
    >
      <span className="w-5 h-5 rounded-full border border-transparent flex items-center justify-center group-hover:border-gray-700 group-hover:bg-gray-700">
        <Plus
          size={28}
          strokeWidth={1}
          className="text-gray-700 group-hover:text-white"
        />
      </span>
      <span className="text-[0.9rem] text-gray-500 group-hover:text-gray-800">
        Add task
      </span>
    </button>
  );
}
