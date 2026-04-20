import { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { addSection } from "../../slices/sectionsSlice";

interface AddSectionFormProps {
  projectId: string;
  onCancelAddSection: () => void;
}

export default function AddSectionForm({
  projectId,
  onCancelAddSection,
}: AddSectionFormProps) {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  function handleAddSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) return;

    dispatch(
      addSection({
        name,
        projectId,
      }),
    );

    setName("");
    onCancelAddSection();
  }

  function handleCancel() {
    onCancelAddSection();
    setName("");
  }

  return (
    <form
      onSubmit={handleAddSection}
      className="flex flex-col gap-2 w-full mt-6"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name this section"
        className="p-1.25 text-sm font-semibold border border-gray-200 rounded-md hover:border-gray-400 focus:border-gray-400 focus:outline-none placeholder:text-gray-500"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!name.trim()}
          className={`add_button text-xs ${
            !name ? "bg-gray-400 cursor-not-allowed" : ""
          }`}
        >
          Add section
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="cancel_button text-xs bg-transparent text-gray-500 hover:bg-gray-100 hover:text-black"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
