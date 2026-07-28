import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export function HomePage() {
  const { appName } = useAppContext()

  return (
    <div style={{ padding: 24 }}>
      <h1>{appName} Home</h1>
      <p>Página inicial da aplicação.</p>
      <Link to="/about">Ir para a página Sobre</Link>
    </div>
  )
}
