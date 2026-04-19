import { format, isValid, parse } from "date-fns";
import { useState } from "react";

export default function useDueDateMenu(
  onSelectDate: (date: Date) => void,
  onRemoveDate: () => void,
  initialDueDate?: Date,
) {
  const [displayedMonth, setDisplayedMonth] = useState(
    initialDueDate ?? new Date(),
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDueDate ? normalizeDate(initialDueDate, true) : undefined,
  );
  const [inputValue, setInputValue] = useState(
    initialDueDate ? format(initialDueDate, "d.M.yyyy") : "",
  );
  const parsedDate = parseDate();
  const isDateCompleteAndValid = parsedDate !== null;

  function normalizeDate(date: Date, keepTime = false) {
    const newDate = new Date(date);
    if (!keepTime) newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  function parseDate() {
    const parts = inputValue.split(".");
    if (parts.length === 3 && parts[2].length === 4) {
      const date = parse(inputValue, "d.M.yyyy", new Date());
      if (isValid(date)) return normalizeDate(date);
    }
    return null;
  }

  function handleDayPickerSelect(date: Date | undefined) {
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
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
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
  }

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

  return {
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
  };
}
