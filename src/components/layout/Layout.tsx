import { Link, Outlet } from "react-router-dom";
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
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="content">

                {/* Este é o cabeçalho */}
                <header>
                    <Link to="/">{appName} - Seu app de estudos</Link>
                </header>

                <main>
                    <Outlet />
                </main>

                <footer>
                    <p>&copy; 2023 {appName}. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
