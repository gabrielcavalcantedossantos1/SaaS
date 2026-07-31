import { useState, type FormEvent } from "react"
import { useAuth } from "../../context/AuthContent"
import { useAppContext } from "../../context/AppContext"
import { Input } from "../../components/input/input"
import { Link, useNavigate } from "react-router-dom"
import './style.css'
import { getAuthErrorMessage } from "../../utils/firebaseErrors"
import { notify } from "../../services/toast"

export function Register() {

    const navigate = useNavigate()

    const { register } = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { appName } = useAppContext()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (!email.trim() || !password.trim() || !name.trim()) return notify.error("Os campos Nome, E-mail e Senha devem ser preenchidos!")

        if (password.length < 6) {
            return notify.error("A Senha deve conter ao menos 6 caracteres")
        }
        setIsSubmitting(true)

        try {
            await register(name, email, password)

            navigate('/')
        } catch (error) {
            const errorMessage = getAuthErrorMessage(error)
            notify.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="register">
            <h1>{appName}</h1>
            <p>Crie a sua conta para começar!</p>

            <form onSubmit={handleSubmit}>
                <Input text="Nome de usuário" placeholder="Digite o seu nome de usuário" onChange={e => setName(e.target.value)} value={name} />
                <Input text="E-mail" placeholder="Digite o seu E-mail" onChange={e => setEmail(e.target.value)} value={email} type="email" />
                <Input text="Senha" placeholder="Crie uma senha" onChange={e => setPassword(e.target.value)} value={password} type="password" />

                <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Cadastrando..." : "Cadastrar"}</button>
            </form>

            <p>Já tem um cadastro? Faça <Link to="/login">Login</Link></p>
        </div>
    )
}