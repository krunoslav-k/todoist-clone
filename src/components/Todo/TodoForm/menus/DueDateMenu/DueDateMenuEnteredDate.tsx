import { CalendarPlus } from "lucide-react";

interface DueDateMenuEnteredDateProps {
  onSelectDate: (date: Date) => void;
  parsedDate: Date;
}

export default function DueDateMenuEnteredDate({
  onSelectDate,
  parsedDate,
}: DueDateMenuEnteredDateProps) {
  return (
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
        <p className="text-xs font-semibold">{parsedDate!.toDateString()}</p>
        <p className="-mt-1 text-[0.7rem]">No tasks</p>
      </div>
    </button>
  );
}
