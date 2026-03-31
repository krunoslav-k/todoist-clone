import { Hash } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function SidebarProjects() {
  const projects = useAppSelector((state) => state.projects.projects);

  return (
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
  );
}
