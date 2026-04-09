import { Check, Flag } from "lucide-react";
import type { Priority } from "../../../../types/todo";

interface PriorityDropdownProps {
  onPrioritySelect: (priority: Priority) => void;
  currentPriority: Priority;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function PriorityDropdown({
  onPrioritySelect,
  currentPriority,
  ref,
}: PriorityDropdownProps) {
  const priorities: { value: Priority; color: string; isCurrent: boolean }[] = [
    {
      value: 1,
      color: "#d1453c",
      isCurrent: currentPriority === 1,
    },
    {
      value: 2,
      color: "#eb890b",
      isCurrent: currentPriority === 2,
    },
    {
      value: 3,
      color: "#2570e0",
      isCurrent: currentPriority === 3,
    },
    {
      value: 4,
      color: "#6a7282",
      isCurrent: currentPriority === 4,
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
            className={`priority_button ${index === 0 ? "rounded-t-lg" : ""} ${index === priorities.length - 1 ? "rounded-b-lg" : ""}`}
          >
            <Flag
              strokeWidth={1.5}
              size={20}
              color={priority.color}
              fill={priority.color === "#6a7282" ? "none" : priority.color}
            />

            <span>Priority {priority.value}</span>

            <Check
              strokeWidth={2.75}
              size={15}
              className={priority.isCurrent ? "text-gray-600" : "invisible"}
            />
          </button>
        );
      })}
    </div>
  );
}
