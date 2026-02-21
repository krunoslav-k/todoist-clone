import { useState } from "react";
import TodoItem from "./components/TodoItem";
import { dummyData } from "./data/dummyData";
import AddTodoForm from "./components/AddTodoForm";
import type Todo from "./types/todo";
import { Plus } from "lucide-react";

function App() {
  const [todos, setTodos] = useState(dummyData);
  const [isAddTodoFormOpen, setIsAddTodoFormOpen] = useState(false);

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

        {!isAddTodoFormOpen && (
          <button
            onClick={() => setIsAddTodoFormOpen((prev) => !prev)}
            className="flex items-start justify-center p-3 group"
          >
            <span className="w-5 h-5 mr-4 rounded-full border border-transparent flex items-center justify-center group-hover:border-gray-700 group-hover:bg-gray-700">
              <Plus
                size={28}
                strokeWidth={1}
                className="text-gray-700 group-hover:text-white"
              />
            </span>
            <span className="text-[0.9rem] text-gray-500 group-hover:text-gray-800">
              Add task
            </span>
          </button>
        )}
      </div>

      {isAddTodoFormOpen && <AddTodoForm handleAddTodo={addTodo} />}
    </main>
  );
}

export default App;
