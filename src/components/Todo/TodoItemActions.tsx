import { Calendar, Ellipsis, MessageSquare, PenLine } from "lucide-react";

//interface TodoItemActionsProps {}

export default function TodoItemActions() {
  const actions = [
    { Icon: PenLine, key: "edit" },
    { Icon: Calendar, key: "date" },
    { Icon: MessageSquare, key: "comment" },
    { Icon: Ellipsis, key: "more", strokeWidth: 2 },
  ];

  return (
    <ul className="-mr-10 justify-start items-center gap-1.75 hidden group-hover/todoitem:flex">
      {actions.map(({ Icon, key, strokeWidth }) => {
        return (
          <li key={key}>
            <button className="p-0.5 rounded-xs cursor-pointer hover:bg-gray-100">
              <Icon
                strokeWidth={strokeWidth ?? 1}
                size={20}
                className="text-gray-600 hover:text-black"
              ></Icon>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
