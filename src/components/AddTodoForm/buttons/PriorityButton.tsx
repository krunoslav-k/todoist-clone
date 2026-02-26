import { Flag } from "lucide-react";

interface PriorityButtonProps {
  handlePriorityButtonClick: () => void;
}

export default function PriorityButton({
  handlePriorityButtonClick,
}: PriorityButtonProps) {
  return (
    <button onClick={handlePriorityButtonClick} className="button">
      <Flag strokeWidth={1.5} size={15} className="text-gray-500" /> Priority
    </button>
  );
}
