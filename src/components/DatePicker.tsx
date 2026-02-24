import { useState } from "react";
import { DayPicker } from "react-day-picker";
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
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow w-fit relative z-10 bottom-50 left-19">
      <DayPicker
        animate
        mode="single"
        selected={selected}
        onSelect={handleSelect}
      />
    </div>
  );
}
