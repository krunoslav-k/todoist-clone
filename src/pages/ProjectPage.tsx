import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import TodosPageView from "../components/TodosPageView";

export default function ProjectPage() {
  const { projectId } = useParams();

  const project = useAppSelector((state) =>
    state.projects.projects.find((p) => p.id === projectId),
  );

  const todos = useAppSelector((state) =>
    state.todos.ids
      .map((id) => state.todos.entities[id])
      .filter((todo) => todo.projectId === projectId),
  );

  const sections = useAppSelector((state) =>
    state.sections.sections.filter(
      (section) => section.projectId === projectId,
    ),
  );

  return (
    <>
      {project && (
        <TodosPageView
          projectId={projectId || "inbox"}
          title={project.name}
          todos={todos}
          sections={sections}
        />
      )}
    </>
  );
}
