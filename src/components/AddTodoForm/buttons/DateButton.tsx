import { Calendar } from "lucide-react";
import type { ActiveDropdown } from "../../../types/ui";

interface DateButtonProps {
  handleDateButtonClick: (type: Exclude<ActiveDropdown, null>) => void;
}

export default function DateButton({ handleDateButtonClick }: DateButtonProps) {
  return (
    <button onClick={() => handleDateButtonClick("date")} className="button">
      <Calendar
        strokeWidth={1.5}
        size={15}
        className="text-gray-500 relative top-[-0.5px]"
      />{" "}
      Date
    </button>
  );
}
