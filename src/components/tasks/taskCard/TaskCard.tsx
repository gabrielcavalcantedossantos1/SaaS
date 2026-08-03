import type { StudyItem } from '../../../types/study'
import './styles.css'

type TaskCardProps = {
    task: StudyItem
}

export function TaskCard({ task }: TaskCardProps) {
    return (
        <article className="taskCard">
            <div className="taskInfo">
                <input type="checkbox" checked={task.status === 'done'} readOnly />

                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>

            </div>

            <div className="taskActions">
                <button type='button'>Editar</button>
                <button type='button'>Excluir</button>
            </div>
        </article>

    )
}