import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export function AboutPage() {
  const { appName } = useAppContext()

  return (
    <div style={{ padding: 24 }}>
      <h1>{appName} About</h1>
      <p>Informações sobre o projeto.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  )
}
