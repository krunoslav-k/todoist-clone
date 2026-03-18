import { ChevronDown, LockKeyhole, Plus, type LucideIcon } from "lucide-react";
import TodoModalSidebarItem from "./TodoModalSidebarItem";

interface Item {
  label: string | null;
  buttonText: string;
  hasStar: boolean;
  Icon: LucideIcon;
  iconClasses: string;
}

export default function TodoModalSidebar() {
  const items: Item[] = [
    {
      label: "Project",
      buttonText: "Inbox",
      hasStar: false,
      Icon: ChevronDown,
      iconClasses: "opacity-0 group-hover:opacity-100",
    },
    {
      label: null,
      buttonText: "Date",
      hasStar: false,
      Icon: Plus,
      iconClasses: "",
    },
    {
      label: null,
      buttonText: "Deadline",
      hasStar: true,
      Icon: LockKeyhole,
      iconClasses: "",
    },
    {
      label: "Priority",
      buttonText: "P4",
      hasStar: false,
      Icon: ChevronDown,
      iconClasses: "opacity-0 group-hover:opacity-100",
    },
    {
      label: null,
      buttonText: "Lables",
      hasStar: false,
      Icon: Plus,
      iconClasses: "",
    },
    {
      label: null,
      buttonText: "Reminders",
      hasStar: false,
      Icon: Plus,
      iconClasses: "",
    },
    {
      label: null,
      buttonText: "Location",
      hasStar: true,
      Icon: LockKeyhole,
      iconClasses: "",
    },
  ];

  return (
    <div className="w-[30%] h-full p-4 flex flex-col justify-start items-start bg-gray-50 text-sm">
      {items.map(({ label, buttonText, hasStar, Icon, iconClasses }) => {
        return (
          <TodoModalSidebarItem
            label={label}
            buttonText={buttonText}
            hasStar={hasStar}
            Icon={Icon}
            iconClasses={iconClasses}
          />
        );
      })}
    </div>
  );
}
