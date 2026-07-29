import type { FormEvent } from "react";
import { Input } from "../input";

export function Login() {

    function handleSubmit(e:FormEvent){
        e.preventDefault()
        console.log("O formulario foi enviado")
    }
    return (
        <div className="login">
            <h1>Faça o login para desbloquear acesso ao app.</h1>

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