import { useAppContext } from '../context/AppContext'

export function AboutPage() {
  const { appName } = useAppContext()

  return (
    <div style={{ padding: 24 }}>
      <h1>{appName} About</h1>
      <p>Informações sobre o projeto.</p>
    </div>
  )
}
