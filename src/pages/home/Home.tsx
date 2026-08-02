import { useAppContext } from "../../context/AppContext";
import './styles.css'

export function Home() {

  //pegar a data 
  const today = new Date();

  const formattedDate = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const displayDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  // Dados fictícios para demonstração

  const fictitiousSummary = {
    totalTasks: 10,
    completedTasks: 5,
    pendingTasks: 5,
    thisWeekTasks: 3
  };

  const fictitiousTasks = [
    {
      id: 1,
      title: "Tarefa 1",
      description: "Descrição da tarefa 1"
    }
  ];

  const { userName } = useAppContext()
  return (
    <div className="container"><header>
      <h1>Olá, {userName}!</h1>

      <p>{displayDate}</p>

      <p>Vamos continuar seus estudos hoje?</p>

      <button>Continuar Estudos</button></header>

      <main>
        <section className="resumo">
          <h3>Resumo</h3>
          <ul>
            <li>Total de Tarefas: {fictitiousSummary.totalTasks}</li>
            <li>Tarefas Completadas: {fictitiousSummary.completedTasks}</li>
            <li>Tarefas Pendentes: {fictitiousSummary.pendingTasks}</li>
            <li>Tarefas desta Semana: {fictitiousSummary.thisWeekTasks}</li>
          </ul>
          <h5>Meta semanal: 8h / 15h</h5>
        </section>


        <section className="nextTasks">
          <h3>Próximas Tarefas</h3>
          <ul>
            {fictitiousTasks.map((task) => (
              <li key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="pomodoro">
          <h3>Pomodoro</h3>
          <p>Temporizador para sessões de estudo</p>
        </section>

        <section className="lastTasks">
          <h3>Últimas Tarefas</h3>
          <ul>
            {fictitiousTasks.map((task) => (
              <li key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}