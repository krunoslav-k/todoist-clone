import { addDays, format, nextSaturday } from "date-fns";
import { Calendar1, Sofa, Sun } from "lucide-react";

interface QuickDatesProps {
  handleSelectDate: (dueDate: Date) => void;
}

export default function QuickDates({ handleSelectDate }: QuickDatesProps) {
  return (
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
          <Sun size={20} strokeWidth={1.25} color="#ad6200" className="mx-3" />
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
          <Sofa size={20} strokeWidth={1.25} color="#2570e0" className="mx-3" />
          Next weekend
        </button>
        <div className="w-fit whitespace-nowrap flex items-center pr-4 text-xs font-light text-gray-500 group-hover:bg-gray-100">
          {format(nextSaturday(new Date()), "eee d LLL")}
        </div>
      </div>
    </div>
  );
}
