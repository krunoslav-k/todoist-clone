import { AlarmClock } from "lucide-react";

interface RemindersButtonProps {
  handleRemindersButtonClick: () => void;
}

export default function RemindersButton({
  handleRemindersButtonClick,
}: RemindersButtonProps) {
  return (
    <button onClick={handleRemindersButtonClick} className="button">
      <AlarmClock strokeWidth={1.5} size={15} className="text-gray-500" />{" "}
      Reminders
    </button>
  );
}
