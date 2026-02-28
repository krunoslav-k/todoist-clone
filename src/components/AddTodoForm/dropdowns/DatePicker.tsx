import { format } from "date-fns/format";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { enGB } from "react-day-picker/locale/en-GB";
import "react-day-picker/style.css";

interface DatePickerProps {
  handleSelectDate: (dueDate: Date) => void;
}

export default function DatePicker({ handleSelectDate }: DatePickerProps) {
  const [selected, setSelected] = useState<Date>();

  function handleSelect(newSelected: Date | undefined) {
    setSelected(newSelected);
    if (newSelected) handleSelectDate(newSelected);
  }

  return (
    <div className="p-3 pt-0 border border-gray-300 rounded-lg bg-white shadow w-fit relative z-10 bottom-50 left-19">
      <DayPicker
        animate
        mode="single"
        selected={selected}
        onSelect={handleSelect}
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
          day: "h-7 w-7 p-0.5 text-xs ",
          day_button: "h-7 w-7 text-xs",
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
    </div>
  );
}
