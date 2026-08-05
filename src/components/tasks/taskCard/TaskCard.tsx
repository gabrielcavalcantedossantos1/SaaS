import { updateStudyStatus } from '../../../services/studies'
import type { StudyItem } from '../../../types/study'
import './styles.css'

type TaskCardProps = {
    task: StudyItem
}

export function TaskCard({ task }: TaskCardProps) {

    async function handleToggleStatus() {
        const newTask = task.status === 'done' ? 'todo' : 'done'

        await updateStudyStatus(task.id, newTask)
    }

    return (
        <article className="taskCard">
            <div className="taskInfo">
                <input type="checkbox" checked={task.status === 'done'} onChange={handleToggleStatus} />

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