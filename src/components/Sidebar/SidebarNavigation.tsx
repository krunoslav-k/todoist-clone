import {
  Calendar1,
  CalendarDays,
  CircleCheckBig,
  Component,
  Inbox,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SidebarNavigation() {
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
    <>
      {navButtons.map(({ Icon, label, path }) => {
        return (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar_button ${isActive ? "bg-gray-200" : ""}`
            }
          >
            <Icon size={20} strokeWidth={1.3} /> {label}
          </NavLink>
        );
      })}
    </>
  );
}
