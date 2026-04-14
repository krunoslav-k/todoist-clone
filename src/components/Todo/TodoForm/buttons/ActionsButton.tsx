import { Ellipsis } from "lucide-react";

export default function ActionsButton({ ...props }) {
  return (
    <button {...props} type="button" className="button px-1 h-7.5">
      <Ellipsis strokeWidth={1.75} size={20} className="text-gray-500" />
    </button>
  );
}
