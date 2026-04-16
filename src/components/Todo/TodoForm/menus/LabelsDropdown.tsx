import { Tag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { addLabel } from "../../../../slices/labelsSlice";
interface LabelsDropdownProps {
  onLabelSelect: (label: string) => void;
  labelQuery: string;
  onClose: () => void;
}

export default function LabelsDropdown({
  onLabelSelect,
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
    <div>
      <ul className="w-200 rounded-md bg-white border border-gray-200 drop-shadow-xl z-100">
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
          <button type="button" onClick={() => handleCreateLabel(labelQuery)}>
            Create label {labelQuery}
          </button>
        </li>
      </ul>
    </div>
  );
}
