import { Clock, Repeat2, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import ScheduleOptionTime from "./ScheduleOptionTime";
import ScheduleOptionRepeat from "./ScheduleOptionRepeat";

interface ScheduleOptionsProps {
  selectedDate: Date | undefined;
  onAddTime: (time: string) => void;
  onClearTime: () => void;
}

export default function ScheduleOptions({
  selectedDate,
  onAddTime,
  onClearTime,
}: ScheduleOptionsProps) {
  const [activePopup, setActivePopup] = useState<"time" | "repeat" | null>(
    null,
  );

  const hasTime =
    selectedDate &&
    (selectedDate.getHours() !== 0 || selectedDate.getMinutes() !== 0);

  function handleCancelClick() {
    setActivePopup(null);
  }

  return (
    <div className="-mx-3 px-3 pt-3 flex flex-col items-stretch gap-3 border-t border-gray-200 relative">
      <button
        type="button"
        onClick={() => setActivePopup("time")}
        className="py-1.5 flex justify-center items-center gap-2 border border-gray-300 rounded-md text-sm text-gray-500 font-medium cursor-pointer hover:bg-gray-100 hover:text-gray-800 transition-all group"
      >
        <Clock
          size={14}
          strokeWidth={hasTime ? "2.25" : "1.75"}
          className={`${hasTime ? "text-black" : "text-gray-500 group-hover:text-gray-800"}`}
        />

        {!hasTime ? (
          "Time"
        ) : (
          <>
            <span className="text-black">
              {selectedDate ? format(selectedDate, "H:mm") : null}
            </span>

            <span
              onClick={(e) => {
                e.stopPropagation();
                onClearTime();
                setActivePopup(null);
              }}
              role="button"
              className="absolute right-5 p-0.75 rounded-sm hover:bg-gray-200"
            >
              <X strokeWidth={1.75} size={15} />
            </span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() =>
          setActivePopup((prev) => (prev === "repeat" ? null : "repeat"))
        }
        className="py-1.5 flex justify-center items-center gap-2 border border-gray-300 rounded-md text-sm text-gray-500 font-medium cursor-pointer hover:bg-gray-100 hover:text-gray-800 transition-all group"
      >
        <Repeat2
          size={14}
          strokeWidth={1.75}
          className="text-gray-500 group-hover:text-gray-800"
        />
        Repeat
      </button>

      {activePopup === "time" && (
        <ScheduleOptionTime
          selectedDate={selectedDate}
          onCancelClick={handleCancelClick}
          onAddTime={onAddTime}
        />
      )}

      {activePopup === "repeat" && (
        <ScheduleOptionRepeat selectedDate={selectedDate} />
      )}
    </div>
  );
}
