import { ChevronDown } from "lucide-react";
import AddTodoButton from "../AddTodoButton";
import TodoList from "../Todo/TodoList";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import type Section from "../../types/section";

interface SectionProps {
  section: Section;
  activeTodoForm: "add" | number | null;
  setActiveTodoForm: (form: "add" | number | null) => void;
  handleAddTodoButtonClick: () => void;
}

export default function SectionItem({
  section,
  activeTodoForm,
  setActiveTodoForm,
  handleAddTodoButtonClick,
}: SectionProps) {
  const [collapsed, setCollapsed] = useState(false);
  const todos = useAppSelector((state) =>
    state.todos.ids.map((id) => state.todos.entities[id]),
  ).filter((todo) => todo.sectionId === section.id);

  return (
    <div className="flex flex-col justify-center items-start w-full mt-4 mb-10">
      <div className="flex justify-start items-center w-full pb-1 text-sm font-semibold border-b border-gray-200 relative">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-1 rounded-sm hover:bg-gray-100 absolute -left-8"
        >
          <ChevronDown
            strokeWidth={1}
            size={16}
            className={`${collapsed ? "rotate-270" : ""} focus:outline-none`}
          />
        </button>
        <span>{section.name}</span>
      </div>

      {!collapsed && (
        <>
          <TodoList
            todos={todos}
            activeTodoForm={activeTodoForm}
            setActiveTodoForm={setActiveTodoForm}
          />

          <AddTodoButton handleAddTodoButtonClick={handleAddTodoButtonClick} />
        </>
      )}
    </div>
  );
}
