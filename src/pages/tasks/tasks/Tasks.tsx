import { useNavigate } from 'react-router-dom'
import { TaskCard } from '../../../components/tasks/taskCard/TaskCard'
import './styles.css'

import { listenToStudiesByUser } from '../../../services/studies'
import type { StudyItem } from '../../../types/study'
import { useAuth } from '../../../context/AuthContent'
import { useEffect, useState } from 'react'

export function Tasks() {

    const { user } = useAuth()

    const [tasks, setTasks] = useState<StudyItem[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!user) {
            setTasks([])
            return
        }

        const unsubscribe = listenToStudiesByUser(user.id, setTasks)

        return () => unsubscribe()
    }, [user])

    const navigate = useNavigate()

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    )


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
                <input
                    type="text"
                    placeholder='Pesquisar tarefa...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <main className="tasksList">
                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}

                {filteredTasks.length === 0 && (
                    <p className="noTasks">
                        {search
                            ? "🔍 Nenhuma tarefa encontrada para esta pesquisa."
                            : "📋 Você ainda não possui tarefas."}
                    </p>
                )}
            </main>
        </div>
    )
}