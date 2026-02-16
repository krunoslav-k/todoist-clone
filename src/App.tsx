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
    <>
      <div>
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
    </>
  );
}

export default App;
