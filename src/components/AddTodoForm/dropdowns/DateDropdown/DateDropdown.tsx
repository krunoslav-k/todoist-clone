import { isValid, parse } from "date-fns";
import { format } from "date-fns/format";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import "react-day-picker/style.css";
import DateInput from "./DateInput";
import QuickDates from "./QuickDates";
import CalendarView from "./CalendarView";
import ScheduleOptions from "./ScheduleOptions";

interface DateDropdownProps {
  handleSelectDate: (dueDate: Date) => void;
  handleDeleteDate: () => void;
  initialDueDate?: Date;
}

export default function DateDropdown({
  handleSelectDate,
  handleDeleteDate,
  initialDueDate,
}: DateDropdownProps) {
  const [displayedMonth, setDisplayedMonth] = useState(
    initialDueDate ?? new Date(),
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDueDate ?? undefined,
  );
  const [inputValue, setInputValue] = useState(
    initialDueDate?.toDateString() ?? "",
  );

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
      setInputValue(format(date, "d LLL"));
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

  function deleteDate() {
    setDisplayedMonth(new Date());
    setSelectedDate(undefined);
    setInputValue("");
    handleDeleteDate();
  }

  function addTimeToDate(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    if (selectedDate) {
      selectedDate.setHours(hours, minutes, 0, 0);
    }
  }

  return (
    <div className="flex flex-col p-3 pt-0 border border-gray-300 rounded-lg bg-white shadow w-fit relative z-10 bottom-50 left-19">
      <DateInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputChange={handleInputChange}
      />

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

      <QuickDates
        selectedDate={selectedDate}
        handleSelectDate={handleSelectDate}
        handleNoDateClick={deleteDate}
      />

      <CalendarView
        displayedMonth={displayedMonth}
        setDisplayedMonth={setDisplayedMonth}
        selectedDate={selectedDate}
        handleDayPickerSelect={handleDayPickerSelect}
      />

      <ScheduleOptions
        selectedDate={selectedDate}
        handleAddTime={addTimeToDate}
      />
    </div>
  );
}
