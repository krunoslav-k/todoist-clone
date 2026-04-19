import { Tag, X } from "lucide-react";

interface LabelButtonProps {
  label: string;
  onRemoveLabel: (label: string) => void;
}

export default function LabelButton({
  label,
  onRemoveLabel,
}: LabelButtonProps) {
  return (
    <button type="button" className="button">
      <Tag
        strokeWidth={1.5}
        size={15}
        fill="#6a7282"
        color="white"
        className="rotate-90"
      />
      {label}
      <span
        onClick={(e) => {
          e.stopPropagation();
          onRemoveLabel(label);
        }}
        role="button"
        className="ml-1 -mr-0.5 p-0.5 rounded-sm hover:bg-gray-200"
      >
        <X strokeWidth={1.5} size={13} />
      </span>
    </button>
  );
}
