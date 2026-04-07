import { useLocation, useNavigate } from "react-router-dom";

export default function useTodoModal() {
  const location = useLocation();
  const navigate = useNavigate();

  function openTodoModal(id: number) {
    const params = new URLSearchParams(location.search);
    params.set("modal", "task");
    params.set("id", id.toString());
    navigate({ pathname: location.pathname, search: params.toString() });
  }

  return { openTodoModal };
}
