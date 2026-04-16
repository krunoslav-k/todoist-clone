import { Flag, X } from "lucide-react";
import type { Priority } from "../../../../types/todo";
import { priorityColors } from "../../../../config/priorityStyles";

interface PriorityButtonProps {
  priority: Priority;
  onPriorityReset: () => void;
}

export default function PriorityButton({
  priority,
  onPriorityReset,
  ...props
}: PriorityButtonProps) {
  const colors = priorityColors;

  return (
    <button {...props} type="button" className="button">
      {!priority || priority === 4 ? (
        <>
          <Flag strokeWidth={1.5} size={15} className="text-gray-500" />{" "}
          Priority
        </>
      ) : (
        <>
          <Flag
            strokeWidth={1.5}
            size={15}
            color={colors[priority]}
            fill={colors[priority]}
            className="text-gray-500"
          />
          P{priority}
          <span
            onClick={(e) => {
              e.stopPropagation();
              onPriorityReset();
            }}
            role="button"
            className="ml-1 -mr-0.5 p-0.5 rounded-sm hover:bg-gray-200"
          >
            <X strokeWidth={1.5} size={13} />
          </span>
        </>
      )}
    </button>
  );
}
