import { Flag, X } from "lucide-react";
import type { Dropdown } from "../../../../types/ui";
import type { Priority } from "../../../../types/todo";
import { priorityColors } from "../../../../config/priorityStyles";

interface PriorityButtonProps {
  priority: Priority;
  handlePriorityButtonClick: (type: Exclude<Dropdown, null>) => void;
  onPriorityCloseClick: () => void;
}

export default function PriorityButton({
  handlePriorityButtonClick,
  onPriorityCloseClick,
  priority,
}: PriorityButtonProps) {
  const colors = priorityColors;

  return (
    <button
      type="button"
      onClick={() => handlePriorityButtonClick("priority")}
      className="button"
    >
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
              onPriorityCloseClick();
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
