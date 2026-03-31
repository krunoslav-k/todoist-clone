import { CirclePlus, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SidebarActions() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  return (
    <>
      <button
        onClick={() => navigate(`${pathname}?modal=add-task`)}
        className="sidebar_button"
      >
        <CirclePlus
          size={20}
          strokeWidth={1.3}
          stroke="white"
          fill="#39485e"
          className="scale-150"
        />{" "}
        Add Task
      </button>

      <button
        onClick={() => navigate(`${pathname}?modal=search`)}
        className="sidebar_button cursor-pointer"
      >
        <Search size={20} strokeWidth={1.3} /> Search
      </button>
    </>
  );
}
