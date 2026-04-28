import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import TodoForm from "../components/Todo/TodoForm/TodoForm";
import SearchModal from "../components/modals/SearchModal";
import TodoModal from "../components/Todo/TodoModal/TodoModal";

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const modal = searchParams.get("modal");
  const todoId = searchParams.get("id");

  function closeModal() {
    searchParams.delete("modal");
    searchParams.delete("id");
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto">
        <Outlet />

        {modal === "add-task" && (
          <div
            className="w-full pt-[12vh] fixed inset-0 flex items-start justify-center"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-lg bg-white shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <TodoForm
                projectId={null}
                sectionId={null}
                onClose={closeModal}
              />
            </div>
          </div>
        )}

        {modal === "search" && (
          <div
            onClick={closeModal}
            className="flex justify-center items-start w-full pt-[20vh] fixed inset-0 z-60"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl relative"
            >
              <SearchModal />
            </div>
          </div>
        )}

        {modal === "task" && (
          <div
            onClick={closeModal}
            className="flex justify-center items-start w-full pt-[20vh] fixed inset-0 z-60"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl relative"
            >
              <TodoModal
                selectedTodoId={Number(todoId)}
                onCloseClick={closeModal}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
