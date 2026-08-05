import { createBrowserRouter } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { Layout } from "./components/layout/Layout";
import { Login } from "./pages/login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./pages/register/Register";
import { Home } from "./pages/home/Home";
import { Tasks } from "./pages/tasks/tasks/Tasks";
import { NewTasks } from "./pages/tasks/newTaks/NewTasks";
import { EditTasks } from "./pages/tasks/editTaks/EditTasks";

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
          }, {
            path: "tasks/new",
            element: <NewTasks />,
          }, {
            path: "tasks/edit/:id",
            element: <EditTasks />,
          }
        ],
      },
    ],
  },
]);

export default routes;
