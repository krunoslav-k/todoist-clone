import { CirclePlus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SidebarActions() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate("/inbox?modal=add-task")}
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

      <button className="sidebar_button cursor-pointer">
        <Search size={20} strokeWidth={1.3} /> Search
      </button>
    </>
  );
}
