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
    const [sortBy, setSortBy] = useState("recent");

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

    const getCreatedAtTime = (value?: StudyItem['createdAt']) => {
        if (!value) return 0

        const timestampLike = value as unknown as { toDate?: () => Date }

        if (typeof timestampLike.toDate === 'function') {
            return timestampLike.toDate().getTime()
        }

        return new Date(value).getTime()
    }

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        switch (sortBy) {
            case "recent":
                return getCreatedAtTime(b.createdAt) - getCreatedAtTime(a.createdAt)
            case "oldest":
                return getCreatedAtTime(a.createdAt) - getCreatedAtTime(b.createdAt)
            case "priority":
                const priorityOrder = { alta: 3, media: 2, baixa: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            case "alphabetical":
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

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

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="recent">Mais recentes</option>
                    <option value="oldest">Mais antigas</option>
                    <option value="priority">Prioridade</option>
                    <option value="alphabetical">A-Z</option>
                </select>
            </div>

            <main className="tasksList">
                {sortedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}

                {sortedTasks.length === 0 && (
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