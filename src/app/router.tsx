import { createBrowserRouter } from "react-router-dom";
import InboxPage from "../pages/InboxPage";
import RootLayout from "../layouts/RootLayout";
import TodayPage from "../pages/TodayPage";

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
    ],
  },
]);
