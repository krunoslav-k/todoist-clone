import TodosPageView from "../components/TodosPageView";
import { useAppSelector } from "../hooks/reduxHooks";

export default function InboxPage() {
  const todos = useAppSelector((state) =>
    state.todos.ids
      .map((id) => state.todos.entities[id])
      .filter(
        (todo) =>
          (todo.projectId === "inbox" ||
            todo.projectId === null ||
            !todo.projectId) &&
          !todo.sectionId,
      ),
  );
  const sections = useAppSelector((state) =>
    state.sections.sections.filter(
      (section) => section.projectId === "inbox" || null,
    ),
  );

  return (
    <TodosPageView
      projectId={"inbox"}
      title="Inbox"
      todos={todos}
      sections={sections}
    />
  );
}
