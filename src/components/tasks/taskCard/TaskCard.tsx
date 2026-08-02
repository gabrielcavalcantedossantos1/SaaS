import './styles.css'

type Task = {
    id: number,
    title: string,
    description: string,
    completed: boolean
}

type TaskCardProps = {
    task: Task
}

export function TaskCard({ task }: TaskCardProps) {
    return (
        <article className="taskCard">
            <div className="taskInfo">
                <input type="checkbox" checked={task.completed} readOnly />

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