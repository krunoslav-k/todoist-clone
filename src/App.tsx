import TodosPageView from "./components/TodosPageView";
import { useAppSelector } from "./hooks/reduxHooks";

function App() {
  const todos = useAppSelector((state) =>
    state.todos.ids.map((id) => state.todos.entities[id]),
  );
  const inboxTodos = todos.filter((todo) => !todo.projectId && !todo.sectionId);

  return <TodosPageView title="Inbox" todos={inboxTodos} />;
}

export default App;
