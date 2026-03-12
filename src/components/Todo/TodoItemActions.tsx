import { Calendar, Ellipsis, MessageSquare, PenLine } from "lucide-react";

interface TodoItemActionsProps {
  onEditTodo: (status: boolean) => void;
  onDueDateClick: (status: boolean) => void;
}

export default function TodoItemActions({
  onEditTodo,
  onDueDateClick,
}: TodoItemActionsProps) {
  const actions = [
    { Icon: PenLine, key: "edit", onClick: onEditTodo },
    { Icon: Calendar, key: "date", onClick: onDueDateClick },
    { Icon: MessageSquare, key: "comment", onClick: onEditTodo },
    { Icon: Ellipsis, strokeWidth: 2, key: "more", onClick: onEditTodo },
  ];

  return (
    <ul className="-mr-10 justify-start items-center gap-1.75 hidden group-hover/todoitem:flex">
      {actions.map(({ Icon, strokeWidth, key, onClick }) => {
        return (
          <li key={key}>
            <button
              onClick={() => onClick(true)}
              className="p-0.5 rounded-xs cursor-pointer hover:bg-gray-100"
            >
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
