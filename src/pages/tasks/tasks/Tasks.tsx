import { useNavigate } from 'react-router-dom'
import { TaskCard } from '../../../components/tasks/taskCard/TaskCard'
import './styles.css'

export function Tasks() {

    const navigate = useNavigate()

    const fictitiousTasks = [
        {
            id: 1,
            title: 'Estudar React',
            description: 'Estudar React para aprender a criar aplicações web',
            completed: false
        }, {
            id: 2,
            title: 'Estudar TypeScript',
            description: 'Estudar TypeScript para aprender a criar aplicações web',
            completed: false
        }, {
            id: 3,
            title: 'Estudar JavaScript',
            description: 'Estudar JavaScript para aprender a criar aplicações web',
            completed: false
        }
    ]
    return (
        <div className="tasksContainer">
            <header className="tasksHeader">
                <div>
                    <h1>Tarefas</h1>
                    <p>Organize seus estudos e acompanhe seu progresso</p>
                </div>

                <button type='button' onClick={() => navigate('/tasks/new')}>
                    + Nova Tarefa
                </button>
            </header>

            <div className="search">
                <input type="text" placeholder='Pesquisar tarefa...' />
            </div>

            <main className="tasksList">
                {fictitiousTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </main>
        </div>
    )
}