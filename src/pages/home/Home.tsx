import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, ClipboardList, Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PomodoroCard } from "../../components/Home/PomodoroCard/PomodoroCard";
import { SummaryCard } from "../../components/Home/SummaryCard/SummaryCard";
import { TasksList } from "../../components/Home/TasksList/TasksList";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContent";
import "./styles.css";

import type { StudyItem } from "../../types/study";
import {
  getDashboardData,
  listenToStudiesByUser,
} from "../../services/studies";

export function Home() {
  const { user } = useAuth();
  const { userName } = useAppContext();

  const [tasks, setTasks] = useState<StudyItem[]>([]);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const unsubscribe = listenToStudiesByUser(user.id, setTasks);

    return () => unsubscribe();
  }, [user]);

  const dashboard = getDashboardData(tasks);

  const summaryCardsData = [
    {
      title: "Total de Tarefas",
      value: dashboard.totalTasks,
    },
    {
      title: "Concluídas",
      value: dashboard.completedTasks,
    },
    {
      title: "Pendentes",
      value: dashboard.pendingTasks,
    },
    {
      title: "Prioridade Alta",
      value: dashboard.highPriorityTasks,
    },
  ];

  const latestTasks = [...tasks].reverse().slice(0, 5);

  const nextTasks = tasks
    .filter((task) => task.status === "todo")
    .slice(0, 5);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const displayDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const completionRate = dashboard.totalTasks > 0
    ? Math.round((dashboard.completedTasks / dashboard.totalTasks) * 100)
    : 0;

  return (
    <div className="homeContainer">
      <header className="homeHeader">
        <div>
          <span className="homeEyebrow"><Sparkles size={15} /> Seu espaço de foco</span>
          <h1>Olá, {userName}!</h1>
          <p className="homeDate"><CalendarDays size={16} /> {displayDate}</p>
          <p className="homeSubtitle">Um passo de cada vez. O que você quer tirar do papel hoje?</p>
        </div>

        <Link className="primaryAction" to="/tasks/new">
          <Plus size={18} /> Nova tarefa
          <ArrowRight size={17} />
        </Link>
      </header>

      <div className="homeContent">
        <section className="summarySection">
          <div className="sectionHeading">
            <div>
              <span className="sectionKicker">Visão geral</span>
              <h2>Seu ritmo de hoje</h2>
            </div>
            <span className="completionBadge"><CheckCircle2 size={16} /> {completionRate}% concluído</span>
          </div>

          <div className="summaryGrid">
            {summaryCardsData.map((card) => (
              <SummaryCard
                key={card.title}
                title={card.title}
                value={card.value}
              />
            ))}
          </div>
        </section>

        <section className="nextTasks">
          {nextTasks.length > 0 ? (
            <TasksList
              title="Próximas Tarefas"
              tasks={nextTasks}
            />
          ) : (
            <div className="noTasks">
              <span className="emptyIcon"><CheckCircle2 size={22} /></span>
              <div><strong>Tudo em dia</strong><p>Você não tem tarefas pendentes.</p></div>
            </div>
          )}
        </section>

        <section className="pomodoro">
          <PomodoroCard />
        </section>

        <section className="lastTasks">
          {latestTasks.length > 0 ? (
            <TasksList
              title="Últimas Tarefas"
              tasks={latestTasks}
            />
          ) : (
            <div className="noTasks">
              <span className="emptyIcon"><ClipboardList size={22} /></span>
              <div><strong>Seu quadro começa aqui</strong><p>Crie sua primeira tarefa para acompanhar seu progresso.</p></div>
            </div>
          )}
        </section>
      </div>
    </div >
  );
}