import { useState } from "react";
import TodoItem from "./components/TodoItem";
import { dummyData } from "./data/dummyData";

function App() {
  const [todos, setTodos] = useState(dummyData);

  function toggleCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
    );
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
    </main>
  );
}

export default App;
