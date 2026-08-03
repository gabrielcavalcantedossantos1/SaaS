import { createBrowserRouter } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { Layout } from "./components/layout/Layout";
import { Login } from "./pages/login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./pages/register/Register";
import { Home } from "./pages/home/Home";
import { Tasks } from "./pages/tasks/tasks/Tasks";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "tasks",
            element: <Tasks />,
          },
        ],
      },
    ],
  },
]);

export default routes;
