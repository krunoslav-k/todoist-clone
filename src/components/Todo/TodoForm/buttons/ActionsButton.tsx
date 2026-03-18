import { Ellipsis } from "lucide-react";
import type { ActiveDropdown } from "../../../../types/ui";

interface ActionsButtonProps {
  onActionsClick: (type: Exclude<ActiveDropdown, null>) => void;
}

export default function ActionsButton({ onActionsClick }: ActionsButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onActionsClick("actions")}
      className="button px-1 h-7.5"
    >
      <Ellipsis strokeWidth={1.75} size={20} className="text-gray-500" />
    </button>
  );
}
