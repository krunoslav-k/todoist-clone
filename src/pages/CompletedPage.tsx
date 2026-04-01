import TodosPageView from "../components/TodosPageView";
import { useAppSelector } from "../hooks/reduxHooks";

export default function CompletedPage() {
  const todos = useAppSelector((state) =>
    state.todos.ids.map((id) => state.todos.entities[id]),
  );

  const completedTodos = todos.filter((todo) => {
    if (!todo) return false;
    return todo.completed ? todo : "";
  });

  return <TodosPageView title="Today" todos={completedTodos} />;
}
