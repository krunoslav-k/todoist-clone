import { isToday } from "date-fns";
import TodosPageView from "../components/TodosPageView";
import { useAppSelector } from "../hooks/reduxHooks";

export default function TodayPage() {
  const todos = useAppSelector((state) =>
    state.todos.ids.map((id) => state.todos.entities[id]),
  );
  const todayTodos = todos.filter(
    (todo) => todo.dueDate && isToday(new Date(todo.dueDate)),
  );

  return <TodosPageView title="Today" todos={todayTodos} />;
}
