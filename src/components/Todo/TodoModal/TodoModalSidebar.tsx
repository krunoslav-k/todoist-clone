import {
  ChevronDown,
  Flag,
  LockKeyhole,
  Plus,
  type LucideIcon,
} from "lucide-react";
import TodoModalSidebarItem from "./TodoModalSidebarItem";
import * as Popover from "@radix-ui/react-popover";
import DueDateMenu from "../TodoForm/menus/DueDateMenu/DueDateMenu";
import PriorityDropdown from "../TodoForm/menus/PriorityDropdown";
import LabelsDropdown from "../TodoForm/menus/LabelsDropdown";
import RemindersDropdown from "../TodoForm/menus/RemindersDropdown";
import useTodoActions from "../../../hooks/useTodoActions";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { priorityColors } from "../../../config/priorityStyles";

interface TodoModalSidebarProps {
  selectedTodoId: number;
}

interface Item {
  label: string | null;
  buttonText: string | React.ReactNode;
  hasStar: boolean;
  Icon: LucideIcon;
  iconClasses: string;
  dropdown: React.ReactNode;
}

export default function TodoModalSidebar({
  selectedTodoId,
}: TodoModalSidebarProps) {
  const todo = useAppSelector((state) => state.todos.entities[selectedTodoId]);

  const colors = priorityColors;

  const { setDueDate, removeDueDate, setPriority, toggleReminder, addLabel } =
    useTodoActions(selectedTodoId);

  if (!todo) return null;

  const items: Item[] = [
    {
      label: "Project",
      buttonText: "Inbox",
      hasStar: false,
      Icon: ChevronDown,
      iconClasses: "opacity-0 group-hover:opacity-100",
      dropdown: <></>,
    },
    {
      label: null,
      buttonText: "Date",
      hasStar: false,
      Icon: Plus,
      iconClasses: "",
      dropdown: (
        <DueDateMenu
          onSelectDate={setDueDate}
          onSelectDateAndClose={setDueDate}
          onDeleteDate={removeDueDate}
        />
      ),
    },
    {
      label: null,
      buttonText: "Deadline",
      hasStar: true,
      Icon: LockKeyhole,
      iconClasses: "",
      dropdown: <></>,
    },
    {
      label: "Priority",
      buttonText: (
        <span className="flex justify-center items-center gap-2">
          <Flag
            strokeWidth={1.5}
            size={15}
            color={todo.priority === 4 ? "#6a7282" : colors[todo.priority]}
            fill={colors[todo.priority]}
            className="text-gray-500"
          />
          P{todo.priority}
        </span>
      ),
      hasStar: false,
      Icon: ChevronDown,
      iconClasses: "opacity-0 group-hover:opacity-100",
      dropdown: (
        <PriorityDropdown
          onPrioritySelect={setPriority}
          currentPriority={todo.priority}
        />
      ),
    },
    {
      label: null,
      buttonText: "Lables",
      hasStar: false,
      Icon: Plus,
      iconClasses: "",
      dropdown: (
        <LabelsDropdown
          onLabelSelect={addLabel}
          labelQuery={""}
          onClose={() => {}}
        />
      ),
    },
    {
      label: null,
      buttonText: "Reminders",
      hasStar: false,
      Icon: Plus,
      iconClasses: "",
      dropdown: (
        <RemindersDropdown
          hasReminder={todo.hasReminder}
          onToggleReminder={toggleReminder}
        />
      ),
    },
    {
      label: null,
      buttonText: "Location",
      hasStar: true,
      Icon: LockKeyhole,
      iconClasses: "",
      dropdown: <></>,
    },
  ];

  return (
    <div className="w-[30%] h-full p-4 flex flex-col justify-start items-start bg-gray-50 text-sm">
      {items.map(
        ({ label, buttonText, hasStar, Icon, iconClasses, dropdown }) => {
          return (
            <Popover.Root>
              <Popover.Trigger asChild>
                <TodoModalSidebarItem
                  label={label}
                  buttonText={buttonText}
                  hasStar={hasStar}
                  Icon={Icon}
                  iconClasses={iconClasses}
                />
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content className="z-100">{dropdown}</Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          );
        },
      )}
    </div>
  );
}
