import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import TodoForm from "../components/Todo/TodoForm/TodoForm";

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const modal = searchParams.get("modal");

  function closeModal() {
    searchParams.delete("modal");
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 h-screen">
        <Outlet />

        {modal === "add-task" && (
          <div
            className="w-full pt-22 fixed inset-0 flex items-start justify-center z-60"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-lg bg-white shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <TodoForm onClose={closeModal} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
