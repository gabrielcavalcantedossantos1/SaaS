import { useState, type FormEvent } from "react";
import { Input } from "../../components/input/input";
import { useAppContext } from "../../context/AppContext";

import './style.css'
import { useAuth } from "../../context/AuthContent";
import { Link, useNavigate } from "react-router-dom";
import { getAuthErrorMessage } from "../../utils/firebaseErrors";
import { notify } from "../../services/toast";

export function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { appName } = useAppContext()
    const { login } = useAuth()

    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (!email.trim() || !password.trim()) return notify.error("Os campos E-mail e Senha devem ser preenchidos!")
        setIsSubmitting(true)

        try {
            await login(email, password)

            navigate('/')
        } catch (error) {
            const errorMessage = getAuthErrorMessage(error)
            notify.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="login">

            <h1>{appName}</h1>

            <p>Seu app de estudos organizados</p>


            <form onSubmit={handleSubmit}>
                <Input
                    text="E-mail"
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    text="Senha"
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Entrando' : 'Entrar'}</button>
            </form>
            <p>Ainda não está cadastrado?</p>
            <Link to='/register'>Registre-se</Link>
        </div>
    )
}