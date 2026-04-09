import { AlarmClock, Clock3 } from "lucide-react";
import type { Dropdown } from "../../../../types/ui";

interface RemindersButtonProps {
  hasReminder: boolean;
  handleRemindersButtonClick: (type: Exclude<Dropdown, null>) => void;
}

export default function RemindersButton({
  hasReminder,
  handleRemindersButtonClick,
}: RemindersButtonProps) {
  return (
    <button
      type="button"
      onClick={() => handleRemindersButtonClick("reminders")}
      className="button"
    >
      {hasReminder ? (
        <div className="flex items-center gap-1.5">
          <div className="relative w-[15px] h-[15px]">
            <AlarmClock
              strokeWidth={1.5}
              size={15}
              fill="#6a7282"
              className="text-gray-500"
            />
            <Clock3
              strokeWidth={2}
              size={10}
              stroke="white"
              className="absolute bottom-0.5 right-[2.5px]"
            />
          </div>

          <span>At time of task</span>
        </div>
      ) : (
        <>
          <AlarmClock strokeWidth={1.5} size={15} className="text-gray-500" />
          <span>Reminders</span>
        </>
      )}
    </button>
  );
}
