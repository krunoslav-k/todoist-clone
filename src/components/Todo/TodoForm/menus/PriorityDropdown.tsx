import { Flag } from "lucide-react";
import type { Priority } from "../../../../types/todo";

interface PriorityDropdownProps {
  handlePrioritySelect: (priority: Priority) => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function PriorityDropdown({
  handlePrioritySelect,
  ref,
}: PriorityDropdownProps) {
  return (
    <div
      ref={ref}
      className="w-fit border border-gray-300 rounded-lg bg-white shadow-xs tracking-wide relative z-10 bottom-15.5 left-15"
    >
      <button
        onClick={() => handlePrioritySelect(1)}
        className="priority_button rounded-t-lg"
      >
        <Flag strokeWidth={1.5} size={20} color="#d1453c" fill="#d1453c" />
        Priority 1
      </button>

      <button
        onClick={() => handlePrioritySelect(2)}
        className="priority_button"
      >
        <Flag strokeWidth={1.5} size={20} color="#eb890b" fill="#eb890b" />
        Priority 2
      </button>

      <button
        onClick={() => handlePrioritySelect(3)}
        className="priority_button"
      >
        <Flag strokeWidth={1.5} size={20} color="#2570e0" fill="#2570e0" />
        Priority 3
      </button>

      <button
        onClick={() => handlePrioritySelect(4)}
        className="priority_button rounded-b-lg"
      >
        <Flag strokeWidth={1.5} size={20} className="text-gray-500" />
        Priority 4
      </button>
    </div>
  );
}
