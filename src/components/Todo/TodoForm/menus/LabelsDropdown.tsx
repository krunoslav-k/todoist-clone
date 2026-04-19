import { Command } from "cmdk";
import { Tag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { addLabel } from "../../../../slices/labelsSlice";
import { useMemo } from "react";

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
    if (!label.trim()) return;
    dispatch(addLabel(label));
    onLabelSelect(label);
    onClose();
  }

  const filteredLabels = useMemo(() => {
    return labels.filter((label) =>
      label.toLowerCase().includes(labelQuery.toLowerCase()),
    );
  }, [labels, labelQuery]);

  const showCreate =
    labelQuery.trim().length > 0 &&
    !labels.some((l) => l.toLowerCase() === labelQuery.trim().toLowerCase());

  return (
    <Command className="rounded-md border border-gray-200 bg-white shadow-md">
      {/* Lista */}
      <Command.List>
        <Command.Empty className="px-3 py-2 text-sm text-gray-500">
          No labels found
        </Command.Empty>

        {filteredLabels.map((label) => (
          <Command.Item
            key={label}
            onSelect={() => {
              onLabelSelect(label);
              onClose();
            }}
            className="px-3 py-1.5 flex items-center gap-3 text-sm cursor-pointer hover:bg-gray-100"
          >
            <Tag size={18} strokeWidth={1.25} className="text-gray-500" />
            {label}
          </Command.Item>
        ))}

        {showCreate && (
          <Command.Item
            onSelect={() => handleCreateLabel(labelQuery)}
            className="px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-100"
          >
            Label not found.
            <span className="font-semibold"> Create {labelQuery}</span>
          </Command.Item>
        )}
      </Command.List>
    </Command>
  );
}
