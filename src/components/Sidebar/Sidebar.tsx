import SidebarActions from "./SidebarActions";
import SidebarNavigation from "./SidebarNavigation";
import SidebarProjects from "./SidebarProjects";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-2 w-xs p-4 bg-gray-50">
      <h2>SIDEBAR</h2>

      <nav className="flex flex-col ">
        <SidebarActions />
        <SidebarNavigation />
      </nav>

      <SidebarProjects />
    </div>
  );
}
