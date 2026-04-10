import { useState } from "react";
import AddTodoButton from "./AddTodoButton";
import TodoForm from "./Todo/TodoForm/TodoForm";
import TodoList from "./Todo/TodoList";
import type Todo from "../types/todo";
import AddSectionButton from "./Section/AddSectionButton";
import AddSectionForm from "./Section/AddSectionForm";
import { useAppSelector } from "../hooks/reduxHooks";
import Section from "./Section/Section";

interface TodosPageViewProps {
  title: string;
  todos: Todo[];
}

export default function TodosPageView({ title, todos }: TodosPageViewProps) {
  const [activeTodoForm, setActiveTodoForm] = useState<"add" | number | null>(
    null,
  );
  const [isAddSectionFormActive, setIsAddSectionFormActive] = useState(false);
  const sections = useAppSelector((state) =>
    state.sections.sections.map((section) => section),
  );

  function toogleIsAddSectionFormActive() {
    setIsAddSectionFormActive((prev) => !prev);
  }

  return (
    <main className="flex flex-col justify-center items-center px-28">
      <h1 className="self-start py-8 font-bold text-2xl tracking-wide">
        {title}
      </h1>

      <div className="w-full">
        <TodoList
          todos={todos}
          activeTodoForm={activeTodoForm}
          setActiveTodoForm={setActiveTodoForm}
        />

        {activeTodoForm !== "add" && (
          <AddTodoButton
            handleAddTodoButtonClick={() => setActiveTodoForm("add")}
          />
        )}

        {activeTodoForm === "add" && (
          <TodoForm onClose={() => setActiveTodoForm(null)} />
        )}
      </div>

      {isAddSectionFormActive ? (
        <AddSectionForm
          projectId="inbox"
          onCancelAddSection={toogleIsAddSectionFormActive}
        />
      ) : (
        <AddSectionButton
          onAddSectionButtonClick={toogleIsAddSectionFormActive}
        />
      )}

      <div className="w-full">
        {sections.map((section) => (
          <Section
            section={section}
            activeTodoForm={activeTodoForm}
            setActiveTodoForm={setActiveTodoForm}
            handleAddTodoButtonClick={() => setActiveTodoForm("add")}
          />
        ))}
      </div>
    </main>
  );
}
