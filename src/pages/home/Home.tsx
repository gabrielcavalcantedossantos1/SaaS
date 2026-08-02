import { PomodoroCard } from "../../components/Home/PomodoroCard/PomodoroCard";
import { SummaryCard } from "../../components/Home/SummaryCard/SummaryCard";
import { TasksList } from "../../components/Home/TasksList/TasksList";
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

  const summaryCardsData = [
    {
      title: "Total de Tarefas",
      value: fictitiousSummary.totalTasks,
    },
    {
      title: "Tarefas Completadas",
      value: fictitiousSummary.completedTasks,
    },
    {
      title: "Tarefas Pendentes",
      value: fictitiousSummary.pendingTasks,
    },
    {
      title: "Tarefas desta Semana",
      value: fictitiousSummary.thisWeekTasks,
    }
  ]

  const fictitiousTasks = [
    {
      id: 1,
      title: "Tarefa 1",
      description: "Descrição da tarefa 1"
    }, {
      id: 2,
      title: "Tarefa 2",
      description: "Descrição da tarefa 2"
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
          {summaryCardsData.map((i) => (
            <SummaryCard key={i.title} title={i.title} value={i.value} />
          ))}

        </section>


        <section className="nextTasks">
          <TasksList title="Próximas Tarefas" tasks={fictitiousTasks} />
        </section>

        <section className="pomodoro">
          <PomodoroCard />
        </section>

        <section className="lastTasks">
          <TasksList title='Últimas Tarefas' tasks={fictitiousTasks} />

        </section>
      </main>
    </div>
  );
}