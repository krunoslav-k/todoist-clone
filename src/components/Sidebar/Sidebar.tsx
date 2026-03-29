import {
  Calendar1,
  CalendarDays,
  CircleCheckBig,
  CirclePlus,
  Component,
  Inbox,
  Search,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navButtons = [
    {
      Icon: Inbox,
      label: "Inbox",
      path: "/inbox",
    },
    {
      Icon: Calendar1,
      label: "Today",
      path: "/today",
    },
    {
      Icon: CalendarDays,
      label: "Upcoming",
      path: "/upcoming",
    },
    {
      Icon: Component,
      label: "Filters & Labels",
      path: "/filters&labels",
    },
    {
      Icon: CircleCheckBig,
      label: "Completed",
      path: "/completed",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-xs p-4 bg-gray-50">
      <h2>SIDEBAR</h2>

      <nav className="flex flex-col ">
        <button className="sidebar_button cursor-pointer">
          <CirclePlus
            size={20}
            strokeWidth={1.3}
            stroke="white"
            fill="#39485e"
            className="scale-150"
          />{" "}
          Add Task
        </button>
        <button className="sidebar_button cursor-pointer">
          <Search size={20} strokeWidth={1.3} /> Search
        </button>

        {navButtons.map(({ Icon, label, path }) => {
          return (
            <NavLink to={path} className="sidebar_button">
              <Icon size={20} strokeWidth={1.3} /> {label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
