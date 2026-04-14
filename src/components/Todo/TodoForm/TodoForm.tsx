import * as Popover from "@radix-ui/react-popover";
import { useRef, useState } from "react";

import DueDateMenu from "./menus/DueDateMenu/DueDateMenu";
import DateButton from "./buttons/DateButton";
import PriorityButton from "./buttons/PriorityButton";
import RemindersButton from "./buttons/RemindersButton";
import ActionsButton from "./buttons/ActionsButton";

import PriorityDropdown from "./menus/PriorityDropdown";
import RemindersDropdown from "./menus/RemindersDropdown";
import ActionsDropdown from "./menus/ActionsDropdown";

import type { Priority } from "../../../types/todo";
import type Todo from "../../../types/todo";

import { useAppDispatch } from "../../../hooks/reduxHooks";
import { addTodo } from "../../../slices/todosSlice";
import LabelsDropdown from "./menus/LabelsDropdown";

const EMPTY_TODO: Todo = {
  id: 0,
  title: "",
  description: "",
  completed: false,
  dueDate: undefined,
  priority: 4,
  hasReminder: false,
  labels: [],
};

interface TodoFormProps {
  initialTodo?: Todo;
  onClose: () => void;
}

export default function TodoForm({ initialTodo, onClose }: TodoFormProps) {
  const [todo, setTodo] = useState<Todo>(initialTodo ?? EMPTY_TODO);
  const [titleInput, setTitleInput] = useState("");

  const [dateOpen, setDateOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [remindersOpen, setRemindersOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [labelsOpen, setLabelsOpen] = useState(false);

  const titleRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!todo.title.trim()) return;

    dispatch(
      addTodo({
        ...todo,
      }),
    );

    setTodo(initialTodo ?? EMPTY_TODO);
    setTitleInput("");
    onClose();
  }

  function handleSelectDate(date: Date) {
    setTodo((prev) => ({ ...prev, dueDate: date }));
    setDateOpen(false);
  }

  function handleDeleteDate() {
    setTodo((prev) => ({ ...prev, dueDate: undefined }));
    setDateOpen(false);
  }

  function handlePrioritySelect(priority: Priority) {
    setTodo((prev) => ({ ...prev, priority }));
    setPriorityOpen(false);
  }

  function handleToggleReminder() {
    setTodo((prev) => ({
      ...prev,
      hasReminder: !prev.hasReminder,
    }));
    setRemindersOpen(false);
  }

  function handleAddLabel(label: string) {
    setTodo((prev) => {
      const labels = prev.labels ?? [];

      setLabelsOpen(false);

      if (labels.includes(label)) return prev;

      return { ...prev, labels: [...labels, label] };
    });
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="w-full border border-gray-300 rounded-lg flex flex-col"
      >
        {/* TITLE */}

        <Popover.Root open={labelsOpen} onOpenChange={setLabelsOpen}>
          <Popover.Anchor asChild>
            <div className="w-full">
              <input
                ref={titleRef}
                type="text"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                  setTodo((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
                placeholder="Task name"
                className="ml-2.5 mr-2.5 mt-3 mb-1 text-[0.92rem] font-medium focus:outline-none w-full"
              />
            </div>
          </Popover.Anchor>

          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="center"
              sideOffset={5}
              onInteractOutside={(e) => e.preventDefault()}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <LabelsDropdown
                onLabelSelect={handleAddLabel}
                labelQuery={titleInput}
                onClose={() => setLabelsOpen(false)}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* DESCRIPTION */}
        <input
          type="text"
          value={todo.description}
          onChange={(e) =>
            setTodo((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Description"
          className="ml-2.5 mr-2.5 mb-2.5 text-sm text-gray-600 focus:outline-none"
        />

        {/* BUTTONS */}
        <div className="ml-2 mb-2 flex gap-2">
          {/* DATE */}
          <Popover.Root open={dateOpen} onOpenChange={setDateOpen}>
            <Popover.Trigger asChild>
              <DateButton
                dueDate={todo.dueDate}
                onDateButtonCloseClick={handleDeleteDate}
              />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content side="right" align="start">
                <DueDateMenu
                  onSelectDate={handleSelectDate}
                  onSelectDateAndClose={handleSelectDate}
                  onDeleteDate={handleDeleteDate}
                  initialDueDate={todo.dueDate}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          {/* PRIORITY */}
          <Popover.Root open={priorityOpen} onOpenChange={setPriorityOpen}>
            <Popover.Trigger asChild>
              <PriorityButton priority={todo.priority} />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content side="bottom" align="center">
                <PriorityDropdown
                  currentPriority={todo.priority}
                  onPrioritySelect={handlePrioritySelect}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          {/* REMINDERS */}
          <Popover.Root open={remindersOpen} onOpenChange={setRemindersOpen}>
            <Popover.Trigger asChild>
              <RemindersButton hasReminder={todo.hasReminder} />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content side="bottom" align="start">
                <RemindersDropdown
                  hasReminder={todo.hasReminder}
                  onToggleReminder={handleToggleReminder}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          {/* ACTIONS */}
          <Popover.Root open={actionsOpen} onOpenChange={setActionsOpen}>
            <Popover.Trigger asChild>
              <ActionsButton />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content side="bottom" align="start" sideOffset={5}>
                <ActionsDropdown
                  onOpenLabels={() => {
                    setActionsOpen(false);
                    setLabelsOpen(true);
                    setTimeout(() => titleRef.current?.focus(), 0);
                    console.log("otvori labels!");
                  }}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-300 p-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="cancel_button">
            Cancel
          </button>

          <button type="submit" className="add_button">
            {initialTodo ? "Save" : "Add task"}
          </button>
        </div>
      </form>
    </div>
  );
}
