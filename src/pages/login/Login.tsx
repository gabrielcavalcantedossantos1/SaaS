import { useState, type FormEvent } from "react";
import { Input } from "../../components/input/input";
import { useAppContext } from "../../context/AppContext";

import './style.css'
import { useAuth } from "../../context/AuthContent";
import { useNavigate } from "react-router-dom";

export function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { appName } = useAppContext()
    const { login } = useAuth()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        login(email, password)

        navigate('/')
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

                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}