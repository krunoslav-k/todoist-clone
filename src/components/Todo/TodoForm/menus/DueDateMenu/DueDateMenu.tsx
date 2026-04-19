import "react-day-picker/style.css";
import ScheduleOptions from "./ScheduleOptions/ScheduleOptions";
import DueDateMenuInput from "./DueDateMenuInput";
import DueDateMenuQuickDates from "./DueDateMenuQuickDates";
import DueDateMenuCalendar from "./DueDateMenuCalendar";
import DueDateMenuEnteredDate from "./DueDateMenuEnteredDate";
import useDueDateMenu from "../../../../../hooks/useDueDateMenu";

interface DueDateMenuProps {
  onSelectDate: (dueDate: Date) => void;
  onSelectDateAndClose: (dueDate: Date) => void;
  onRemoveDate: () => void;
  initialDueDate?: Date;
}

export default function DueDateMenu({
  onSelectDate,
  onSelectDateAndClose,
  onRemoveDate,
  initialDueDate,
}: DueDateMenuProps) {
  const {
    inputValue,
    setInputValue,
    handleInputChange,
    isDateCompleteAndValid,
    parsedDate,
    selectedDate,
    normalizeDate,
    deleteDate,
    displayedMonth,
    setDisplayedMonth,
    handleDayPickerSelect,
    addTimeToDate,
    removeTimeFromDate,
  } = useDueDateMenu(onSelectDate, onRemoveDate, initialDueDate);

  return (
    <div className="flex flex-col p-3 pt-0 border border-gray-300 rounded-lg bg-white shadow w-fit z-100">
      <DueDateMenuInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputChange={handleInputChange}
      />

      {isDateCompleteAndValid && parsedDate && (
        <DueDateMenuEnteredDate
          onSelectDate={onSelectDate}
          parsedDate={parsedDate}
        />
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
