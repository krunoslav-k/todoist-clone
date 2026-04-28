import SidebarActions from "./SidebarActions";
import SidebarNavigation from "./SidebarNavigation";
import SidebarProjects from "./SidebarProjects";

export default function Sidebar() {
  return (
    <div className="h-full shrink-0 flex flex-col gap-2 w-xs p-4 bg-gray-50 ">
      <h2 className="p-3 mb-1 text-xl">
        <span className="font-bold bg-linear-to-br from-[#ff5f54] via-[#e44332] to-[#db3727] bg-clip-text text-transparent">
          Todoist
        </span>{" "}
        clone
      </h2>

      <nav className="flex flex-col ">
        <SidebarActions />
        <SidebarNavigation />
      </nav>

      <SidebarProjects />
    </div>
  );
}
