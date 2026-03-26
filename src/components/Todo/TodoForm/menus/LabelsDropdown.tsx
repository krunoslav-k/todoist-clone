import { Tag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { addLabel } from "../../../../features/labels/labelsSlice";

interface LabelsDropdownProps {
  onLabelSelect: (label: string) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  labelQuery: string;
  onClose: () => void;
}

export default function LabelsDropdown({
  onLabelSelect,
  ref,
  labelQuery,
  onClose,
}: LabelsDropdownProps) {
  const labels = useAppSelector((state) => state.labels.labels);

  const dispatch = useAppDispatch();

  function handleCreateLabel(label: string) {
    dispatch(addLabel(label));
    onClose();
  }

  return (
    <div ref={ref}>
      <ul className="w-[98%] rounded-md bg-white border border-gray-200 shadow-xl z-20 absolute top-11.5 left-2">
        {labels
          .filter((label) => {
            if (label.includes(labelQuery)) return label;
          })
          .map((label) => {
            return (
              <li
                onClick={() => onLabelSelect(label)}
                className="px-3 py-1.5 flex justify-start items-center gap-3 text-sm font-light border-b border-gray-100 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
              >
                <Tag size={18} strokeWidth={1.25} className="text-gray-500" />
                {label}
              </li>
            );
          })}

        <li className="px-5 py-1.5 flex justify-start items-center gap-3 text-sm font-light hover:bg-gray-100 first:rounded-t-md last:rounded-b-md">
          <button onClick={() => handleCreateLabel(labelQuery)}>
            Create label {labelQuery}
          </button>
        </li>
      </ul>
    </div>
  );
}
