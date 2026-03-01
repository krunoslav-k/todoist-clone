import { isValid, parse } from "date-fns";
import { format } from "date-fns/format";
import { CalendarPlus, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { enGB } from "react-day-picker/locale/en-GB";
import "react-day-picker/style.css";

interface DatePickerProps {
  handleSelectDate: (dueDate: Date) => void;
}

export default function DatePicker({ handleSelectDate }: DatePickerProps) {
  const [displayedMonth, setDisplayedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");

  const parsedDate =
    inputValue.length === 10
      ? parse(inputValue, "dd.MM.yyyy", new Date())
      : null;

  const isDateCompleteAndValid = parsedDate && isValid(parsedDate);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setDisplayedMonth(date);
      setInputValue(format(date, "dd.MM.yyyy"));
      handleSelectDate(date);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const parsedDate = parse(e.target.value, "dd.MM.yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setDisplayedMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <div className="flex flex-col p-3 pt-0 border border-gray-300 rounded-lg bg-white shadow w-fit relative z-10 bottom-50 left-19">
      <div className="flex justify-between items-center">
        <input
          type="string"
          value={inputValue}
          placeholder="Type a date"
          onChange={handleInputChange}
          className="my-3 text-sm placeholder:text-sm placeholder:text-gray-400 focus:outline-none"
        />

        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="w-6 h-6 flex justify-center items-center rounded-md hover:bg-gray-100"
          >
            <X size={15} className="text-gray-500" />
          </button>
        )}
      </div>

      {isDateCompleteAndValid && (
        <button
          onClick={() => handleSelectDate(parsedDate)}
          className="py-2 -mx-3 flex justify-start items-center border-t  border-b border-gray-200 hover:cursor-pointer"
        >
          <CalendarPlus
            strokeWidth={1}
            size={20}
            className="-m-1 mx-3 text-gray-600"
          />
          <div className="flex flex-col justify-start items-start">
            <p className="text-xs font-semibold">{parsedDate.toDateString()}</p>
            <p className="-mt-1 text-[0.7rem]">No tasks</p>
          </div>
        </button>
      )}

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
