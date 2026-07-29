import type { FormEvent } from "react";
import { Input } from "../../components/input/input";
import { useAppContext } from "../../context/AppContext";

import './style.css'

export function Login() {

    const { appName } = useAppContext()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        console.log("O formulario foi enviado")
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
                />

                <Input
                    text="Senha"
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                />

                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}