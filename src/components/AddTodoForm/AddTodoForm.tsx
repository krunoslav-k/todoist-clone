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
import type Todo from "../../types/todo";

interface AddTodoFormProps {
  handleAddTodo: (todo: Todo) => void;
  handleCancelAddTodo: () => void;
}

export default function AddTodoForm({
  handleAddTodo,
  handleCancelAddTodo,
}: AddTodoFormProps) {
  const initialTodo: Todo = {
    id: 0,
    title: "",
    description: "",
    completed: false,
    dueDate: undefined,
    priority: undefined,
  };
  const [todo, setTodo] = useState<Todo>(initialTodo);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!todo.title.trim()) return;

    handleAddTodo(todo);
    setTodo(initialTodo);
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

  function handleDateSelect(dueDate: Date) {
    setTodo((prev) => ({ ...prev, dueDate }));
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
        <DatePicker handleSelectDate={handleDateSelect} />
      ) : activeDropdown === "priority" ? (
        <PrioritySelector handlePrioritySelect={handlePrioritySelect} />
      ) : activeDropdown === "reminders" ? (
        <RemindersDropdown />
      ) : null}
    </>
  );
}
