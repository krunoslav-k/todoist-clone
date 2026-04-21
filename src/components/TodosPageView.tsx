import { useState } from "react";
import AddTodoButton from "./AddTodoButton";
import TodoForm from "./Todo/TodoForm/TodoForm";
import TodoList from "./Todo/TodoList";
import type Todo from "../types/todo";
import AddSectionButton from "./Section/AddSectionButton";
import AddSectionForm from "./Section/AddSectionForm";
import SectionItem from "./Section/SectionItem";
import type Section from "../types/section";

export type ActiveTodoForm =
  | { type: "add"; sectionId: string | null }
  | { type: "edit"; todoId: number }
  | null;

interface TodosPageViewProps {
  projectId: string;
  title: string;
  todos: Todo[];
  sections?: Section[];
}

function isAddOpen(activeTodoForm: ActiveTodoForm, sectionId: string | null) {
  return (
    activeTodoForm?.type === "add" && activeTodoForm.sectionId === sectionId
  );
}

export default function TodosPageView({
  projectId,
  title,
  todos,
  sections,
}: TodosPageViewProps) {
  const [activeTodoForm, setActiveTodoForm] = useState<ActiveTodoForm>(null);
  const [isAddSectionFormActive, setIsAddSectionFormActive] = useState(false);

  const toggleSectionForm = () => {
    setIsAddSectionFormActive((prev) => !prev);
  };

  const openGlobalAdd = () =>
    setActiveTodoForm({ type: "add", sectionId: null });

  const closeForm = () => setActiveTodoForm(null);

  const isGlobalAddOpen = isAddOpen(activeTodoForm, null);

  return (
    <main className="flex flex-col items-center px-28">
      {/* HEADER */}
      <h1 className="self-start py-8 font-bold text-2xl tracking-wide">
        {title}
      </h1>

      {/* INBOX / GLOBAL TODO LIST */}
      <section className="w-full">
        <TodoList
          todos={todos}
          activeTodoForm={activeTodoForm}
          setActiveTodoForm={setActiveTodoForm}
        />

        {!isGlobalAddOpen && (
          <AddTodoButton handleAddTodoButtonClick={openGlobalAdd} />
        )}

        {isGlobalAddOpen && (
          <TodoForm
            projectId={projectId}
            sectionId={null}
            onClose={closeForm}
          />
        )}
      </section>

      {/* SECTION FORM */}
      <section className="w-full">
        {isAddSectionFormActive ? (
          <AddSectionForm
            projectId={projectId}
            onCancelAddSection={toggleSectionForm}
          />
        ) : (
          <AddSectionButton onAddSectionButtonClick={toggleSectionForm} />
        )}
      </section>

      {/* SECTIONS */}
      {sections && (
        <section className="w-full">
          {sections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              activeTodoForm={activeTodoForm}
              setActiveTodoForm={setActiveTodoForm}
            />
          ))}
        </section>
      )}
    </main>
  );
}
