import { Calendar, CalendarDays, X } from "lucide-react";
import type { Dropdown } from "../../../../types/ui";
import { categorizeDueDate } from "../../../../utils/categorizeDueDate";
import { dueDateColors } from "../../../../config/dueDateColors";

interface DateButtonProps {
  dueDate?: Date;
  onDateButtonClick: (type: Exclude<Dropdown, null>) => void;
  onDateButtonCloseClick: () => void;
}

export default function DateButton({
  dueDate,
  onDateButtonClick,
  onDateButtonCloseClick,
}: DateButtonProps) {
  const { label, category } = categorizeDueDate(dueDate);
  const color = dueDateColors[category];

  return (
    <button
      type="button"
      onClick={() => onDateButtonClick("date")}
      className="button"
    >
      {!dueDate ? (
        <>
          <Calendar
            strokeWidth={1.5}
            size={15}
            className="text-gray-500 relative top-[-0.5px]"
          />{" "}
          Date
        </>
      ) : (
        <div className="flex justify-center items-center gap-1">
          <CalendarDays
            strokeWidth={1.5}
            size={15}
            className={` ${color ? color : "text-gray-500"}`}
          />

          <span className={` ${color ? color : "text-gray-500"}`}>{label}</span>

          <span
            onClick={(e) => {
              e.stopPropagation();
              onDateButtonCloseClick();
            }}
            role="button"
            className="ml-1 -mr-0.5 p-0.5 rounded-sm hover:bg-gray-200"
          >
            <X strokeWidth={1.5} size={13} />
          </span>
        </div>
      )}
    </button>
  );
}
