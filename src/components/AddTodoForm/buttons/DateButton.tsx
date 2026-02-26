import { Calendar } from "lucide-react";

interface DateButtonProps {
  handleDateButtonClick: () => void;
}

export default function DateButton({ handleDateButtonClick }: DateButtonProps) {
  return (
    <button onClick={handleDateButtonClick} className="button">
      <Calendar
        strokeWidth={1.5}
        size={15}
        className="text-gray-500 relative top-[-0.5px]"
      />{" "}
      Date
    </button>
  );
}
