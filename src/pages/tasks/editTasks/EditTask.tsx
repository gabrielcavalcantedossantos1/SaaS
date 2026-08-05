import { useEffect, useState } from 'react'
import './styles.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getFirebaseErrorMessage } from '../../../utils/firebaseErrors'
import { notify } from '../../../services/toast'
import { getStudyById, updateStudy } from '../../../services/studies'

type Category = 'trabalho' | 'estudo' | 'pessoal'
type Priority = 'baixa' | 'media' | 'alta'

export function EditTask() {

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        async function loadTask() {
            if (!id) return

            const task = await getStudyById(id)

            if (!task) {
                notify.error('Tarefa não encontrada')
                navigate('/tasks')
                return
            }

            setTitle(task.title)
            setDescription(task.description)
            setCategory(task.category)
            setPriority(task.priority)
        }

        loadTask()
    }, [id, navigate])


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState<Category | ''>('')
    const [priority, setPriority] = useState<Priority | ''>('')


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(!id) return;

        try {
            await updateStudy(id, {
                title,
                description,
                category: category as Category,
                priority: priority as Priority,
            });

            notify.success('Tarefa atualizada com sucesso!');

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
            <h1>Editar Tarefa</h1>
            <p>Preencha os dados para atualizar a tarefa.</p>
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

            <div className="formRow"><div>
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
                </div></div>

            <div className="actions">
                <button type='button' onClick={() => navigate('/tasks')}>Cancelar</button>

                <button type="submit">Salvar Tarefa</button>
            </div>
        </form>
    </div>
    )
}