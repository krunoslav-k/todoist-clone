import {
  Calendar1,
  CalendarDays,
  CircleCheckBig,
  CirclePlus,
  Component,
  Hash,
  Inbox,
  Search,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function Sidebar() {
  const projects = useAppSelector((state) => state.projects.projects);

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
        <button className="sidebar_button">
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
      </nav>

      <div className="flex flex-col mt-3">
        <button className="sidebar_button text-gray-600 font-medium">
          My Projects
        </button>

        {projects.map((project) => {
          return (
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar_button ${isActive ? "bg-gray-200" : ""}`
              }
            >
              <Hash
                size={20}
                strokeWidth={1.1}
                className="text-amber-700 scale-80"
              />
              {project}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
