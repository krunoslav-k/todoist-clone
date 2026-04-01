import { isAfter, isToday } from "date-fns";
import TodosPageView from "../components/TodosPageView";
import { useAppSelector } from "../hooks/reduxHooks";

export default function UpcomingPage() {
  const todos = useAppSelector((state) =>
    state.todos.ids.map((id) => state.todos.entities[id]),
  );

  const upcomingTodos = todos.filter((todo) => {
    if (!todo.dueDate) return false;

    const due = new Date(todo.dueDate);

    return !isToday(due) && isAfter(due, new Date());
  });

  return <TodosPageView title="Today" todos={upcomingTodos} />;
}
