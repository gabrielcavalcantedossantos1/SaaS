import { NavLink, Outlet, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

// style
import './style.css'
import { House, Info, Menu } from "lucide-react";
import { useState } from "react";


export function Layout() {

    const [isOpen, setIsOpen] = useState(true)

    const { appName } = useAppContext();
    return (
        <div className="layout">

            {/* Está é a barra lateral */}
            <aside className={isOpen ? "sidebarOpen" : "sidebarClosed"}>

                <button onClick={() => setIsOpen(!isOpen)}><Menu /></button>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'btn')}>
                                <House />
                                {isOpen && <span>Home</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : 'btn')}>
                                <Info />
                                {isOpen && <span>Sobre</span>}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="content">

                {/* Este é o cabeçalho */}
                <header>
                    <Link to="/" className="btn">{appName} - Seu app de estudos</Link>
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
