import type { StudyItem } from '../../../types/study'
import './style.css'

type TasksListProps = {
    tasks: StudyItem[]
    title: 'Últimas Tarefas' | 'Próximas Tarefas'
}

export function TasksList({ tasks, title }: TasksListProps) {
    return (
        <section className="tasksList">
            <h3>{title}</h3>

            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id}>
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                        </li>
                    ))
                ) : (
                    <li>Nenhuma tarefa encontrada.</li>
                )}
            </ul>
        </section>
    )
}