import { isValid, parse } from "date-fns";
import { format } from "date-fns/format";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import "react-day-picker/style.css";
import ScheduleOptions from "./ScheduleOptions/ScheduleOptions";
import DueDateMenuInput from "./DueDateMenuInput";
import DueDateMenuQuickDates from "./DueDateMenuQuickDates";
import DueDateMenuCalendar from "./DueDateMenuCalendar";

interface DueDateMenuProps {
  onSelectDate: (dueDate: Date) => void;
  onSelectDateAndClose: (dueDate: Date) => void;
  onRemoveDate: () => void;
  initialDueDate?: Date;
}

function normalizeDate(date: Date, keepTime = false) {
  const newDate = new Date(date);
  if (!keepTime) newDate.setHours(0, 0, 0, 0);
  return newDate;
}

export default function DueDateMenu({
  onSelectDate,
  onSelectDateAndClose,
  onRemoveDate,
  initialDueDate,
}: DueDateMenuProps) {
  const [displayedMonth, setDisplayedMonth] = useState(
    initialDueDate ?? new Date(),
  );

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDueDate ? normalizeDate(initialDueDate, true) : undefined,
  );

  const [inputValue, setInputValue] = useState(
    initialDueDate ? format(initialDueDate, "d.M.yyyy") : "",
  );

  const parsedDate = (() => {
    const parts = inputValue.split(".");
    if (parts.length === 3 && parts[2].length === 4) {
      const date = parse(inputValue, "d.M.yyyy", new Date());
      if (isValid(date)) return normalizeDate(date);
    }
    return null;
  })();

  const isDateCompleteAndValid = parsedDate !== null;

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      const cleanDate = normalizeDate(date);

      setSelectedDate(cleanDate);
      setDisplayedMonth(cleanDate);
      setInputValue(format(cleanDate, "d LLL"));
      onSelectDate(cleanDate);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parts = newValue.split(".");
    let parsed: Date | null = null;

    if (parts.length === 3 && parts[2].length === 4) {
      const date = parse(newValue, "d.M.yyyy", new Date());
      if (isValid(date)) parsed = normalizeDate(date);
    }

    if (parsed) {
      setSelectedDate(parsed);
      setDisplayedMonth(parsed);
    } else {
      setSelectedDate(undefined);
    }
  };

  function deleteDate() {
    setDisplayedMonth(new Date());
    setSelectedDate(undefined);
    setInputValue("");
    onRemoveDate();
  }

  function addTimeToDate(time: string) {
    const [hours, minutes] = time.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) return;

    const baseDate = selectedDate ?? parsedDate;
    if (!baseDate) return;

    const newDate = new Date(baseDate);
    newDate.setHours(hours, minutes, 0, 0);

    setSelectedDate(newDate);
    onSelectDate(newDate);
  }

  function removeTimeFromDate() {
    const baseDate = selectedDate ?? parsedDate;
    if (!baseDate) return;

    const newDate = new Date(baseDate);
    newDate.setHours(0, 0, 0, 0);

    setSelectedDate(newDate);

    onSelectDate(newDate);
  }

  return (
    <div className="flex flex-col p-3 pt-0 border border-gray-300 rounded-lg bg-white shadow w-fit z-100">
      <DueDateMenuInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputChange={handleInputChange}
      />

      {isDateCompleteAndValid && (
        <button
          onClick={() => onSelectDate(parsedDate!)}
          className="py-2 -mx-3 flex justify-start items-center border-t border-gray-200 hover:cursor-pointer"
        >
          <CalendarPlus
            strokeWidth={1}
            size={20}
            className="-m-1 mx-3 text-gray-600"
          />
          <div className="flex flex-col justify-start items-start">
            <p className="text-xs font-semibold">
              {parsedDate!.toDateString()}
            </p>
            <p className="-mt-1 text-[0.7rem]">No tasks</p>
          </div>
        </button>
      )}

      <DueDateMenuQuickDates
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          const cleanDate = normalizeDate(date);
          onSelectDateAndClose(cleanDate);
        }}
        onNoDateClick={deleteDate}
      />

      <DueDateMenuCalendar
        displayedMonth={displayedMonth}
        setDisplayedMonth={setDisplayedMonth}
        selectedDate={selectedDate}
        onDayPickerSelect={handleDayPickerSelect}
      />

      <ScheduleOptions
        selectedDate={selectedDate}
        onAddTime={addTimeToDate}
        onClearTime={removeTimeFromDate}
      />
    </div>
  );
}
