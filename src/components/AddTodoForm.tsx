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
      className="w-full  border-[1px] border-gray-300 rounded-lg flex flex-col"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task name"
        className="ml-2.5 mr-2.5 mt-3 mb-1 text-[0.92rem] font-medium focus:outline-none"
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="ml-2.5 mr-2.5 mb-2 text-sm font-light text-gray-600 focus:outline-none"
      />

      <div className="border-t-1 border-gray-300 p-2 flex justify-end gap-2.5">
        <button
          onClick={handleCancelAddTodo}
          className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-3.5 py-2 rounded-md bg-slate-600 hover:bg-slate-700 text-sm text-white font-medium"
        >
          Add task
        </button>
      </div>
    </form>
  );
}
