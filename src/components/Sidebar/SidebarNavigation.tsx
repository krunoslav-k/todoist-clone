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
    { Icon: Inbox, label: "Inbox", path: "/inbox" },
    { Icon: Calendar1, label: "Today", path: "/today" },
    { Icon: CalendarDays, label: "Upcoming", path: "/upcoming" },
    { Icon: Component, label: "Filters & Labels", path: "/filters&labels" },
    { Icon: CircleCheckBig, label: "Completed", path: "/completed" },
  ];

  return (
    <>
      {navButtons.map(({ Icon, label, path }) => {
        return (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar_button flex items-center gap-3 ${isActive ? "bg-gray-200" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative w-5 h-5 shrink-0">
                  {isActive && (
                    <Icon
                      size={20}
                      strokeWidth={1.3}
                      fill="#39485e"
                      className="absolute inset-0 text-[#39485e]"
                    />
                  )}
                  <Icon
                    size={20}
                    strokeWidth={1.3}
                    className={`absolute inset-0 z-10  ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>

                <span
                  className={`truncate ${isActive ? "font-medium text-gray-900" : "text-gray-700"}`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </>
  );
}
