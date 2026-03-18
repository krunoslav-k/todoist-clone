import { useRef, useState } from "react";
import DueDateMenu from "./menus/DueDateMenu/DueDateMenu";
import DateButton from "./buttons/DateButton";
import PriorityButton from "./buttons/PriorityButton";
import RemindersButton from "./buttons/RemindersButton";
import type { Priority } from "../../../types/todo";
import RemindersDropdown from "./menus/RemindersDropdown";
import type { ActiveDropdown } from "../../../types/ui";
import type Todo from "../../../types/todo";
import useClickOutside from "../../../hooks/useClickOutside";
import PriorityDropdown from "./menus/PriorityDropdown";
import ActionsDropdown from "./menus/ActionsDropdown";
import ActionsButton from "./buttons/ActionsButton";
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
  onSubmit: (todo: Todo) => void;
  onCancel: () => void;
  labels: string[];
}

export default function TodoForm({
  initialTodo,
  onSubmit,
  onCancel,
  labels,
}: TodoFormProps) {
  const [todo, setTodo] = useState<Todo>(initialTodo ?? EMPTY_TODO);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setActiveDropdown(null));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!todo.title.trim()) return;

    onSubmit(todo);
    setTodo(initialTodo ?? EMPTY_TODO);
  }

  function handleDropdownClick(type: Exclude<ActiveDropdown, null>) {
    setActiveDropdown((prev) => (prev === type ? null : type));
  }

  function handlePrioritySelect(priority: Priority) {
    setTodo((prev) => {
      return { ...prev, priority };
    });
    setActiveDropdown(null);
  }

  function handleSelectDate(dueDate: Date) {
    setTodo((prev) => ({ ...prev, dueDate }));
    //setActiveDropdown(null);
  }

  function handleDeleteDate() {
    setTodo((prev) => ({ ...prev, dueDate: undefined }));
    setActiveDropdown(null);
  }

  function handleToggleReminder() {
    const toggledReminder = !todo.hasReminder;
    setTodo((prev) => ({ ...prev, hasReminder: toggledReminder }));
    setActiveDropdown(null);
  }

  function handleLabelsClick() {
    handleDropdownClick("labels");
  }

  function handleLabelSelect(label: string) {
    setTodo((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        labels: [...(prev.labels || []), label],
      };
    });

    setActiveDropdown(null);
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="w-full  border border-gray-300 rounded-lg flex flex-col"
      >
        <input
          type="text"
          value={todo.title}
          onChange={(e) =>
            setTodo((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Task name"
          className="ml-2.5 mr-2.5 mt-3 mb-1 text-[0.92rem] font-medium focus:outline-none"
        />

        <input
          type="text"
          value={todo.description}
          onChange={(e) =>
            setTodo((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Description"
          className="ml-2.5 mr-2.5 mb-2.5 text-sm font-light text-gray-600 focus:outline-none"
        />

        <div className="ml-2 mb-2 flex justify-start items-center gap-2">
          <DateButton handleDateButtonClick={handleDropdownClick} />
          <PriorityButton handlePriorityButtonClick={handleDropdownClick} />
          <RemindersButton handleRemindersButtonClick={handleDropdownClick} />
          <ActionsButton onActionsClick={handleDropdownClick} />
        </div>

        <div className="border-t border-gray-300 p-2 flex justify-end gap-2.5">
          <button onClick={onCancel} className="cancel_button">
            Cancel
          </button>

          <button type="submit" className="add_button">
            {initialTodo === undefined ? `Add task` : `Save`}
          </button>
        </div>
      </form>

      {activeDropdown === "date" ? (
        <DueDateMenu
          handleSelectDate={handleSelectDate}
          handleDeleteDate={handleDeleteDate}
          ref={menuRef}
        />
      ) : activeDropdown === "priority" ? (
        <PriorityDropdown
          handlePrioritySelect={handlePrioritySelect}
          ref={menuRef}
        />
      ) : activeDropdown === "reminders" ? (
        <RemindersDropdown
          onToggleReminder={handleToggleReminder}
          ref={menuRef}
        />
      ) : activeDropdown === "actions" ? (
        <ActionsDropdown onLabelsClick={handleLabelsClick} ref={menuRef} />
      ) : activeDropdown === "labels" ? (
        <LabelsDropdown
          labels={labels}
          onLabelSelect={handleLabelSelect}
          ref={menuRef}
        />
      ) : null}
    </div>
  );
}
