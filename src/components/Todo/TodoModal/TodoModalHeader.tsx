import { ChevronDown, ChevronUp, Ellipsis, X } from "lucide-react";

interface TodoModalHeaderProps {
  todosLength: number;
  selectedTodoIndex: number;
  onCloseClick: () => void;
  onPreviousTodoClick: () => void;
  onNextTodoClick: () => void;
}

export default function TodoModalHeader({
  todosLength,
  selectedTodoIndex,
  onCloseClick,
  onPreviousTodoClick,
  onNextTodoClick,
}: TodoModalHeaderProps) {
  return (
    <div className="p-2 flex justify-between items-center border-b border-gray-200">
      <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-md group transition ease-in-out">
        Inbox
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={onPreviousTodoClick}
          className={`${selectedTodoIndex === 0 ? "p-0.5" : "icon_button group"}`}
        >
          <ChevronUp
            strokeWidth={1}
            className={`${
              selectedTodoIndex === 0
                ? "text-[#b2b2b2] cursor-not-allowed"
                : "text-[#666666] group-hover:text-black"
            } `}
          />
        </button>

        <button
          onClick={onNextTodoClick}
          className={`${selectedTodoIndex === todosLength - 1 ? "p-0.5" : "icon_button group"}`}
        >
          <ChevronDown
            strokeWidth={1}
            className={`${
              selectedTodoIndex === todosLength - 1
                ? "text-[#b2b2b2] cursor-not-allowed"
                : "text-[#666666] group-hover:text-black"
            } `}
          />
        </button>

        <button className="icon_button group">
          <Ellipsis
            strokeWidth={1}
            className="text-[#666666] group-hover:text-black"
          />
        </button>

        <button onClick={onCloseClick} className="icon_button group">
          <X
            strokeWidth={1}
            className="text-[#666666] group-hover:text-black"
          />
        </button>
      </div>
    </div>
  );
}
