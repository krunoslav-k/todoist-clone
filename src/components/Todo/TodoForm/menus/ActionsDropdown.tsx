import { Tag } from "lucide-react";

interface ActionsDropdownProps {
  onLabelsClick: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function ActionsDropdown({
  onLabelsClick,
  ref,
}: ActionsDropdownProps) {
  return (
    <div
      ref={ref}
      className="w-[30%] h-fit p-2 flex flex-col justify-start items-start bg-white border border-gray-100 rounded-xl shadow-md text-sm absolute top-26 left-70"
    >
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
