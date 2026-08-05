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
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    useEffect(() => {
        if (!user) {
            setTasks([])
            return
        }

        const unsubscribe = listenToStudiesByUser(user.id, setTasks)

        return () => unsubscribe()
    }, [user])

    const navigate = useNavigate()

    const filteredTasks = tasks.filter((task) => {


        const matchesSeacrh = task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusFilter === "all" || task.status === statusFilter
        const matchesCategory = categoryFilter === "all" || task.category === categoryFilter
        const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

        return matchesSeacrh && matchesStatus && matchesCategory && matchesPriority
    })


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

            <div className="filters">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">Todos os status</option>
                    <option value="todo">Pendente</option>
                    <option value="done">Concluído</option>
                </select>

                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="all">Todas as categorias</option>
                    <option value="estudo">Estudo</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="pessoal">Pessoal</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="all">Todas as prioridades</option>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select>
            </div>

            <main className="tasksList">
                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}

                {filteredTasks.length === 0 && (
                    <p className="noTasks">
                        {tasks.length === 0
                            ? "📋 Você ainda não possui tarefas."
                            : "🔍 Nenhuma tarefa corresponde aos filtros aplicados."}
                    </p>
                )}
            </main>
        </div>
    )
}