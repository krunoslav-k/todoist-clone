import { Flag } from "lucide-react";
import type { ActiveDropdown } from "../../../../types/ui";

interface PriorityButtonProps {
  handlePriorityButtonClick: (type: Exclude<ActiveDropdown, null>) => void;
}

export default function PriorityButton({
  handlePriorityButtonClick,
}: PriorityButtonProps) {
  return (
    <button
      type="button"
      onClick={() => handlePriorityButtonClick("priority")}
      className="button"
    >
      <Flag strokeWidth={1.5} size={15} className="text-gray-500" /> Priority
    </button>
  );
}
