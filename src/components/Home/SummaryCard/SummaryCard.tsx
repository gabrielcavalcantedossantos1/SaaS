import './style.css'

type SummaryCardProps = {
    title: 'Total de Tarefas' | 'Tarefas Completadas' | 'Tarefas Pendentes' | 'Tarefas desta Semana'
    value: number
}

export function SummaryCard({ title, value }: SummaryCardProps) {
    return (
        <section className="summaryCard">
            <span>{value}</span>

            <h2>{title}</h2>
        </section>
    )
}

