import { NavLink, Outlet, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

// style
import './style.css'


export function Layout() {
    const { appName } = useAppContext();
    return (
        <div className="layout">

            {/* Está é a barra lateral */}
            <aside>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'btn')}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : 'btn')}>About</NavLink>
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
