import { useState } from "react";

interface AddTodoFormProps {
  handleAddTodo: (title: string) => void;
}

export default function AddTodoForm({ handleAddTodo }: AddTodoFormProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    handleAddTodo(input.trim());
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add task"
        className="border border-gray-600"
      />
      <button type="submit" className="bg-amber-200 w-6 h-6">
        +
      </button>
    </form>
  );
}
