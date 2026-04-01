import { useState } from "react";
import AddTodoButton from "./AddTodoButton";
import TodoForm from "./Todo/TodoForm/TodoForm";
import TodoList from "./Todo/TodoList";
import type Todo from "../types/todo";

interface TodosPageViewProps {
  title: string;
  todos: Todo[];
}

export default function TodosPageView({ title, todos }: TodosPageViewProps) {
  const [activeTodoForm, setActiveTodoForm] = useState<"add" | number | null>(
    null,
  );

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
    </main>
  );
}
