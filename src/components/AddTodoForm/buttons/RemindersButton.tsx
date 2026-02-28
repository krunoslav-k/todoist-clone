import { AlarmClock } from "lucide-react";
import type { ActiveDropdown } from "../../../types/ui";

interface RemindersButtonProps {
  handleRemindersButtonClick: (type: Exclude<ActiveDropdown, null>) => void;
}

export default function RemindersButton({
  handleRemindersButtonClick,
}: RemindersButtonProps) {
  return (
    <button
      onClick={() => handleRemindersButtonClick("reminders")}
      className="button"
    >
      <AlarmClock strokeWidth={1.5} size={15} className="text-gray-500" />{" "}
      Reminders
    </button>
  );
}
