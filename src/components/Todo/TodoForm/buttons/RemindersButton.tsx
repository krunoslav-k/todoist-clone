import { AlarmClock, Clock3 } from "lucide-react";

interface RemindersButtonProps {
  hasReminder: boolean;
}

export default function RemindersButton({
  hasReminder,
  ...props
}: RemindersButtonProps) {
  return (
    <button {...props} type="button" className="button">
      {hasReminder ? (
        <div className="flex items-center gap-1.5">
          <div className="relative w-3.75 h-3.75">
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
