import { useState } from "react";
import DateDropdown from "./dropdowns/DateDropdown/DateDropdown";
import DateButton from "./buttons/DateButton";
import PriorityButton from "./buttons/PriorityButton";
import RemindersButton from "./buttons/RemindersButton";
import OptionsButton from "./buttons/OptionsButton";
import PrioritySelector from "./dropdowns/PrioritySelector";
import type { Priority } from "../../types/todo";
import RemindersDropdown from "./dropdowns/RemindersDropdown";
import type { ActiveDropdown } from "../../types/ui";
import type Todo from "../../types/todo";

const EMPTY_TODO: Todo = {
  id: 0,
  title: "",
  description: "",
  completed: false,
  dueDate: undefined,
  priority: 4,
  hasReminder: false,
};

interface TodoFormProps {
  initialTodo?: Todo;
  onSubmit: (todo: Todo) => void;
  onCancel: () => void;
}

export default function TodoForm({
  initialTodo,
  onSubmit,
  onCancel,
}: TodoFormProps) {
  const [todo, setTodo] = useState<Todo>(initialTodo ?? EMPTY_TODO);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

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

  return (
    <>
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
          <OptionsButton />
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
        <DateDropdown
          handleSelectDate={handleSelectDate}
          handleDeleteDate={handleDeleteDate}
        />
      ) : activeDropdown === "priority" ? (
        <PrioritySelector handlePrioritySelect={handlePrioritySelect} />
      ) : activeDropdown === "reminders" ? (
        <RemindersDropdown onToggleReminder={handleToggleReminder} />
      ) : null}
    </>
  );
}
