import { Search } from "lucide-react";

export default function SearchModal() {
  return (
    <div className="flex flex-col justify-start items-center h-fit rounded-lg bg-white shadow-2xl">
      <div className="flex justify-stretch items-center gap-3 w-full px-3 py-4">
        <Search strokeWidth={1} size={22} />
        <input
          type="text"
          placeholder="Search or type a command..."
          className="w-full text-md font-light placeholder:text-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
