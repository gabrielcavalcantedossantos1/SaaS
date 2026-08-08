import { ArrowLeft, CheckCircle2, Clock3, ListChecks, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import './about.css'

export function AboutPage() {
  const { appName } = useAppContext()

  return (
    <div className="aboutPage">
      <section className="aboutHero">
        <div>
          <span className="aboutEyebrow"><Target size={15} /> Sobre o seu espaço de foco</span>
          <h1>Estude com mais clareza usando o {appName}.</h1>
          <p>Organize suas tarefas, acompanhe seu ritmo e transforme pequenos períodos de foco em progresso constante.</p>
        </div>
        <div className="aboutHeroIcon"><Target size={42} /></div>
      </section>

      <section className="aboutIntro">
        <div>
          <span className="aboutKicker">Feito para avançar</span>
          <h2>Seu estudo, no seu ritmo.</h2>
        </div>
        <p>O {appName} reúne planejamento e foco em um só lugar para você saber o que precisa fazer e manter uma rotina possível.</p>
      </section>

      <section className="aboutFeatures" aria-label="Recursos do aplicativo">
        <article className="aboutFeature">
          <span className="featureIcon blue"><ListChecks size={22} /></span>
          <h3>Tarefas organizadas</h3>
          <p>Crie, priorize e acompanhe suas atividades de estudo sem perder o contexto.</p>
        </article>
        <article className="aboutFeature">
          <span className="featureIcon orange"><Clock3 size={22} /></span>
          <h3>Tempo de foco</h3>
          <p>Use o Pomodoro para começar com uma sessão objetiva e respeitar suas pausas.</p>
        </article>
        <article className="aboutFeature">
          <span className="featureIcon green"><CheckCircle2 size={22} /></span>
          <h3>Progresso visível</h3>
          <p>Veja suas tarefas concluídas e entenda como seu esforço se acumula ao longo do tempo.</p>
        </article>
      </section>

      <Link className="aboutBackLink" to="/"><ArrowLeft size={17} /> Voltar para a página inicial</Link>
    </div>
  )
}
