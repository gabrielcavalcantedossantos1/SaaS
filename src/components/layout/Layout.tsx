import { NavLink, Outlet, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContent";

// style
import "./style.css";

import { House, Info, ListTodo, Menu, User } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  const { appName, userName } = useAppContext();
  const { user } = useAuth();
  const currentUserName = user?.name || userName;

  const rotas = [
    {
      id: 1,
      path: "/",
      icon: <House />,
      label: "Home",
    },
    {
      id: 2,
      path: "/tasks",
      icon: <ListTodo />,
      label: "Tarefas",
    },
    {
      id: 3,
      path: "/about",
      icon: <Info />,
      label: "Sobre",
    },
  ];

  return (
    <div className="layout">

      {/* Sidebar */}
      <aside className={isOpen ? "sidebarOpen" : "sidebarClosed"}>

        <Link to="/" className="sideLogo">
          {isOpen && appName}
        </Link>

        <nav>
          <ul>
            {rotas.map((rota) => (
              <li key={rota.id}>
                <NavLink
                  to={rota.path}
                  className={({ isActive }) =>
                    isActive ? "active" : "btn"
                  }
                >
                  {rota.icon}

                  {isOpen && (
                    <span>
                      {rota.label}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

      </aside>


      {/* Conteúdo */}
      <div
        className={
          isOpen
            ? "content contentSidebarOpen"
            : "content contentSidebarClosed"
        }
      >

        {/* Header */}
        <header>

          <div className="headerLeft">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </button>
          </div>

          <div className="headerContent">
            <div className="userInfo">
              <div className="userAvatar">
                <User />
              </div>

              <div className="userDetails">
                <span className="userName">{currentUserName}</span>
              </div>
            </div>
          </div>

        </header>


        {/* Páginas */}
        <main>
          <Outlet />
        </main>


        {/* Footer */}
        <footer>
          <p>
            &copy; 2026 {appName}. Todos os direitos reservados.
          </p>
        </footer>

      </div>

    </div>
  );
}