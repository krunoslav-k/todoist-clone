import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-16">
        <Outlet />
      </main>
    </div>
  );
}
