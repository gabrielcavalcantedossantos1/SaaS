import { useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { createStudy } from '../../../services/studies'
import { useAuth } from '../../../context/AuthContent'
import { getFirebaseErrorMessage } from '../../../utils/firebaseErrors'
import { notify } from '../../../services/toast'

type Category = 'trabalho' | 'estudo' | 'pessoal'
type Priority = 'baixa' | 'media' | 'alta'

export function NewTasks() {

    const navigate = useNavigate()

    const { user } = useAuth()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState<Category | ''>('')
    const [priority, setPriority] = useState<Priority | ''>('')


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!user) return;

        try {
            await createStudy({
                userId: user.id,
                title,
                description,
                category: category as Category,
                priority: priority as Priority,
            });

            notify.success('Tarefa criada com sucesso!');

            setCategory('');
            setDescription('');
            setPriority('');
            setTitle('');

            navigate("/tasks");
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            notify.error(errorMessage)
        }
    }

    return (<div className="newTaskContainer">
        <header>
            <h1>Nova Tarefa</h1>
            <p>Preencha os dados para criar uma nova tarefa.</p>
        </header>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Título</label>
                <input required type="text" id="title" placeholder="Ex: Estudar React" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
                <label htmlFor="description">Descrição</label>
                <textarea required id="description" placeholder="Ex: Estudar React para aprender a criar aplicações web" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div>
                <label htmlFor="category">Categoria</label>
                <select required name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                    <option value="" >Selecione uma categoria</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="estudo">Estudo</option>
                    <option value="pessoal">Pessoal</option>
                </select>
            </div>

            <div>
                <label htmlFor="priority">Prioridade</label>
                <select required name="priority" id="priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                    <option value="" >Selecione uma prioridade</option>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select>
            </div>

            <div className="actions">
                <button type='button' onClick={() => navigate('/tasks')}>Cancelar</button>

                <button type="submit">Salvar Tarefa</button>
            </div>
        </form>
    </div>
    )
}