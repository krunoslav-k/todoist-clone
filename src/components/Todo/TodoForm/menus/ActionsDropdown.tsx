import { Tag } from "lucide-react";

interface ActionsDropdownProps {
  onLabelsClick?: () => void;
}

export default function ActionsDropdown({
  onLabelsClick,
}: ActionsDropdownProps) {
  return (
    <div className="w-60 h-fit p-2 flex flex-col justify-start items-start bg-white border border-gray-100 rounded-xl shadow-md text-sm z-100">
      <button
        type="button"
        onClick={onLabelsClick}
        className="flex justify-between items-center w-full px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 font-light "
      >
        <span className="flex justify-center items-center gap-3">
          <Tag size={18} strokeWidth={1.25} className="text-gray-500" /> Labels
        </span>
        <span className="text-xs text-gray-400">@</span>
      </button>
    </div>
  );
}
