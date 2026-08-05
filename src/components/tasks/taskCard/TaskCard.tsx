import { deleteStudy, updateStudyStatus } from '../../../services/studies'
import { notify } from '../../../services/toast'
import type { StudyItem } from '../../../types/study'
import './styles.css'

type TaskCardProps = {
    task: StudyItem
}

export function TaskCard({ task }: TaskCardProps) {


    // Função para alternar o status da tarefa entre "todo" e "done"
    async function handleToggleStatus() {
        const newStatus = task.status === 'done' ? 'todo' : 'done'

        try {
            await updateStudyStatus(task.id, newStatus)
            const successMessage =
                newStatus === 'done'
                    ? 'Tarefa concluída com sucesso!'
                    : 'Tarefa marcada como pendente.';
            notify.success(successMessage)
        } catch {
            const errorMessage = 'Erro ao atualizar o status da tarefa. Tente novamente.'
            notify.error(errorMessage)
        }
    }

    // função para excluir a tarefa
    async function handleDeleteTask() {

        const confirmDelete = window.confirm('Tem certeza que deseja excluir esta tarefa?')
        if (!confirmDelete) return
        try {
            await deleteStudy(task.id)
            notify.success('Tarefa excluída com sucesso.')
        } catch {
            const errorMessage = 'Erro ao excluir a tarefa. Tente novamente.'
            notify.error(errorMessage)
        }
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
                <button type='button' onClick={handleDeleteTask}>
                    Excluir
                </button>
            </div>
        </article>

    )
}