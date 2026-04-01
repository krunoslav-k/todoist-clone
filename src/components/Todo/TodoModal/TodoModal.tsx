import TodoModalHeader from "./TodoModalHeader";
import TodoModalContent from "./TodoModalContent";
import TodoModalSidebar from "./TodoModalSidebar";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";

interface TodoModalProps {
  selectedTodoId: number;
  onCloseClick: () => void;
}

export default function TodoModal({
  selectedTodoId,
  onCloseClick,
}: TodoModalProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const todos = useAppSelector((state) =>
    state.todos.ids.map((id) => state.todos.entities[id]),
  );

  const selectedTodo = todos.find((todo) => todo.id === selectedTodoId);

  const selectedTodoIndex = todos.findIndex(
    (todo) => todo.id === selectedTodoId,
  );

  function selectPreviousTodo() {
    if (selectedTodoIndex <= 0) return;

    const prevTodo = todos[selectedTodoIndex - 1];

    searchParams.set("id", prevTodo.id.toString());
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  }

  function selectNextTodo() {
    if (selectedTodoIndex === -1 || selectedTodoIndex >= todos.length - 1)
      return;

    const nextTodo = todos[selectedTodoIndex + 1];

    searchParams.set("id", nextTodo.id.toString());
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  }

  if (!selectedTodo) return null;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)] z-50">
      <div className="w-4xl h-[85%] flex flex-col bg-white rounded-xl relative">
        <TodoModalHeader
          selectedTodoIndex={selectedTodoIndex}
          onCloseClick={onCloseClick}
          onPreviousTodoClick={selectPreviousTodo}
          onNextTodoClick={selectNextTodo}
        />

        <div className="flex-1 flex">
          <TodoModalContent selectedTodo={selectedTodo} />

          <TodoModalSidebar />
        </div>
      </div>
    </div>
  );
}
