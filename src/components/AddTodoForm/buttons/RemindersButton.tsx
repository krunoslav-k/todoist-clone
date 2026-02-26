import { AlarmClock } from "lucide-react";

export default function RemindersButton() {
  return (
    <button className="button">
      <AlarmClock strokeWidth={1.5} size={15} className="text-gray-500" />{" "}
      Reminders
    </button>
  );
}
