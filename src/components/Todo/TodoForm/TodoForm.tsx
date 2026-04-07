import DueDateMenu from "./menus/DueDateMenu/DueDateMenu";
import DateButton from "./buttons/DateButton";
import PriorityButton from "./buttons/PriorityButton";
import RemindersButton from "./buttons/RemindersButton";
import type { Priority } from "../../../types/todo";
import RemindersDropdown from "./menus/RemindersDropdown";
import type { Dropdown } from "../../../types/ui";
import type Todo from "../../../types/todo";
import PriorityDropdown from "./menus/PriorityDropdown";
import ActionsDropdown from "./menus/ActionsDropdown";
import ActionsButton from "./buttons/ActionsButton";
import LabelsDropdown from "./menus/LabelsDropdown";
import { useState } from "react";
import useDropdown from "../../../hooks/useDropdown";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { addTodo } from "../../../features/todos/todosSlice";

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
  const [isTypingLabel, setIsTypingLabel] = useState(false);
  const [labelQuery, setLabelQuery] = useState("");
  const [titleInput, setTitleInput] = useState("");

  const dispatch = useAppDispatch();

  const { activeDropdown, toggleDropdown, closeDropdown, menuRef } =
    useDropdown();

  const dropdowns = {
    date: (
      <DueDateMenu
        onSelectDate={handleSelectDate}
        onSelectDateAndClose={handleSelectDateAndClose}
        onDeleteDate={handleDeleteDate}
        ref={menuRef}
      />
    ),
    priority: (
      <PriorityDropdown onPrioritySelect={handlePrioritySelect} ref={menuRef} />
    ),
    reminders: (
      <RemindersDropdown
        onToggleReminder={handleToggleReminder}
        ref={menuRef}
      />
    ),
    actions: (
      <ActionsDropdown
        onLabelsClick={() => toggleDropdown("labels")}
        ref={menuRef}
      />
    ),
    labels: (
      <LabelsDropdown
        labelQuery={labelQuery}
        onLabelSelect={handleLabelSelect}
        ref={menuRef}
        onClose={closeDropdown}
      />
    ),
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!todo.title.trim()) return;

    const newTodo = {
      ...todo,
      id: Date.now(),
    };

    dispatch(addTodo(newTodo));

    setTodo(initialTodo ?? EMPTY_TODO);

    onClose();
  }

  function handleDropdownClick(type: Exclude<Dropdown, null>) {
    toggleDropdown(type);
  }

  function handlePrioritySelect(priority: Priority) {
    setTodo((prev) => {
      return { ...prev, priority };
    });
    closeDropdown();
  }

  function handleSelectDate(dueDate: Date) {
    setTodo((prev) => ({ ...prev, dueDate }));
  }

  function handleSelectDateAndClose(dueDate: Date) {
    handleSelectDate(dueDate);
    closeDropdown();
  }

  function handleDeleteDate() {
    setTodo((prev) => ({ ...prev, dueDate: undefined }));
    closeDropdown();
  }

  function handleToggleReminder() {
    const toggledReminder = !todo.hasReminder;
    setTodo((prev) => ({ ...prev, hasReminder: toggledReminder }));
    closeDropdown();
  }

  function handleLabelSelect(label: string) {
    setTodo((prev) => {
      const labels = prev.labels ?? [];
      if (labels.includes(label)) return prev;

      return {
        ...prev,
        labels: [...labels, label],
      };
    });

    closeDropdown();
    setTitleInput((prev) => prev.split("@")[0]);
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    const input = e.target.value;
    if (input.includes("@")) {
      setIsTypingLabel(true);
      toggleDropdown("labels");
    } else {
      setIsTypingLabel(false);
      closeDropdown();
      setLabelQuery("");
    }

    if (isTypingLabel) {
      const match = input.match(/@(\w+)/);
      setLabelQuery(match ? match[1] : "");
      setTitleInput(input);
    }

    if (!isTypingLabel) {
      setTodo((prev) => ({ ...prev, title: input.replace("@", "") }));
      setTitleInput(input);
    }
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="w-full  border border-gray-300 rounded-lg flex flex-col"
      >
        <div contentEditable>
          {todo.labels &&
            todo.labels.map((label) => {
              return (
                <span className="ml-2 -mr-2 p-1 rounded-sm text-sm font-medium bg-gray-200">
                  @{label}
                </span>
              );
            })}
          <input
            type="text"
            value={titleInput}
            onChange={handleInputChange}
            placeholder="Task name"
            className="w-full ml-2.5 mr-2.5 mt-3 mb-1 text-[0.92rem] font-medium focus:outline-none"
          />
        </div>

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
          <DateButton
            dueDate={todo.dueDate}
            onDateButtonClick={handleDropdownClick}
            onDateButtonCloseClick={handleDeleteDate}
          />
          <PriorityButton handlePriorityButtonClick={handleDropdownClick} />
          <RemindersButton handleRemindersButtonClick={handleDropdownClick} />
          <ActionsButton onActionsClick={handleDropdownClick} />
        </div>

        <div className="border-t border-gray-300 p-2 flex justify-end gap-2.5">
          <button onClick={onClose} className="cancel_button">
            Cancel
          </button>

          <button type="submit" className="add_button">
            {initialTodo === undefined ? `Add task` : `Save`}
          </button>
        </div>
      </form>

      {activeDropdown && dropdowns[activeDropdown]}
    </div>
  );
}
