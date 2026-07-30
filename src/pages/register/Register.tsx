import { useState, type FormEvent } from "react"
import { useAuth } from "../../context/AuthContent"
import { useAppContext } from "../../context/AppContext"
import { Input } from "../../components/input/input"
import { Link, useNavigate } from "react-router-dom"
import './style.css'

export function Register() {

    const navigate = useNavigate()

    const { register } = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { appName } = useAppContext()

    async function registerUser(e: FormEvent) {
        e.preventDefault()

        await register(name, email, password)

        navigate("/")
    }

    return (
        <div className="register">
            <h1>{appName}</h1>
            <p>Crie a sua conta para começar!</p>

            <form onSubmit={registerUser}>
                <Input text="Nome de usuário" placeholder="Digite o seu nome de usuário" onChange={e => setName(e.target.value)} value={name} />
                <Input text="E-mail" placeholder="Digite o seu E-mail" onChange={e => setEmail(e.target.value)} value={email} type="email" />
                <Input text="Senha" placeholder="Crie uma senha" onChange={e => setPassword(e.target.value)} value={password} type="password" />

                <button type="submit">Cadastrar</button>
            </form>

            <p>Já tem um cadastro? Faça <Link to="/login">Login</Link></p>
        </div>
    )
}