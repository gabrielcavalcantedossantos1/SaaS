import { NavLink, Outlet, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

// style
import "./style.css";
import { House, Info, Menu, User } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  const { appName, userName } = useAppContext();
  return (
    <div className="layout">
      {/* Está é a barra lateral */}
      <aside className={isOpen ? "sidebarOpen" : "sidebarClosed"}>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "btn")}
              >
                <House />
                {isOpen && <span>Home</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "btn")}
              >
                <Info />
                {isOpen && <span>Sobre</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div
        className={
          isOpen ? "content contentSidebarOpen" : "content contentSidebarClosed"
        }
      >
        {/* Este é o cabeçalho */}
        <header>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu />
          </button>

          <div className="headerContent">
            <Link to="/" className="logo">
              {appName}
            </Link>

            <span>
              <User />
              {userName}
            </span>
          </div>
        </header>

        <main>
          <Outlet />
        </main>

        <footer>
          <p>&copy; 2026 {appName}. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
