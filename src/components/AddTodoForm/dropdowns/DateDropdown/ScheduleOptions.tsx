import { Clock, Repeat2 } from "lucide-react";
import { useState } from "react";
import ScheduleOptionTime from "./ScheduleOptionTime";
import ScheduleOptionRepeat from "./ScheduleOptionRepeat";

export default function ScheduleOptions() {
  const [activePopup, setActivePopup] = useState<"time" | "repeat" | null>(
    null,
  );

  function handleCancelClick() {
    setActivePopup(null);
  }

  return (
    <div className="-mx-3 px-3 pt-3 flex flex-col items-stretch gap-3 border-t border-gray-200">
      <button
        onClick={() => setActivePopup("time")}
        className="py-1.5 flex justify-center items-center gap-2 border border-gray-300 rounded-md text-sm text-gray-500 font-medium cursor-pointer hover:bg-gray-100 hover:border-gray-300 hover:text-gray-800 transition-all ease-in-out group"
      >
        <Clock
          size={14}
          strokeWidth={1.75}
          className="text-gray-500 group-hover:text-gray-800"
        />
        Time
      </button>
      <button
        onClick={() =>
          setActivePopup((prev) => (prev === "repeat" ? null : "repeat"))
        }
        className="py-1.5 flex justify-center items-center gap-2 border border-gray-300 rounded-md text-sm text-gray-500 font-medium cursor-pointer hover:bg-gray-100 hover:border-gray-300 hover:text-gray-800 transition-all ease-in-out group"
      >
        <Repeat2
          size={14}
          strokeWidth={1.75}
          className="text-gray-500 group-hover:text-gray-800"
        />
        Repeat
      </button>

      {activePopup === "time" && (
        <div className="relative">
          <ScheduleOptionTime handleCancelClick={handleCancelClick} />
        </div>
      )}
      {activePopup === "repeat" && <ScheduleOptionRepeat />}
    </div>
  );
}
