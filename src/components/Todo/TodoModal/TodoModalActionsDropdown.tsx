import {
  CopyPlus,
  Link,
  Mail,
  Printer,
  Puzzle,
  SquareActivity,
  SquareArrowOutUpRight,
  Trash,
  type LucideIcon,
} from "lucide-react";

type Action = {
  Icon: LucideIcon;
  label: string;
};

export default function TodoModalActionsDropdown() {
  const actions: Action[] = [
    { Icon: CopyPlus, label: "Duplicate" },
    { Icon: Link, label: "Copy link to task" },
    { Icon: Mail, label: "Add comments via email" },
    { Icon: SquareActivity, label: "View task activity" },
    { Icon: Printer, label: "Print" },
    { Icon: SquareArrowOutUpRight, label: "Open in new window" },
  ];

  return (
    <div className="flex flex-col p-1.5 pt-0 w-2xs border border-gray-300 rounded-lg bg-white shadow text-sm z-60 absolute top-10 right-10">
      <label className="-mx-1.5 p-3 border-t border-b border-gray-200 text-sm font-light text-gray-500">
        Added on 15 Mar · 13:46
      </label>

      <div className="py-1.5 flex flex-col justify-stretch items-start">
        {actions.map(({ Icon, label }) => {
          return (
            <button className="w-full p-1.5 py-2 flex rounded-md font-light text-gray-800 hover:bg-gray-100">
              <span className="pl-1 pr-3">
                <Icon size={20} strokeWidth={1} />
              </span>
              {label}
            </button>
          );
        })}
      </div>

      <div className="-mx-1.5 px-1.5 py-1.5 flex flex-col justify-stretch items-start border-t border-b border-gray-200">
        <button className="w-full p-1.5 py-2 flex rounded-md font-light text-gray-800 hover:bg-gray-100">
          <span className="pl-1 pr-3">
            <Puzzle size={20} strokeWidth={1} />
          </span>
          Add extension...
        </button>
      </div>

      <div className="pt-1.5 flex flex-col justify-stretch items-start">
        <button className="w-full p-1.5 py-2 flex rounded-md font-light text-[#dc4c3e] hover:text-[#b54a40] hover:bg-gray-100 group/delete-button">
          <span className="pl-1 pr-3">
            <Trash
              size={20}
              strokeWidth={1}
              className="group-hover/delete-button:text-[#b54a40]"
            />
          </span>
          Delete
        </button>
      </div>
    </div>
  );
}
