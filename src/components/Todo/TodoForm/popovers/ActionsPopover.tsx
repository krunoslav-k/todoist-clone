import * as Popover from "@radix-ui/react-popover";
import ActionsButton from "../buttons/ActionsButton";
import ActionsDropdown from "../menus/ActionsDropdown";

interface Props {
  actionsOpen: boolean;
  onOpenChange: (bool: boolean) => void;
  onOpenLabels: (bool: boolean) => void;
  titleRef: React.RefObject<HTMLInputElement | null>;
}

export default function ActionsPopover({
  actionsOpen,
  onOpenChange,
  onOpenLabels,
  titleRef,
}: Props) {
  return (
    <Popover.Root open={actionsOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <ActionsButton />
      </Popover.Trigger>

      <Popover.Content
        side="bottom"
        align="start"
        sideOffset={5}
        className="z-50 bg-white"
      >
        <ActionsDropdown
          onOpenLabels={() => {
            onOpenChange(false);
            onOpenLabels(true);
            setTimeout(() => titleRef.current?.focus(), 0);
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
