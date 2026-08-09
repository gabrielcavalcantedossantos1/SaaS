import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContent";

// style
import "./style.css";

import {
  ArrowUpRight,
  House,
  Info,
  ListTodo,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [isOpen, setIsOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth > 768,
  );

  const { appName } = useAppContext();
  const { user, logout, loading } = useAuth();
  const currentUserName = user?.name || "Usuário";

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
  const navigate = useNavigate();

  async function handleLogout() {
    // verificar se o usuario quer mesmo sair
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (!confirmLogout) return;

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

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
                  className={({ isActive }) => (isActive ? "active" : "btn")}
                >
                  {rota.icon}

                  {isOpen && <span>{rota.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Conteúdo */}
      <div
        className={
          isOpen ? "content contentSidebarOpen" : "content contentSidebarClosed"
        }
      >
        {/* Header */}
        <header>
          <div className="headerLeft">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <Menu />
            </button>
          </div>

          <div className="headerContent">
            <div className="userInfo">
              <div className="userAvatar">
                <User size={30} strokeWidth={2.25} aria-hidden="true" />
              </div>

              <div className="userDetails">
                <span className="userName">{currentUserName}</span>
              </div>
            </div>

            <button
              type="button"
              className="logoutButton"
              onClick={handleLogout}
              disabled={loading}
              aria-label="Sair da conta"
              title="Sair"
            >
              <LogOut size={40} strokeWidth={2.25} aria-hidden="true" />
              <span>Sair</span>
            </button>
          </div>
        </header>

        {/* Páginas */}
        <main>
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="layoutFooter">
          <div className="footerBrand">
            <span className="footerMark" />
            <strong>{appName}</strong>
            <span className="footerDivider" />
            <span>Seu espaço de foco</span>
          </div>

          <div className="footerMeta">
            <span>&copy; 2026</span>
            <Link to="/about">
              Sobre o app <ArrowUpRight size={14} />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
