import { ChevronDown, LockKeyhole, Plus, Star } from "lucide-react";

export default function TodoModalSidebar() {
  return (
    <div className="w-[30%] h-full p-4 flex flex-col justify-start items-start bg-gray-50 text-sm">
      <p className="mb-2 font-medium text-gray-600">Project</p>
      <button className="flex justify-between items-center w-full px-2 py-1 rounded-md font-light cursor-pointer hover:bg-gray-200 group">
        Inbox
        <ChevronDown
          strokeWidth={1}
          size={16}
          className="opacity-0 group-hover:opacity-100"
        />
      </button>
      <hr className="w-full my-3 text-gray-200" />

      <button className="flex justify-between items-center w-full px-2 py-1 rounded-md font-medium text-gray-600 cursor-pointer hover:bg-gray-200">
        Date
        <Plus strokeWidth={1} size={18} />
      </button>
      <hr className="w-full my-3 text-gray-200" />

      <button className="flex justify-between items-center w-full px-2 py-1 rounded-md font-medium text-gray-600 cursor-pointer hover:bg-gray-200">
        <div className="flex justify-center items-center gap-1.5">
          Deadline
          <Star size={12} strokeWidth="4" color="#ee8100" />
        </div>
        <LockKeyhole strokeWidth={1} size={18} />
      </button>
      <hr className="w-full my-3 text-gray-200" />

      <p className="mb-2 font-medium text-gray-600">Priority</p>
      <button className="flex justify-between items-center w-full px-2 py-1 rounded-md font-light cursor-pointer hover:bg-gray-200 group">
        P4
        <ChevronDown
          strokeWidth={1}
          size={16}
          className="opacity-0 group-hover:opacity-100"
        />
      </button>
      <hr className="w-full my-3 text-gray-200" />

      <button className="flex justify-between items-center w-full px-2 py-1 rounded-md font-medium text-gray-600 cursor-pointer hover:bg-gray-200">
        Lables
        <Plus strokeWidth={1} size={18} />
      </button>
      <hr className="w-full my-3 text-gray-200" />

      <button className="flex justify-between items-center w-full px-2 py-1 rounded-md font-medium text-gray-600 cursor-pointer hover:bg-gray-200">
        Reminders
        <Plus strokeWidth={1} size={18} />
      </button>
      <hr className="w-full my-3 text-gray-200" />

      <button className="flex justify-between items-center w-full px-2 py-1 rounded-md font-medium text-gray-600 cursor-pointer hover:bg-gray-200">
        <div className="flex justify-center items-center gap-1.5">
          Location
          <Star size={12} strokeWidth="4" color="#ee8100" />
        </div>

        <LockKeyhole strokeWidth={1} size={18} />
      </button>
      <hr className="w-full my-3 text-gray-200" />
    </div>
  );
}
