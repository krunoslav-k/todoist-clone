import { CircleQuestionMark } from "lucide-react";

export default function RemindersDropdown() {
  return (
    <div className="w-fit px-2 py-3 border border-gray-300 rounded-lg bg-white shadow-xs relative left-43.5 bottom-15.5 z-10">
      <p className="text-sm font-bold">Reminders</p>

      <div className="py-2">
        <button>Date & time</button>
        <button>Before task</button>
      </div>

      <button className="mb-2">At the time of task</button>

      <p className="mb-3 text-xs text-gray-500">
        Get a notification when it's time for the task
      </p>

      <div className="flex justify-between items-center">
        <button>
          <CircleQuestionMark
            size={20}
            strokeWidth={1.5}
            className="text-gray-500"
          />
        </button>
        <button className="add_button">Add reminder</button>
      </div>
    </div>
  );
}
