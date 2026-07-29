import { useId } from "react"
import './style.css'

type InputType = {
    text: string,
    type?: string,
    placeholder: string,
    name: string
}

export function Input({ name, placeholder, text, type }: InputType) {

    const id = useId()

    return (
        <div>
            <label htmlFor={id}>{text}</label>
            <input type={type ?? 'text'} id={id} placeholder={placeholder} name={name} />
        </div>
    )
}