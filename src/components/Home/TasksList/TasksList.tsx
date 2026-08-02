import './style.css'

type Task = {
    id: number
    title: string
    description: string
}

type TasksListProps = {
    tasks: Task[]
    title: string
}

export function TasksList({ tasks, title }: TasksListProps) {
    return (
        <section className="tasksList">
            <h3>{title}</h3>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                    </li>
                ))}
            </ul>

        </section>)
}