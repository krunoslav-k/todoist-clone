import { addDays, isValid, nextSaturday, parse } from "date-fns";
import { format } from "date-fns/format";
import {
  Calendar1,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Sofa,
  Sun,
  X,
} from "lucide-react";
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

  const parsedDate = (() => {
    const parts = inputValue.split(".");
    if (parts.length === 3 && parts[2].length === 4) {
      const date = parse(inputValue, "d.M.yyyy", new Date());
      if (isValid(date)) return date;
    }
    return null;
  })();

  const isDateCompleteAndValid = parsedDate !== null;

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setDisplayedMonth(date);
      setInputValue(format(date, "d.M.yyyy"));
      handleSelectDate(date);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parts = newValue.split(".");
    let parsedDate: Date | null = null;
    if (parts.length === 3 && parts[2].length === 4) {
      const date = parse(newValue, "d.M.yyyy", new Date());
      if (isValid(date)) parsedDate = date;
    }

    if (parsedDate) {
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
          className="py-2 -mx-3 flex justify-start items-center border-t border-gray-200 hover:cursor-pointer"
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

      <div className="-mx-3 py-1 border-t border-b border-gray-200">
        <div className="h-full flex justify-between items-stretch group">
          <button
            onClick={() => handleSelectDate(new Date())}
            className="w-full py-2 flex justify-start items-center text-sm group-hover:bg-gray-100 hover:cursor-pointer"
          >
            <Calendar1
              size={20}
              strokeWidth={1.25}
              color="#4b9344"
              className="mx-3"
            />
            Today
          </button>
          <div className="flex items-center pr-4 text-xs font-light text-gray-500 group-hover:bg-gray-100">
            {format(new Date(), "eee")}
          </div>
        </div>

        <div className="h-full flex justify-between items-stretch group">
          <button
            onClick={() => handleSelectDate(addDays(new Date(), 1))}
            className="w-full py-2 flex justify-start items-center text-sm group-hover:bg-gray-100 hover:cursor-pointer"
          >
            <Sun
              size={20}
              strokeWidth={1.25}
              color="#ad6200"
              className="mx-3"
            />
            Tomorrow
          </button>
          <div className="flex items-center pr-4 text-xs font-light text-gray-500 group-hover:bg-gray-100">
            {format(addDays(new Date(), 1), "eee")}
          </div>
        </div>

        <div className="h-full flex justify-between items-stretch group">
          <button
            onClick={() => handleSelectDate(nextSaturday(new Date()))}
            className="w-full py-2 flex justify-start items-center text-sm group-hover:bg-gray-100 hover:cursor-pointer"
          >
            <Sofa
              size={20}
              strokeWidth={1.25}
              color="#2570e0"
              className="mx-3"
            />
            Next weekend
          </button>
          <div className="w-fit whitespace-nowrap flex items-center pr-4 text-xs font-light text-gray-500 group-hover:bg-gray-100">
            {format(nextSaturday(new Date()), "eee d LLL")}
          </div>
        </div>
      </div>

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
