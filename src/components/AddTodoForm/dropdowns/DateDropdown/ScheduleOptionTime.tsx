import { Star } from "lucide-react";
import { useState } from "react";

interface ScheduleOptionTimeProps {
  handleCancelClick: () => void;
}

export default function ScheduleOptionTime({
  handleCancelClick,
}: ScheduleOptionTimeProps) {
  const [isTimesOpen, setIsTimesOpen] = useState(false);

  const times = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      times.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }

  return (
    <div className="w-80 p-3 flex flex-col gap-3 absolute -right-7 bottom-24 z-10 bg-white border border-gray-200 rounded-xl shadow-lg">
      <div className="flex justify-between items-center">
        <label htmlFor="time" className="text-sm text-gray-800 font-medium">
          Time
        </label>
        <input
          type="text"
          id="time"
          onClick={() => setIsTimesOpen(true)}
          className="w-50 px-1.75 py-1.25 border border-gray-300 rounded-sm text-sm text-gray-600 hover:border-gray-400 focus:outline-none"
        />
      </div>

      {isTimesOpen && (
        <ul className="h-60 w-44 p-1 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 overflow-y-auto shadow-lg absolute left-26 top-12">
          {times.map((time) => {
            return (
              <li key={time} className="px-2 py-2 hover:bg-gray-100 rounded-lg">
                {time}
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex justify-between items-center">
        <label htmlFor="duration" className="text-sm text-gray-800 font-medium">
          Duration
        </label>
        <button className="w-50 flex justify-between items-center px-1.75 py-1.25 bg-gray-100 border border-gray-300 rounded-sm text-sm text-gray-700 hover:border-gray-400 cursor-pointer">
          <span>No duration</span>
          <Star size={16} strokeWidth="5" color="#ee8100" />
        </button>
      </div>

      <div className="py-3 px-3 -mx-3 flex justify-between items-center border-y border-gray-300">
        <label htmlFor="time" className="text-sm text-gray-800 font-medium">
          Timezone
        </label>
        <input
          type="text"
          readOnly
          id="timezone"
          className="w-50 px-1.75 py-1.25 border border-gray-300 rounded-sm text-sm text-gray-600 hover:border-gray-400 focus:outline-none"
        />
      </div>

      <div className="flex justify-end items-center gap-3">
        <button
          onClick={handleCancelClick}
          className="cancel_button w-18 py-1.75"
        >
          Cancel
        </button>
        <button className="add_button w-18 py-1.75">Save</button>
      </div>
    </div>
  );
}
