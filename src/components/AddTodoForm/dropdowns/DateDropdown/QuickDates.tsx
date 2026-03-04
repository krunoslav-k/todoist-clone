import {
  addDays,
  format,
  isToday,
  isWeekend,
  isSameDay,
  nextSaturday,
  isMonday,
  isTuesday,
  nextMonday,
} from "date-fns";
import {
  Calendar1,
  CalendarArrowDown,
  CalendarDays,
  CircleOff,
  Sofa,
  Sun,
} from "lucide-react";

interface QuickDatesProps {
  selectedDate: Date | undefined;
  handleSelectDate: (dueDate: Date) => void;
  handleNoDateClick: () => void;
}

type QuickDateOption = {
  label: string;
  icon: React.ElementType;
  color: string;
  getDate: () => Date;
  formatString?: string;
  shouldShow: (selectedDate: Date | undefined) => boolean;
};

export default function QuickDates({
  selectedDate,
  handleSelectDate,
  handleNoDateClick,
}: QuickDatesProps) {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const saturday = nextSaturday(today);
  const isTodayWeekend = isWeekend(today);
  const weekendLabel = isTodayWeekend ? "Next weekend" : "This weekend";
  const weekendFormatString = isTodayWeekend ? "eee d LLL" : "eee";

  const quickDateOptions: QuickDateOption[] = [
    {
      label: "Today",
      icon: Calendar1,
      color: "#4b9344",
      getDate: () => today,
      formatString: "eee",
      shouldShow: (selectedDate) => !selectedDate || !isToday(selectedDate),
    },
    {
      label: "Tomorrow",
      icon: Sun,
      color: "#ad6200",
      getDate: () => tomorrow,
      formatString: "eee",
      shouldShow: (selectedDate) =>
        !selectedDate || !isSameDay(selectedDate, tomorrow),
    },
    {
      label: "Later this week",
      icon: CalendarDays,
      color: "#6a2ec2",
      getDate: () => addDays(today, 2),
      formatString: "eee",
      shouldShow: () => isMonday(today) || isTuesday(today),
    },
    {
      label: weekendLabel,
      icon: Sofa,
      color: "#2570e0",
      getDate: () => saturday,
      formatString: weekendFormatString,
      shouldShow: () => true,
    },
    {
      label: "Next week",
      icon: CalendarArrowDown,
      color: "#6a2ec2",
      getDate: () => nextMonday(today),
      formatString: "eee d LLL",
      shouldShow: () => true,
    },
  ];

  return (
    <div className="-mx-3 py-1 border-t border-b border-gray-200">
      {quickDateOptions
        .filter((option) => option.shouldShow(selectedDate))
        .map(({ label, icon: Icon, color, getDate, formatString }) => {
          const date = getDate();

          return (
            <div
              key={label}
              className="flex justify-between items-stretch group"
            >
              <button
                onClick={() => handleSelectDate(date)}
                className="w-full py-2 flex justify-start items-center text-sm group-hover:bg-gray-100 hover:cursor-pointer"
              >
                <Icon
                  size={20}
                  strokeWidth={1.25}
                  color={color}
                  className="mx-3"
                />
                {label}
              </button>

              {formatString && (
                <div className="flex items-center pr-4 text-xs font-light text-gray-500 group-hover:bg-gray-100 whitespace-nowrap">
                  {format(date, formatString)}
                </div>
              )}
            </div>
          );
        })}

      {selectedDate && (
        <div className="flex justify-between items-stretch group">
          <button
            onClick={handleNoDateClick}
            className="w-full py-2 flex justify-start items-center text-sm group-hover:bg-gray-100 hover:cursor-pointer"
          >
            <CircleOff
              size={20}
              strokeWidth={1.25}
              color="#808080"
              className="mx-3"
            />
            No date
          </button>
        </div>
      )}
    </div>
  );
}
