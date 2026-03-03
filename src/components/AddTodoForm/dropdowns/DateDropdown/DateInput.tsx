import { X } from "lucide-react";

interface DateInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateInput({
  inputValue,
  setInputValue,
  handleInputChange,
}: DateInputProps) {
  return (
    <div className="flex justify-between items-center">
      <input
        type="string"
        value={inputValue}
        placeholder="Type a date"
        onChange={handleInputChange}
        className="my-3 text-sm placeholder:text-sm placeholder:text-gray-400 focus:outline-none"
      />

      {inputValue && (
        <button
          onClick={() => setInputValue("")}
          className="w-6 h-6 flex justify-center items-center rounded-md hover:bg-gray-100"
        >
          <X size={15} className="text-gray-500" />
        </button>
      )}
    </div>
  );
}
