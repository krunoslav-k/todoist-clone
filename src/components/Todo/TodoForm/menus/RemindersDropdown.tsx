import { CircleQuestionMark, Clock3, Star, X } from "lucide-react";

interface RemindersDropdownProps {
  hasReminder: boolean;
  onToggleReminder: () => void;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export default function RemindersDropdown({
  hasReminder,
  onToggleReminder,
  ref,
}: RemindersDropdownProps) {
  function handleClick() {
    if (hasReminder) {
      console.log("upgrade");
    } else {
      onToggleReminder();
    }
  }

  return (
    <div
      ref={ref}
      className="max-w-70 flex flex-col justify-center items-stretch gap-3 px-2.5 py-3 border border-gray-300 rounded-lg bg-white shadow-xs z-100"
    >
      <p className="text-sm font-medium">Reminders</p>

      {hasReminder ? (
        <>
          <div className="flex justify-between items-center py-3 mb-3 text-sm border-b border-gray-200">
            <span className="flex justify-center items-center gap-3">
              <Clock3 strokeWidth={1.25} size={19} />
              <span>0m before</span>
            </span>

            <button onClick={onToggleReminder}>
              <X
                strokeWidth={1.5}
                size={14}
                className="text-gray-500 hover:text-black cursor-pointer"
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center px-0.75 py-0.75 bg-gray-100 rounded-full">
            <button className="px-5 py-0.75 text-sm text-gray-500 font-medium rounded-full cursor-pointer hover:text-black">
              <span className="flex justify-center items-center gap-1">
                Date & time <Star size={12} strokeWidth="4" color="#ee8100" />
              </span>
            </button>
            <button className="px-5 py-1.25 text-sm font-medium bg-white rounded-full cursor-pointer">
              Before task
            </button>
          </div>

          <button className="flex justify-start items-center w-full pl-2 py-1 text-sm font-light border border-gray-500 rounded-sm">
            At the time of task
          </button>

          <p className="text-xs text-gray-500">
            Get a notification when it's time for the task
          </p>
        </>
      )}

      <div className="flex justify-between items-center">
        <button className="p-1.75 rounded-sm hover:bg-gray-100 cursor-pointer">
          <CircleQuestionMark
            size={20}
            strokeWidth={1.5}
            className="text-gray-500"
          />
        </button>
        <button type="button" onClick={handleClick} className="add_button">
          {hasReminder ? <>Upgrade for more</> : <>Add reminder</>}
        </button>
      </div>
    </div>
  );
}
