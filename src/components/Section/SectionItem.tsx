import { ChevronDown } from "lucide-react";
import AddTodoButton from "../AddTodoButton";
import TodoList from "../Todo/TodoList";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import type Section from "../../types/section";
import type { ActiveTodoForm } from "../TodosPageView";
import TodoForm from "../Todo/TodoForm/TodoForm";

interface SectionItemProps {
  section: Section;
  activeTodoForm: ActiveTodoForm;
  setActiveTodoForm: (form: ActiveTodoForm) => void;
}

function isAddOpen(activeTodoForm: ActiveTodoForm, sectionId: string | null) {
  return (
    activeTodoForm?.type === "add" && activeTodoForm.sectionId === sectionId
  );
}

export default function SectionItem({
  section,
  activeTodoForm,
  setActiveTodoForm,
}: SectionItemProps) {
  const [collapsed, setCollapsed] = useState(false);

  const todos = useAppSelector((state) =>
    state.todos.ids.map((id) => state.todos.entities[id]),
  ).filter((todo) => todo.sectionId === section.id);

  const isComposerOpen = isAddOpen(activeTodoForm, section.id);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const openComposer = () =>
    setActiveTodoForm({
      type: "add",
      sectionId: section.id,
    });

  const closeComposer = () => setActiveTodoForm(null);

  return (
    <div className="flex flex-col w-full mt-4 mb-10">
      {/* HEADER */}
      <div className="flex items-center w-full pb-1 text-sm font-semibold border-b border-gray-200 relative">
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-sm hover:bg-gray-100 absolute -left-8"
        >
          <ChevronDown
            strokeWidth={1}
            size={16}
            className={`${collapsed ? "rotate-180" : ""}`}
          />
        </button>

        <span>{section.name}</span>
      </div>

      {/* BODY */}
      {!collapsed && (
        <div className="w-full">
          <TodoList
            todos={todos}
            activeTodoForm={activeTodoForm}
            setActiveTodoForm={setActiveTodoForm}
          />

          {isComposerOpen ? (
            <TodoForm
              projectId={null}
              sectionId={section.id}
              onClose={closeComposer}
            />
          ) : (
            <AddTodoButton handleAddTodoButtonClick={openComposer} />
          )}
        </div>
      )}
    </div>
  );
}
