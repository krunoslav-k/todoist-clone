import {
  Check,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  LockKeyhole,
  Paperclip,
  Plus,
  Star,
  X,
} from "lucide-react";
import type Todo from "../types/todo";
import profileIcon from "../assets/profile.svg";

interface EditTodoModalProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
  onCloseClick: () => void;
}

export default function EditTodoModal({
  todo,
  onToggleCompleted,
  onCloseClick,
}: EditTodoModalProps) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)] z-50">
      <div className="w-4xl h-[85%] flex flex-col bg-white rounded-xl relative">
        <div className="p-2 flex justify-between items-center border-b border-gray-200">
          <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-md group transition ease-in-out">
            Inbox
          </button>
          <div className="flex items-center gap-3">
            <button className="p-0.5 hover:bg-gray-100 rounded-md group transition ease-in-out">
              <ChevronUp
                strokeWidth={1}
                className="text-[#b2b2b2] group-hover:text-black"
              />
            </button>
            <button className="p-0.5 hover:bg-gray-100 rounded-md group transition ease-in-out">
              <ChevronDown
                strokeWidth={1}
                className="text-[#666666] group-hover:text-black"
              />
            </button>
            <button className="p-0.5 hover:bg-gray-100 rounded-md group transition ease-in-out">
              <Ellipsis
                strokeWidth={1}
                className="text-[#666666] group-hover:text-black"
              />
            </button>
            <button
              onClick={onCloseClick}
              className="p-0.5 hover:bg-gray-100 rounded-md group transition ease-in-out"
            >
              <X
                strokeWidth={1}
                className="text-[#666666] group-hover:text-black"
              />
            </button>
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="w-[70%] h-full p-3 pl-13">
            <label className="-ml-8 pb-1 flex items-center justify-start hover:cursor-pointer group">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
                className="hidden"
              />

              <span className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center mr-3">
                <Check
                  strokeWidth={2.5}
                  className={`w-3.5 h-3.5 text-gray-500 transition-all duration-150  ${todo.completed ? "opacity-100 scale-100" : "opacity-0 scale-75 hover:opacity-50 hover:scale-100"}`}
                />
              </span>

              <p className="text-xl font-medium">{todo.title}</p>
            </label>

            <p className="mb-7 text-sm text-gray-600">{todo.description}</p>

            <button className="p-1 pr-2 mb-4 flex justify-center items-center gap-2 text-sm font-medium text-gray-500 rounded-sm cursor-pointer hover:bg-gray-100 hover:text-black">
              <Plus strokeWidth={1} size={18} className="text-black" />
              Add sub-task
            </button>

            <hr className="text-gray-200" />

            <div className="mt-4 flex justify-start items-center relative">
              <img
                src={profileIcon}
                alt="empty profile icon"
                className="h-6 mr-2.5"
              />
              <input
                type="text"
                placeholder="Comment"
                className="w-full h-7 pl-5 border border-gray-200 text-sm  rounded-full cursor-pointer hover:bg-gray-50 focus:outline-none"
              />
              <button className="absolute right-5 cursor-pointer">
                <Paperclip strokeWidth={1} size={17} />
              </button>
            </div>
          </div>

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
        </div>

        <div></div>
      </div>
    </div>
  );
}
