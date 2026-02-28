import { useState } from "react";
import TodoItem from "./components/TodoItem";
import { dummyData } from "./data/dummyData";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import type Todo from "./types/todo";
import AddTodoButton from "./components/AddTodoButton";

function App() {
  const [todos, setTodos] = useState(dummyData);
  const [isAddTodoFormOpen, setIsAddTodoFormOpen] = useState(false);

  function toggleCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
    );
  }

  function addTodo(todo: Todo) {
    const newTodo: Todo = { ...todo, id: Date.now() };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  function showAddTodoForm() {
    setIsAddTodoFormOpen((prev) => !prev);
  }

  function hideAddTodoForm() {
    setIsAddTodoFormOpen(false);
  }

  return (
    <main className="flex flex-col justify-center items-center py-8">
      <h1 className="p-10 font-bold text-2xl tracking-wide">Todoist</h1>
      <div className="w-3/5">
        {todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              onToggleCompleted={toggleCompleted}
              key={todo.id}
            />
          );
        })}

        {!isAddTodoFormOpen && (
          <AddTodoButton handleAddTodoButtonClick={showAddTodoForm} />
        )}

        {isAddTodoFormOpen && (
          <AddTodoForm
            handleAddTodo={addTodo}
            handleCancelAddTodo={hideAddTodoForm}
          />
        )}
      </div>
    </main>
  );
}

export default App;
