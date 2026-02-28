import { useState } from "react";
import DatePicker from "./dropdowns/DatePicker";
import DateButton from "./buttons/DateButton";
import PriorityButton from "./buttons/PriorityButton";
import RemindersButton from "./buttons/RemindersButton";
import OptionsButton from "./buttons/OptionsButton";
import PrioritySelector from "./dropdowns/PrioritySelector";
import type { Priority } from "../../types/todo";
import RemindersDropdown from "./dropdowns/RemindersDropdown";
import type { ActiveDropdown } from "../../types/ui";

interface AddTodoFormProps {
  handleAddTodo: (
    title: string,
    description: string,
    dueDate: Date | undefined,
    priority: Priority,
  ) => void;
  handleCancelAddTodo: () => void;
}

export default function AddTodoForm({
  handleAddTodo,
  handleCancelAddTodo,
}: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date>();
  const [priority, setPriority] = useState<Priority>(4);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) return;

    handleAddTodo(title.trim(), description.trim(), dueDate, priority);
    setTitle("");
    setDescription("");
    setPriority(4);
  }

  function handleDropdownClick(type: Exclude<ActiveDropdown, null>) {
    setActiveDropdown((prev) => (prev === type ? null : type));
  }

  function handlePrioritySelect(priority: Priority) {
    setPriority(priority);
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task name"
          className="ml-2.5 mr-2.5 mt-3 mb-1 text-[0.92rem] font-medium focus:outline-none"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          <button
            onClick={handleCancelAddTodo}
            className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium"
          >
            Cancel
          </button>

          <button type="submit" className="add_button">
            Add task
          </button>
        </div>
      </form>

      {activeDropdown === "date" ? (
        <DatePicker handleSelectDate={setDueDate} />
      ) : activeDropdown === "priority" ? (
        <PrioritySelector handlePrioritySelect={handlePrioritySelect} />
      ) : activeDropdown === "reminders" ? (
        <RemindersDropdown />
      ) : null}
    </>
  );
}
