import { useAppContext } from '../context/AppContext'

export function HomePage() {
  const { appName } = useAppContext()

  return (
    <div style={{ padding: 24 }}>
      <h1>{appName} Home</h1>
      <p>Página inicial da aplicação.</p>
    </div>
  )
}
