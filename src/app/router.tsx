import { createBrowserRouter } from "react-router-dom";
import InboxPage from "../pages/InboxPage";
import RootLayout from "../layouts/RootLayout";
import TodayPage from "../pages/TodayPage";
import UpcomingPage from "../pages/UpcomingPage";
import CompletedPage from "../pages/CompletedPage";
import ProjectPage from "../pages/ProjectPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <InboxPage />,
      },
      {
        path: "inbox",
        element: <InboxPage />,
      },
      {
        path: "today",
        element: <TodayPage />,
      },
      {
        path: "upcoming",
        element: <UpcomingPage />,
      },
      {
        path: "filters&labels",
        element: <div>empty</div>,
      },
      {
        path: "completed",
        element: <CompletedPage />,
      },
      {
        path: "projects",
        children: [
          {
            path: ":projectId",
            element: <ProjectPage />,
          },
        ],
      },
    ],
  },
]);
