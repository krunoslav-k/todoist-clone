import { useRef, useState } from "react";
import TodoForm from "./components/Todo/TodoForm/TodoForm";
import type Todo from "./types/todo";
import AddTodoButton from "./components/AddTodoButton";
import TodoModal from "./components/Todo/TodoModal/TodoModal";
import TodoList from "./components/Todo/TodoList";
import useClickOutside from "./hooks/useClickOutside";
import { useAppSelector } from "./hooks/reduxHooks";

function App() {
  const [activeTodoForm, setActiveTodoForm] = useState<"add" | number | null>(
    null,
  );
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const todos = useAppSelector((state) =>
    state.todos.ids.map((id) => state.todos.entities[id]),
  );

  const modalRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(modalRef, () => setIsTodoModalOpen(false));

  function selectTodo(id: number) {
    setSelectedTodo(todos.find((todo) => todo.id === id));
    setIsTodoModalOpen(true);
  }

  function selectPreviousTodo() {
    if (!selectedTodo) return;

    const currentIndex = todos.findIndex((todo) => todo.id === selectedTodo.id);
    if (currentIndex <= 0) return;

    setSelectedTodo(todos[currentIndex - 1]);
  }

  function selectNextTodo() {
    if (!selectedTodo) return;

    const currentIndex = todos.findIndex((todo) => todo.id === selectedTodo.id);
    if (currentIndex === -1 || currentIndex >= todos.length - 1) return;

    setSelectedTodo(todos[currentIndex + 1]);
  }

  function getSelectedTodoIndex() {
    if (!selectedTodo) return 0;
    return todos.findIndex((todo) => todo.id === selectedTodo.id);
  }

  return (
    <main className="flex flex-col justify-center items-center px-28">
      <h1 className="self-start py-8 font-bold text-2xl tracking-wide">
        Inbox
      </h1>

      <div className="w-full">
        <TodoList
          onTodoSelect={selectTodo}
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

      {selectedTodo && isTodoModalOpen && (
        <TodoModal
          selectedTodoIndex={getSelectedTodoIndex()}
          onPreviousTodoClick={selectPreviousTodo}
          onNextTodoClick={selectNextTodo}
          onCloseClick={() => setIsTodoModalOpen(false)}
          ref={modalRef}
        />
      )}
    </main>
  );
}

export default App;
