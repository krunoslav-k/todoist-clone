import { useState } from "react";
import TodoItem from "./components/TodoItem";
import { dummyData } from "./data/dummyData";
import AddTodoForm from "./components/AddTodoForm";
import type Todo from "./types/todo";

function App() {
  const [todos, setTodos] = useState(dummyData);

  function toggleCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
    );
  }

  function addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      description: "",
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
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
      </div>
      <AddTodoForm handleAddTodo={addTodo} />
    </main>
  );
}

export default App;
