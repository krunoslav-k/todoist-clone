import { Calendar, Ellipsis, Trash, PenLine } from "lucide-react";
import { ComingSoonPopover } from "../../ComingSoonPopover";

interface TodoItemActionsProps {
  onEditTodo: (status: boolean) => void;
  onDueDateClick: (status: boolean) => void;
  onRemoveTodo: () => void;
}

export default function TodoItemActions({
  onEditTodo,
  onDueDateClick,
  onRemoveTodo,
}: TodoItemActionsProps) {
  const actions = [
    { Icon: PenLine, key: "edit", onClick: onEditTodo },
    { Icon: Calendar, key: "date", onClick: onDueDateClick },
    { Icon: Trash, key: "comment", onClick: onRemoveTodo },
    { Icon: Ellipsis, strokeWidth: 2, key: "more", comingSoon: true },
  ];

  return (
    <ul className="-mr-10 justify-start items-center gap-1.75 hidden group-hover/todoitem:flex">
      {actions.map(({ Icon, strokeWidth, key, onClick, comingSoon }) => {
        const button = (
          <button
            onClick={() => onClick?.(true)}
            className="p-0.5 rounded-xs cursor-pointer hover:bg-gray-100"
          >
            <Icon
              strokeWidth={strokeWidth ?? 1}
              size={20}
              className={`text-gray-600 ${Icon === Trash ? "hover:text-red-700" : "hover:text-black"}`}
            ></Icon>
          </button>
        );

        return (
          <li key={key}>
            {comingSoon ? (
              <ComingSoonPopover>{button}</ComingSoonPopover>
            ) : (
              button
            )}
          </li>
        );
      })}
    </ul>
  );
}
