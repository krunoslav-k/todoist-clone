import { useRef, useState } from "react";
import { dummyData } from "./data/dummyData";
import TodoForm from "./components/Todo/TodoForm/TodoForm";
import type Todo from "./types/todo";
import AddTodoButton from "./components/AddTodoButton";
import TodoModal from "./components/Todo/TodoModal/TodoModal";
import TodoList from "./components/Todo/TodoList";
import useClickOutside from "./hooks/useClickOutside";
import { dummyLabels } from "./data/dummyLabels";

function App() {
  const [todos, setTodos] = useState(dummyData);
  const [activeTodoForm, setActiveTodoForm] = useState<"add" | number | null>(
    null,
  );
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [labels, setLabels] = useState<string[]>(dummyLabels);
  const modalRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(modalRef, () => setIsTodoModalOpen(false));

  function toggleCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
    );
  }

  function addTodo(todo: Todo) {
    const newTodo: Todo = { ...todo, id: Date.now() };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setActiveTodoForm(null);
  }

  function editTodo(editedTodo: Todo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo)),
    );
    setActiveTodoForm(null);
  }

  function selectTodo(id: number) {
    setSelectedTodo(todos.find((todo) => todo.id === id));
    setIsTodoModalOpen(true);
  }

  function handleDueDateEdit(selectedTodoId: number, editedDueDate: Date) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === selectedTodoId ? { ...todo, dueDate: editedDueDate } : todo,
      ),
    );
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
    <main className="flex flex-col justify-center items-center py-8">
      <h1 className="p-10 font-bold text-2xl tracking-wide">Inbox</h1>

      <div className="w-3/5">
        <TodoList
          todos={todos}
          onSetTodos={setTodos}
          onToggleCompleted={toggleCompleted}
          onTodoSelect={selectTodo}
          onEditTodo={editTodo}
          activeTodoForm={activeTodoForm}
          setActiveTodoForm={setActiveTodoForm}
          onDueDateEdit={handleDueDateEdit}
          labels={labels}
        />

        {activeTodoForm !== "add" && (
          <AddTodoButton
            handleAddTodoButtonClick={() => setActiveTodoForm("add")}
          />
        )}

        {activeTodoForm === "add" && (
          <TodoForm
            onSubmit={addTodo}
            onCancel={() => setActiveTodoForm(null)}
            labels={labels}
          />
        )}
      </div>

      {selectedTodo && isTodoModalOpen && (
        <TodoModal
          todosLength={todos.length}
          selectedTodoIndex={getSelectedTodoIndex()}
          todo={selectedTodo}
          onToggleCompleted={toggleCompleted}
          onCloseClick={() => setIsTodoModalOpen(false)}
          ref={modalRef}
          onPreviousTodoClick={selectPreviousTodo}
          onNextTodoClick={selectNextTodo}
        />
      )}
    </main>
  );
}

export default App;
