import * as Popover from "@radix-ui/react-popover";
import PriorityButton from "../buttons/PriorityButton";
import PriorityDropdown from "../menus/PriorityDropdown";
import type { Priority } from "../../../../types/todo";

interface Props {
  priorityOpen: boolean;
  onOpenChange: (bool: boolean) => void;
  priority: Priority;
  onPrioritySelect: (priority: Priority) => void;
}

export default function PriorityPopover({
  priorityOpen,
  onOpenChange,
  priority,
  onPrioritySelect,
}: Props) {
  return (
    <Popover.Root open={priorityOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <PriorityButton
          priority={priority}
          onPriorityReset={() => {
            onPrioritySelect(4);
            onOpenChange(false);
          }}
        />
      </Popover.Trigger>

      <Popover.Content side="bottom" align="center" className="z-50 bg-white">
        <PriorityDropdown
          currentPriority={priority}
          onPrioritySelect={(p) => {
            onPrioritySelect(p);
            onOpenChange(false);
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
