import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

interface CalendarViewProps {
  displayedMonth: Date;
  setDisplayedMonth: (date: Date) => void;
  selectedDate: Date | undefined;
  handleDayPickerSelect: (date: Date | undefined) => void;
}

export default function CalendarView({
  displayedMonth,
  setDisplayedMonth,
  selectedDate,
  handleDayPickerSelect,
}: CalendarViewProps) {
  return (
    <DayPicker
      animate
      month={displayedMonth}
      onMonthChange={setDisplayedMonth}
      mode="single"
      selected={selectedDate}
      onSelect={handleDayPickerSelect}
      weekStartsOn={1}
      locale={enGB}
      formatters={{
        formatWeekdayName: (date) =>
          date.toLocaleDateString("en-GB", { weekday: "short" }).charAt(0),

        formatCaption: (date) => format(date, "MMM yyyy", { locale: enGB }),
      }}
      classNames={{
        caption: "flex justify-center items-center border-3",
        caption_label:
          "flex justify-center items-center text-[0.8rem] font-semibold",
        button_previous:
          "p-0.5 rounded-sm hover:bg-gray-100 flex items-center justify-center",
        button_next:
          "ml-3 p-0.5 rounded-sm hover:bg-gray-100 flex items-center justify-center",
        head_cell: "text-xs font-light text-gray-600",
        day: "h-6 w-6  text-sm",
        today: "text-[#39485e] font-black",
        selected: "bg-[#39485e] rounded-full text-white font-black",
        day_button: "h-6 w-6 m-1.25 text-sm",
        month_caption: "py-4.5 flex justify-between",
        month: "w-fit",
        weekdays: "border-b border-gray-200",
        weekday: "font-light text-[0.65rem] text-gray-500",
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-5 w-5 stroke-1 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 stroke-1 text-gray-500" />
          ),
      }}
    />
  );
}
