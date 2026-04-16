import * as Popover from "@radix-ui/react-popover";
import DateButton from "../buttons/DateButton";
import DueDateMenu from "../menus/DueDateMenu/DueDateMenu";

type Props = {
  dateOpen: boolean;
  onOpenChange: (bool: boolean) => void;
  dueDate: Date | undefined;
  onRemoveDate: () => void;
  onSelectDate: (dueDate: Date) => void;
};

export default function DatePopover({
  dateOpen,
  onOpenChange,
  dueDate,
  onRemoveDate,
  onSelectDate,
}: Props) {
  return (
    <Popover.Root open={dateOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <DateButton dueDate={dueDate} onDateButtonCloseClick={onRemoveDate} />
      </Popover.Trigger>

      <Popover.Content side="right" align="start" className="z-50 bg-white">
        <DueDateMenu
          onSelectDate={onSelectDate}
          onSelectDateAndClose={(dueDate) => {
            onSelectDate(dueDate);
            onOpenChange(false);
          }}
          onDeleteDate={onRemoveDate}
          initialDueDate={dueDate}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
