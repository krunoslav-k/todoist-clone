import { Flag } from "lucide-react";
import type { Priority } from "../../../../types/todo";

interface PriorityDropdownProps {
  onPrioritySelect: (priority: Priority) => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function PriorityDropdown({
  onPrioritySelect,
  ref,
}: PriorityDropdownProps) {
  const priorities: { value: Priority; color: string }[] = [
    {
      value: 1,
      color: "#d1453c",
    },
    {
      value: 2,
      color: "#eb890b",
    },
    {
      value: 3,
      color: "#2570e0",
    },
    {
      value: 4,
      color: "#6a7282",
    },
  ];

  return (
    <div
      ref={ref}
      className="w-fit border border-gray-300 rounded-lg bg-white shadow-xs tracking-wide relative z-10 bottom-15.5 left-15"
    >
      {priorities.map((priority, index) => {
        return (
          <button
            key={index}
            onClick={() => onPrioritySelect(priority.value)}
            className={`priority_button ${index === 0 ? "rounded-t-lg" : ""} ${index === 0 ? "rouned-b-lg" : ""}`}
          >
            <Flag
              strokeWidth={1.5}
              size={20}
              color={priority.color}
              fill={priority.color === "#6a7282" ? "none" : priority.color}
            />
            Priority {priority.value}
          </button>
        );
      })}
    </div>
  );
}
