import * as Popover from "@radix-ui/react-popover";
import RemindersButton from "../buttons/RemindersButton";
import RemindersDropdown from "../menus/RemindersDropdown";

interface Props {
  remindersOpen: boolean;
  onOpenChange: (bool: boolean) => void;
  hasReminder: boolean;
  onToggleReminder: () => void;
}

export default function ReminderPopover({
  remindersOpen,
  onOpenChange,
  hasReminder,
  onToggleReminder,
}: Props) {
  return (
    <Popover.Root open={remindersOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <RemindersButton hasReminder={hasReminder} />
      </Popover.Trigger>

      <Popover.Content side="bottom" align="start" className="z-50 bg-white">
        <RemindersDropdown
          hasReminder={hasReminder}
          onToggleReminder={onToggleReminder}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
