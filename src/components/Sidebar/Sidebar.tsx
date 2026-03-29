import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-2 w-xs p-4 bg-gray-50">
      <h2>SIDEBAR</h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/inbox">Inbox</NavLink>
        <NavLink to="/today">Today</NavLink>
      </nav>
    </div>
  );
}
