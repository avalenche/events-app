import { createBrowserRouter } from "react-router-dom";

import { Events, Registration, Participants, ErrorPage } from "../pages";
import { Layout } from "./Layout";

export const routes = createBrowserRouter([
  {
    path: "/events",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Events /> },
      {
        element: <Registration />,
        path: "/events/:id/register",
      },
      {
        element: <Participants />,
        path: "/events/:id",
      },
    ],
  },
]);
