import { useState } from "react";

interface AddTodoFormProps {
  handleAddTodo: (title: string, description: string) => void;
  handleCancelAddTodo: () => void;
}

export default function AddTodoForm({
  handleAddTodo,
  handleCancelAddTodo,
}: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    handleAddTodo(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-2 py-3 border-[1px] border-gray-400 rounded-lg flex flex-col"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task name"
        className=""
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className=""
      />

      <div>
        <button
          onClick={handleCancelAddTodo}
          className="px-5 py-2 bg-amber-100 hover:bg-amber-200"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-300 hover:bg-blue-400"
        >
          Add task
        </button>
      </div>
    </form>
  );
}
